import motor.motor_asyncio
from pymongo import MongoClient
import asyncio
import numpy as np
import pandas as pd

from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD

mongo_url = "mongodb://admin:ssafit@ssafit.site:8975/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

client = MongoClient(mongo_url)
db = client['ssafit']

def cloth_helper(cloth):
    context = {
        'newClothId': int(cloth['newClothId']),
        'clothId': cloth['clothId'],
        'clothName': cloth['clothName'],
        'brand': cloth['brand'],
        'clothImg': cloth['clothImg'],
        'clothPrice': cloth['clothPrice'],
        'goodsSize': cloth['goodsSize'],
    }
    return context

def get_cloth_meta(what: int):
    clothes = db.cloth_meta.find({'what': what})
    clothes = list(clothes)
    return clothes

def get_user_meta(what: int, userId: int):    
    users = db.user_meta.find({'what': what})
    users = list(users)
    return users

def get_size_user_info(userId, largecategory):
    users = set()
    user = db.user_ssafit.find_one({'userId': int(userId), 'largecategory': largecategory})
    exist = False
    for i in range(10):
        for one_user in db.user.aggregate([{'$match': {'largecategory': user['largecategory'], 'userHeight': {'$in': list(range(user['userHeight']-i, user['userHeight']+i))}, 'userWeight': {'$in': list(range(user['userWeight']-i, user['userWeight']+i))}}},{'$sample': {'size':1}}]):
            users.add(one_user['userId'])
            if len(users) == 3:
                exist = True
                break
        if exist:
            break
    return list(users)

def get_color_user_info(userId, largecategory):
    users = set()
    user = db.user_ssafit.find_one({'userId': int(userId), 'largecategory': largecategory})
    color_list = []
    color_exist = False
    for idx, col in enumerate(user):
        if col=='colorWhite':
            color_list.append([col, user[col]])
            color_exist = True
        elif color_exist and col!='colorOthers':
            color_list.append([col, user[col]])
        elif col=='colorOthers':
            color_list.append([col, user[col]])
            break
    color_list = sorted(color_list, key=lambda x: x[1], reverse=True)
    color_li = []
    for i in range(0, 3):
        color_li.append(color_list[i][0])
    exist = False
    for i in np.arange(0.1, 1, 0.1):
        for one_user in db.user.aggregate([{'$match': {'largecategory': user['largecategory'], color_li[0]: {"$gte": user[color_li[0]]-i, "$lte": user[color_li[0]]+i},color_li[1]: {"$gte": user[color_li[1]]-i, "$lte": user[color_li[1]]+i},color_li[2]: {"$gte": user[color_li[2]]-i, "$lte": user[color_li[2]]+i}}},{'$sample': {'size':1}}]):
            users.add(one_user['userId'])
            if len(users) == 3:
                exist = True
                break
        if exist:
            break
    return list(users)

def get_style_user_info(userId, largecategory):
    users = set()
    user = db.user_ssafit.find_one({'userId': int(userId), 'largecategory': largecategory})
    exist = False
    for i in range(0, 4, 1):
        for one_user in db.user.aggregate([{'$match': {'largecategory': user['largecategory'], 'size': {"$gte": user['size']-i, "$lte": user['size']+i}, 'bright': {"$gte": user['bright']-i, "$lte": user['bright']+i}, 'color': {"$gte": user['color']-i, "$lte": user['color']+i}, 'thickness': {"$gte": user['thickness']-i, "$lte": user['thickness']+i}}},{'$sample': {'size':1}}]):
            users.add(one_user['userId'])
            if len(users) == 3:
                exist = True
                break
        if exist:
            break
    return list(users)


def get_category_user_info(userId, largecategory):
    user = db.user_ssafit.find_one({'userId': int(userId), 'largecategory': largecategory})
    users = set()
    if largecategory == 1:
        category_list = []
        for idx, cat in enumerate(user):
            if 14<=idx<=22:
                category_list.append([cat, user[cat]])
        category_list = sorted(category_list, key=lambda x: x[1], reverse=True)
        category_li = []
        for i in range(0, 3):
            category_li.append(category_list[i][0])
    elif largecategory == 2:
        category_list = []
        for idx, cat in enumerate(user):
            if 14<=idx<=24:
                category_list.append([cat, user[cat]])
        category_list = sorted(category_list, key=lambda x: x[1], reverse=True)
        category_li = []
        for i in range(0, 3):
            category_li.append(category_list[i][0])
    elif largecategory == 3:
        category_list = []
        for idx, cat in enumerate(user):
            if 14<=idx<=21:
                category_list.append([cat, user[cat]])
        category_list = sorted(category_list, key=lambda x: x[1], reverse=True)
        category_li = []
        for i in range(0, 3):
            category_li.append(category_list[i][0])
    elif largecategory == 4:
        category_li = ['smallCategoryMinidress', 'smallCategoryMidi', 'smallCategoryMaxidress']
    elif largecategory == 5:
        category_li = ['smallCategoryMiniskirt', 'smallCategoryMidi', 'smallCategoryLongskirt']
    exist = False
    for i in np.arange(0.1, 1, 0.1):
        for one_user in db.user.aggregate([{'$match': {'largecategory': user['largecategory'], category_li[0]: {"$gte": user[category_li[0]]-i, "$lte": user[category_li[0]]+i},category_li[1]: {"$gte": user[category_li[1]]-i, "$lte": user[category_li[1]]+i},category_li[2]: {"$gte": user[category_li[2]]-i, "$lte": user[category_li[2]]+i}}},{'$sample': {'size':1}}]):
            users.add(one_user['userId'])
            if len(users) == 3:
                exist = True
                break
        if exist:
            break
    return list(users)


def get_cloth(idList):
    if type(idList) == int:
        cloth = db.cloth.find_one({'newClothId': int(idList)}, {'_id': 0})
        return cloth
    else:
        clothes = []
        for cloth_id in idList:
            cloth = db.cloth.find_one({'newClothId': int(cloth_id)}, {'_id': 0})
            clothes.append(cloth_helper(cloth))
        return clothes
    
def get_user_gender(userId):
    user = db.user_ssafit.find_one({'userId': int(userId)})
    return user['userMale']

def get_codi(codiTPO):
    codis = []
    for codi in db.codi.aggregate([{'$project': {"_id": 0}}, {'$match':{f'{codiTPO}': int(1)}},{'$sample': {'size':20}}]):
        codis.append(codi)
    return codis

def get_reviews(newClothId):
    reviews = []
    for review in db.review.aggregate([{'$project': {"_id": 0}}, {'$match': {'newGoodsNo': int(newClothId)}}, {'$sort': {'date': -1}}]):
        reviews.append(review)
    return reviews

def get_img_reviews(newClothId: int, userId: int):
    review_list = []
    user = db.user_ssafit.find_one({'userId': userId}, {'_id': 0})
    for review in db.review.aggregate([{'$match': {'newGoodsNo': int(newClothId), 'reviewStyle': 1}}]):
        review_list.append([review['userHeight'], review['userWeight'], review['reviewId']])
    for i in range(len(review_list)):
        review_list[i][0] = review_list[i][0] - user['userHeight']
        review_list[i][1] = review_list[i][1] - user['userWeight']
    review_list = sorted(review_list, key=lambda x: x[0]+x[1])
    re_list = []
    for j in range(len(review_list)):
        if j == 10:
            break
        re_list.append(review_list[j][2])
    reviews = []
    for i in re_list:
        reviews.append(db.review.find_one({"reviewId": i}, {"_id": 0}))
    return reviews

# def get_brand_clothes(newClothId, userId):
#     cloth = db.cloth.find_one({'newClothId': newClothId})
#     user = db.user_ssafit.find_one({'userId': int(userId)})
#     brand_list = []
#     goods_id = set()
#     for brand in db.cloth.aggregate([{'$match': {'brand': cloth['brand']}}]):
#         if brand['clothId'] not in goods_id:
#             brand_list.append([brand['userHeight'], brand['userWeight'], brand['clothReviewCnt'], brand['newClothId']])
#             goods_id.add(brand['clothId'])
#     for i in range(len(brand_list)):
#         brand_list[i][0] = brand_list[i][0] - user['userHeight']
#         brand_list[i][1] = brand_list[i][1] - user['userWeight']
#     brand_list = sorted(brand_list, key=lambda x: (x[0]+x[1], x[2]))
#     br_list = []
#     for j in range(len(brand_list)):
#         if j == 6:
#             break
#         br_list.append(brand_list[j][3])
#     brands = []
#     for i in br_list:
#         brands.append(db.cloth.find_one({"newClothId": i}, {"_id": 0}))
#     return brands

def get_brand_clothes(newClothId: int):
    cloth = db.cloth.find_one({'newClothId': newClothId})
    if cloth['largeCategory']==1 or cloth['largeCategory']==2 or cloth['largeCategory']==3:
        transaction = db.transaction.find({'shopCnt': {'$gt': 1}, 'brand': cloth['brand']}, {'_id': 0, 'largecategory': 0})
    else:
        transaction = db.transaction.find({'brand': cloth['brand']}, {'_id': 0, 'largecategory': 0})
    transaction = list(transaction)
    transaction = pd.DataFrame(transaction)
    if 10 <= len(transaction):
        if len(transaction) >= 1000:
            a = transaction[transaction.newClothId==newClothId]
            transaction = transaction.sample(n=1000)
            transaction = pd.concat([transaction, a])
            transaction = transaction.drop_duplicates(['userId', 'newClothId'])
        trans = transaction.pivot_table(index='newClothId', columns='userId', values='shopCnt')
        trans.fillna(0, inplace=True)
        SVD = TruncatedSVD(n_components=10)
        SVD_matrix = SVD.fit_transform(trans)
        corr = np.corrcoef(SVD_matrix)
        corr = pd.DataFrame(data=corr, index=trans.index, columns=trans.index)
        corr_list = corr[cloth['newClothId']].sort_values(ascending=False)[:50].index
    else:
        corr_list = list(transaction.newClothId)
    result = []
    sub = set()
    sub.add(cloth['clothId'])
    cnt = 0
    for clothId in corr_list:
        sub_cloth = db.cloth.find_one({'newClothId': clothId}, {'_id': 0})
        if cnt == 0:
            result.append(sub_cloth)
            sub.add(sub_cloth['clothId'])
            cnt += 1
        elif cnt != 0 and sub_cloth['clothId'] not in sub:
            result.append(sub_cloth)
            sub.add(sub_cloth['clothId'])
            cnt += 1
        if cnt == 6:
            break
    return result

def get_similar_clothes(newClothId: int):
    cloth = db.cloth.find_one({'newClothId': newClothId})
    if cloth['largeCategory']==1 or cloth['largeCategory']==2 or cloth['largeCategory']==3:
        transaction = db.transaction.find({'shopCnt': {'$gt': 1}, 'smallCategoryName': cloth['smallCategoryName'], 'colorName': cloth['colorName']}, {'_id': 0, 'largecategory': 0})
    else:
        transaction = db.transaction.find({'smallCategoryName': cloth['smallCategoryName'], 'colorName': cloth['colorName']}, {'_id': 0, 'largecategory': 0})
    transaction = list(transaction)
    transaction = pd.DataFrame(transaction)
    if len(transaction) >= 10:
        if len(transaction) >= 1000:
            a = transaction[transaction.newClothId==newClothId]
            transaction = transaction.sample(n=1000)
            transaction = pd.concat([transaction, a])
            transaction = transaction.drop_duplicates(['userId', 'newClothId'])
        trans = transaction.pivot(index='newClothId', columns='userId', values='shopCnt')
        trans.fillna(0, inplace=True)
        SVD = TruncatedSVD(n_components=10)
        SVD_matrix = SVD.fit_transform(trans)
        corr = np.corrcoef(SVD_matrix)
        corr = pd.DataFrame(data=corr, index=trans.index, columns=trans.index)
        corr_list = corr[cloth['newClothId']].sort_values(ascending=False)[1:50].index
    else:
        corr_list = list(transaction.newClothId)
    result = []
    sub = set()
    sub.add(cloth['clothId'])
    cnt = 0
    for clothId in corr_list:
        sub_cloth = db.cloth.find_one({'newClothId': clothId}, {'_id': 0})
        if cnt == 0:
            result.append(sub_cloth)
            sub.add(sub_cloth['clothId'])
            cnt += 1
        else:
            if sub_cloth['clothId'] not in sub:
                result.append(sub_cloth)
                sub.add(sub_cloth['clothId'])
                cnt += 1
        if cnt == 6:
            break
    return result


def get_cloth_by_user_info(clothId, userId):
    user = db.user_ssafit.find_one({'userId':int(userId)})
    newClothId = ''
    exist = False
    
    for i in range(30):
        for cloth in db.cloth.aggregate([{'$project': {"_id": 0}},{'$match': {'clothId': int(clothId), 'userHeight': {'$in': list(range(user['userHeight']-i, user['userHeight']+i))}, 'userWeight': {'$in': list(range(user['userWeight']-i, user['userWeight']+i))}}}]):
            newClothId = cloth['newClothId']
            if newClothId:
                exist = True
                break
        if exist:
            break
    return newClothId

def change_user_info(userId, newClothId, num):
    cloth = get_cloth(newClothId)
    largecategory = cloth['largeCategory']
    smallCategorySelect = ''
    style = ['size', 'bright', 'color', 'thickness']
    colorSelect = ''
    for idx, col in enumerate(cloth):
        if 'smallCategory' in col and cloth[col] == 1:
            smallCategorySelect = col
        elif col != 'color' and 'color' in col and cloth[col] == 1:
            colorSelect = col
            
    col_list = ['size', 'bright', 'color', 'thickness', 'colorWhite', 
        'colorGrey', 'colorBlack', 'colorRed', 'colorPink', 'colorOrange', 'colorIvory', 'colorYellow',
        'colorGreen', 'colorBlue', 'colorPurple', 'colorBrown', 'colorBeige', 'colorJean', 'colorPattern', 'colorOthers', 
        'smallCategoryHalfshort', 'smallCategoryShirt', 'smallCategoryCollar',
        'smallCategoryHoody', 'smallCategorySweatshirt', 'smallCategoryKnit',
        'smallCategoryLong', 'smallCategoryShort', 'smallCategoryOthers',
        'smallCategoryHoodie', 'smallCategoryBlouson', 'smallCategoryRiders', 'smallCategoryMustang', 
        'smallCategoryCardigan', 'smallCategoryFleece', 'smallCategoryCoat', 'smallCategoryPaddedcoat', 'smallCategoryVest', 'smallCategoryJacket',
        'smallCategoryDenimpants', 'smallCategoryCottonpants', 'smallCategorySlacks',
        'smallCategoryJoggerpants', 'smallCategoryShortpants', 'smallCategoryLeggings', 'smallCategoryJumpsuit',
        'smallCategoryMinidress', 'smallCategoryMidi', 'smallCategoryMaxidress',
        'smallCategoryMiniskirt', 'smallCategoryLongskirt']


    user = db.user_ssafit.find_one({'userId': int(userId), 'largecategory': largecategory})
    if num == 1:
        for idx, cat in enumerate(user):
            # 모든 성분 * viewCnt
            if cat in col_list:
                user[cat] *= user['viewCnt']
                if cat == smallCategorySelect:
                    user[cat] += 1
                elif cat == colorSelect:
                    user[cat] += 1
                elif cat in style:
                    user[cat] += cloth[cat]
                db.user_ssafit.update_one({'userId': int(userId), 'largecategory': largecategory}, {'$set': {'viewCnt': user['viewCnt'], cat: user[cat]}})
            
        # viewCnt += 1
        user['viewCnt'] += 1

        for idx, cat in enumerate(user):
            # 모든 성분 / viewCnt
            if cat in col_list:
                user[cat] /= user['viewCnt']
                db.user_ssafit.update_one({'userId': int(userId), 'largecategory': largecategory}, {'$set': {'viewCnt': user['viewCnt'], cat: user[cat]}})
    
    # 좋아요 취소
    elif num == 2:
        for idx, cat in enumerate(user):
            # 모든 성분 * viewCnt
            if cat in col_list:
                user[cat] *= user['viewCnt']
                if cat == smallCategorySelect and user[cat] >= 1:
                    user[cat] -= 1
                elif cat == colorSelect and user[cat] >= 1:
                    user[cat] -= 1
                elif cat in style and user[cat]:
                    user[cat] -= cloth[cat]
                    if user[cat] < 0:
                        user[cat] = 0
                db.user_ssafit.update_one({'userId': int(userId), 'largecategory': largecategory}, {'$set': {'viewCnt': user['viewCnt'], cat: user[cat]}})

        user['viewCnt'] -= 1
        if user['viewCnt'] == 0:
            for idx, cat in enumerate(user):
                if cat in col_list:
                    user[cat] = 0
                    db.user_ssafit.update_one({'userId': int(userId), 'largecategory': largecategory}, {'$set': {'viewCnt': user['viewCnt'], cat: user[cat]}})
        else:
            for idx, cat in enumerate(user):
                # 모든 성분 / viewCnt
                if cat in col_list:
                    user[cat] /= user['viewCnt']
                    db.user_ssafit.update_one({'userId': int(userId), 'largecategory': largecategory}, {'$set': {'viewCnt': user['viewCnt'], cat: user[cat]}})
    return


def get_recent_items(userId):
    user = db.user_ssafit.find_one({'userId':int(userId), 'largecategory': 1}, {'_id': 0})
    try:
        result = user['recentItems']
        clothes = []
        for cloth_id in result:
            clothes.append(db.cloth.find_one({'newClothId': cloth_id}, {'_id': 0}))
        return clothes
    except:
        return '최근 본 상품이 없습니다.'


def change_recent_item(userId, newClothId):
    cloth = get_cloth(newClothId)
    user = db.user_ssafit.find_one({'userId': int(userId), 'largecategory': 1}, {'_id': 0})
    try:
        if newClothId in user['recentItems']:
            user['recentItems'].remove(newClothId)
            user['recentItems'].insert(0, newClothId)
        elif newClothId not in user['recentItems'] and len(user['recentItems']) < 5:
            user['recentItems'].insert(0, newClothId)
        elif newClothId not in user['recentItems'] and len(user['recentItems']) == 5:
            user['recentItems'].pop()
            user['recentItems'].insert(0, newClothId)
        db.user_ssafit.update_one({'userId': int(userId), 'largecategory': 1}, {'$set': {'recentItems': user['recentItems']}})

    except:
        db.user_ssafit.update_one({'userId': int(userId), 'largecategory': 1}, {'$set': {'recentItems': list()}})
        users = db.user_ssafit.find_one({'userId': int(userId), 'largecategory': 1}, {'_id': 0})
        users['recentItems'].append(newClothId)
        db.user_ssafit.update_one({'userId': int(userId), 'largecategory': 1}, {'$set': {'recentItems': users['recentItems']}})
    return
