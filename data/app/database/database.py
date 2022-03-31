import motor.motor_asyncio
from pymongo import MongoClient
import asyncio
import json
from bson import ObjectId, json_util
from fastapi.encoders import jsonable_encoder
import numpy as np
import pandas as pd
import time
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD

mongo_url = "mongodb://admin:ssafit@ssafit.site:8975/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

client = MongoClient(mongo_url)
db = client['ssafit']


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
            clothes.append(jsonable_encoder(cloth))
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

def get_brand_clothes(newClothId, userId):
    cloth = db.cloth.find_one({'newClothId': newClothId})
    user = db.user_ssafit.find_one({'userId': int(userId)})
    brand_list = []
    goods_id = set()
    for brand in db.cloth.aggregate([{'$match': {'brand': cloth['brand']}}]):
        if brand['clothId'] not in goods_id:
            brand_list.append([brand['userHeight'], brand['userWeight'], brand['clothReviewCnt'], brand['newClothId']])
            goods_id.add(brand['clothId'])
    for i in range(len(brand_list)):
        brand_list[i][0] = brand_list[i][0] - user['userHeight']
        brand_list[i][1] = brand_list[i][1] - user['userWeight']
    brand_list = sorted(brand_list, key=lambda x: (x[0]+x[1], x[2]))
    br_list = []
    for j in range(len(brand_list)):
        if j == 6:
            break
        br_list.append(brand_list[j][3])
    brands = []
    for i in br_list:
        brands.append(db.cloth.find_one({"newClothId": i}, {"_id": 0}))
    return brands

def get_similar_clothes(newClothId: int):
    cloth = db.cloth.find_one({'newClothId': newClothId})
    transaction = db.transaction.find({'shopCnt': {'$gt': 1}, 'smallCategoryName': cloth['smallCategoryName'], 'colorName': cloth['colorName']}, {'_id': 0, 'largecategory': 0})
    transaction = list(transaction)
    transaction = pd.DataFrame(transaction)
    trans = transaction.pivot(index='newClothId', columns='userId', values='shopCnt')
    trans.fillna(0, inplace=True)
    SVD = TruncatedSVD(n_components=10)
    SVD_matrix = SVD.fit_transform(trans)
    corr = np.corrcoef(SVD_matrix)
    corr = pd.DataFrame(data=corr, index=trans.index, columns=trans.index)
    corr_list = corr[cloth['newClothId']].sort_values(ascending=False)[1:50].index
    result = []
    sub = set()
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

