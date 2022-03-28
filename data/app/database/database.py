import motor.motor_asyncio
import asyncio
from bson import ObjectId
from .database_helper import *

mongo_url = "mongodb://admin:ssafit@ssafit.site:8975/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
client = motor.motor_asyncio.AsyncIOMotorClient(mongo_url)
client.get_io_loop = asyncio.get_running_loop
database = client.ssafit

cloth_collection = database.get_collection('cloth')
user_meta_collection = database.get_collection('user_meta')
cloth_meta_collection = database.get_collection('cloth_meta')
user_ssafit_collection = database.get_collection('user_ssafiit')
codi_collection = database.get_collection('codi')

async def get_cloth_meta(what_id):
    clothes = []
    async for cloth in cloth_meta_collection.find({'what': int(what_id)}):
        clothes.append(cloth_meta_helper(cloth))
    return clothes

async def get_size_user_meta(what_id):
    users = []
    async for user in user_meta_collection.find({'what': int(what_id)}):
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
    async for codi in codi_collection.find({f'{codiTPO}': int(1)}):
        codis.append(codi_helper(codi))
    
    return codis