import motor.motor_asyncio
from pymongo import MongoClient
import asyncio
import json
from bson import ObjectId, json_util
from fastapi.encoders import jsonable_encoder
import numpy as np
import time

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
    review_list = set()
    user = db.user_ssafit.find_one({'userId': userId}, {'_id': 0})
    exist = False
    for i in range(30):
        for review in db.review.aggregate([{'$match': {'newGoodsNo': int(newClothId), 'userHeight': {'$in': list(range(user['userHeight']-i, user['userHeight']+i))}, 'userWeight': {'$in': list(range(user['userWeight']-i, user['userWeight']+i))}}}]):
            review_list.add(review['_id'])
            if len(review_list) == 10:
                exist = True
                break
        if exist:
            break
    reviews = []
    for i in review_list:
        reviews.append(db.review.find_one({"_id": i}, {"_id": 0}))
    return reviews

def get_brand_clothes(newClothId, userId):
    cloth = db.cloth.find_one({'newClothId': newClothId})
    user = db.user_ssafit.find_one({'userId': int(userId)})
    brand_list = set()
    exist = False
    for i in range(30):
        for brand in db.cloth.aggregate([{'$match': {'brand': cloth['brand'], 'userHeight': {'$in': list(range(user['userHeight']-i, user['userHeight']+i))}, 'userWeight': {'$in': list(range(user['userWeight']-i, user['userWeight']+i))}}}, {'$sort': {'clothReviewCnt': -1}}]):
            if brand['_id'] != cloth['_id']:
                brand_list.add(brand['_id'])
            if len(brand_list) == 6:
                exist = True
                break
        if exist:
            break
    brands = []
    for i in brand_list:
        brands.append(db.cloth.find_one({"_id": i}, {"_id": 0}))
    return brands


def get_similar_clothes(newClothId, userId):
    cloth = db.cloth.find_one({'newClothId': newClothId})
    user = db.user_ssafit.find_one({'userId': int(userId)})
    similar_list = set()
    exist = False
    for i in range(30):
        for similar in db.cloth.aggregate([{'$match': {'smallCategoryName': cloth['smallCategoryName'], 'colorName': cloth['colorName'], 'userHeight': {'$in': list(range(user['userHeight']-i, user['userHeight']+i))}, 'userWeight': {'$in': list(range(user['userWeight']-i, user['userWeight']+i))}}}, {'$sort': {'clothReviewCnt': -1}}]):
            if similar['_id'] != cloth['_id']:
                similar_list.add(similar['_id'])
            if len(similar_list) == 6:
                exist = True
                break
        if exist:
            break
    similar_clothes = []
    for i in similar_list:
        similar_clothes.append(db.cloth.find_one({"_id": i}, {"_id": 0}))
    return similar_clothes