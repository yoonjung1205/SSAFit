import motor.motor_asyncio
import asyncio
from bson import ObjectId
from .database_helper import *
import time

mongo_url = "mongodb://admin:ssafit@ssafit.site:8975/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
client = motor.motor_asyncio.AsyncIOMotorClient(mongo_url)
client.get_io_loop = asyncio.get_running_loop
database = client.ssafit

cloth_collection = database.get_collection('cloth')
user_meta_collection = database.get_collection('user_meta')
# user_meta_color_collection = database.get_collection('user_meta_color')
cloth_meta_collection = database.get_collection('cloth_meta')
user_ssafit_collection = database.get_collection('user_ssafit')
codi_collection = database.get_collection('codi')
review_collection = database.get_collection('review')

async def get_cloth_meta(what_id):
    clothes = []
    async for cloth in cloth_meta_collection.find({'what': int(what_id)}):
        clothes.append(cloth_meta_helper(cloth))
    return clothes

async def get_size_user_meta(what_id: int):
    users = []
    async for user in user_meta_collection.find({'what': what_id}):
        users.append(user_meta_size_helper(user))
    return users

async def get_size_user_info(userId, largecategory):
    user = await user_ssafit_collection.find_one({'userId': int(userId), 'largecategory': int(largecategory)})
    return user_ssafit_size_helper(user)

async def get_color_user_meta(what_id):
    users = []
    async for user in user_meta_collection.find({'what': int(what_id)}):
        users.append(user_meta_color_helper(user))
    return users

async def get_color_user_info(userId, largecategory):
    user = await user_ssafit_collection.find_one({'userId': int(userId), 'largecategory': int(largecategory)})
    return user_ssafit_color_helper(user)

async def get_style_user_meta(what_id):
    users = []
    async for user in user_meta_collection.find({'what': int(what_id)}):
        users.append(user_meta_style_helper(user))
    return users

async def get_style_user_info(userId, largecategory):
    user = await user_ssafit_collection.find_one({'userId': int(userId), 'largecategory': int(largecategory)})
    return user_ssafit_style_helper(user)

async def get_category_user_meta(what_id):
    users = []
    if what_id == 16:
        async for user in user_meta_collection.find({'what': int(what_id)}):
            users.append(user_meta_category_top_helper(user))
    elif what_id == 17:
        async for user in user_meta_collection.find({'what': int(what_id)}):
            users.append(user_meta_category_outer_helper(user))
    elif what_id == 18:
        async for user in user_meta_collection.find({'what': int(what_id)}):
            users.append(user_meta_category_pants_helper(user))
    elif what_id == 19:
        async for user in user_meta_collection.find({'what': int(what_id)}):
            users.append(user_meta_category_onepiece_helper(user))
    elif what_id == 20:
        async for user in user_meta_collection.find({'what': int(what_id)}):
            users.append(user_meta_category_skirt_helper(user))
    return users

async def get_category_user_info(userId, largecategory):
    if largecategory == 1:
        user = await user_ssafit_collection.find_one({'userId': int(userId), 'largecategory': int(largecategory)})
        return user_ssafit_category_top_helper(user)
    elif largecategory == 2:
        user = await user_ssafit_collection.find_one({'userId': int(userId), 'largecategory': int(largecategory)})
        return user_ssafit_category_outer_helper(user)
    elif largecategory == 3:
        user = await user_ssafit_collection.find_one({'userId': int(userId), 'largecategory': int(largecategory)})
        return user_ssafit_category_pants_helper(user)
    elif largecategory == 4:
        user = await user_ssafit_collection.find_one({'userId': int(userId), 'largecategory': int(largecategory)})
        return user_ssafit_category_onepiece_helper(user)
    elif largecategory == 5:
        user = await user_ssafit_collection.find_one({'userId': int(userId), 'largecategory': int(largecategory)})
        return user_ssafit_category_skirt_helper(user)
    


async def get_cloth(idList):
    clothes = []
    if type(idList) == int:
        cloth = await cloth_collection.find_one({'newClothId': int(idList)})
        clothes.append(cloth_detail_helper(cloth))
    else:
        for cloth_id in idList:
            cloth = await cloth_collection.find_one({'newClothId': int(cloth_id)})
            clothes.append(cloth_helper(cloth))
    return clothes
    
async def get_user_gender(userId):
    user = await user_ssafit_collection.find_one({'userId': int(userId)})
    return user_ssafit_helper(user)['userMale']

async def get_codi(codiTPO):
    codis = []
    async for codi in codi_collection.aggregate([{'$match':{f'{codiTPO}': int(1)}},{'$sample': {'size':20}}]):
        codis.append(codi_helper(codi))
    return codis

async def get_reviews(newClothId):
    reviews = []
    async for review in review_collection.aggregate([{'$match': {'newGoodsNo': int(newClothId)}}, {'$sort': {'date': -1}}]):
        reviews.append(review_helper(review))
    return reviews

async def get_user_info(userId):
    user = await user_ssafit_collection.find_one({'userId': int(userId)})
    users = user_ssafit_helper(user)
    return user['userMale'], users['userHeight'], users['userWeight']

async def get_img_reviews(newClothId):
    reviews = []
    async for review in review_collection.find({'newGoodsNo': int(newClothId), 'reviewStyle': int(1)}):
        reviews.append(review_img_helper(review))
    return reviews

async def get_img_reviews_by_id(id_list):
    reviews = []
    for review_id in id_list:
        review = await review_collection.find_one({'_id': ObjectId(review_id)})
        reviews.append(review_img_helper(review))
    return reviews

async def get_brand_clothes(newClothId, userId):
    cloth = await cloth_collection.find_one({'newClothId': newClothId})
    cloth = cloth_detail_helper(cloth)
    user = await user_ssafit_collection.find_one({'userId': int(userId)})
    users = user_ssafit_helper(user)
    brands = []
    check = []
    check.append(cloth['clothId'])
    cnt = 0
    exist = False
    print(time.time())
    for i in range(20):
        async for brand in cloth_collection.aggregate([{'$match': {'brand': cloth['brand'], 'userHeight': {'$in': list(range(users['userHeight']-i, users['userHeight']+i))}, 'userWeight': {'$in': list(range(users['userWeight']-i, users['userWeight']+i))}}},{'$sample': {'size':1}}]):
            if brand:
                brand = cloth_helper(brand)
                if brand['clothId'] not in check:
                    brands.append(brand)
                    check.append(brand['clothId'])
                    cnt += 1
            if cnt == 6:
                exist = True
                break
        if exist:
            break
    print(time.time())
    return brands


async def get_similar_clothes(newClothId, userId):
    cloth = await cloth_collection.find_one({'newClothId': newClothId})
    cloth = cloth_detail_helper(cloth)
    user = await user_ssafit_collection.find_one({'userId': int(userId)})
    users = user_ssafit_helper(user)
    similar_clothes = []
    check = []
    check.append(cloth['clothId'])
    cnt = 0
    exist = False
    for i in range(20):
        async for similar in cloth_collection.aggregate([{'$match': {'smallCategoryName': cloth['smallCategoryName'], 'colorName': cloth['colorName'], 'userHeight': {'$in': list(range(users['userHeight']-i, users['userHeight']+i))}, 'userWeight': {'$in': list(range(users['userWeight']-i, users['userWeight']+i))}}},{'$sample': {'size':1}}]):
            if similar:
                similar = cloth_helper(similar)
                if similar['clothId'] not in check:
                    similar_clothes.append(similar)
                    check.append(similar['clothId'])
                    cnt += 1
            if cnt == 6:
                exist = True
                break
        if exist:
            break
    return similar_clothes