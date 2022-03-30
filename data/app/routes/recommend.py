from fastapi import APIRouter
from ..database.database import *
from ..models.user_meta import *
# from .recommend_function import *
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import pandas as pd
import numpy as np
import time
import pickle
import lightfm
from copy import deepcopy

router = APIRouter()

def sample_recommendation(model, clothes, users, user_ids):
    cnt = 1
    for user_id in user_ids:
        if cnt==1:
            scores = model.predict(int(users[users.userId==user_id].index[0]), np.arange(len(clothes)))
        else:
            scores += model.predict(int(users[users.userId==user_id].index[0]), np.arange(len(clothes)))
        
        cnt+=1
    top_items = clothes.idx[np.argsort(-scores)]
    sub_clothes = []
    for x in top_items[:30]:
        sub_clothes.append(x)
    rec_clothes = []
    for i in sub_clothes:
        rec_clothes.append(clothes[clothes.idx==i].newClothId.iloc[0])
    return rec_clothes

def get_size_real_user(users_meta, user_info):
    sub_user = users_meta[users_meta.userFemale==user_info['userFemale']]
    sub_user.userHeight = sub_user.apply(lambda x: abs(x.userHeight-user_info['userHeight']), axis=1)
    sub_user.userWeight = sub_user.apply(lambda x: abs(x.userWeight-user_info['userHeight']), axis=1)
    sub_user.insert(3, 'sizeSum', 0, True)
    sub_user.sizeSum = sub_user.userHeight + sub_user.userWeight
    sub_user = sub_user.sort_values('sizeSum')
    real_user = []
    for i in range(3):
        real_user.append(sub_user.iloc[i].userId)
    return real_user

@router.get('/recommend/size/{userId}', tags=["Recommend"])
async def rec_size(userId: int):
    start = time.time()
    gender = await get_user_gender(userId)
    if gender == 1:
        to_do = 4
    else:
        to_do = 6
    name_list = ['top', 'outer', 'pants', 'onepiece', 'skirt']
    model_list = ['model_size_top.pickle', 'model_size_outer.pickle', 'model_size_pants.pickle', 'model_size_onepiece.pickle', 'model_size_skirt.pickle']
    context = dict()
    for i in range(1,to_do):
        users = pd.DataFrame(await get_size_user_meta(i))
        clothes = pd.DataFrame(await get_cloth_meta(i))
        user_info = await get_size_user_info(userId, i)
        real_user = get_size_real_user(users, user_info)
        model = pickle.load(open('./app/models/'+model_list[i-1], 'rb'))
        rec_size = sample_recommendation(model, clothes, users, real_user)
        result = await get_cloth(rec_size)
        context[name_list[i-1]] = result
    finish = time.time()
    print(finish - start)
    return context

def get_color_real_user(users_meta, user_info):
    colum = list(users_meta.columns)
    di = dict()
    for i in range(len(colum)):
        di[colum[i]] = users_meta[colum[i]][0]
    col_list = []
    for idx, key in enumerate(di):
        if idx > 0 and di[key] > 0.2 and key != 'what':
            col_list.append(key)
    sub_user = deepcopy(users_meta)
    for i in range(1, len(col_list)):
        sub_user[col_list[i]] = sub_user.apply(lambda x: abs(x[col_list[i]]-user_info[col_list[i]]), axis=1)
    sub_col = list(sub_user.columns)[1:]
    sub_user.insert(3, 'colorSum', 0, True)
    sub_user.colorSum = sum(sub_user[col_i] for col_i in sub_col)
    sub_user = sub_user.sort_values('colorSum')
    real_user = []
    for i in range(3):
        real_user.append(sub_user.iloc[i].userId)
    return real_user

@router.get('/recommend/color/{userId}', tags=["Recommend"])
async def rec_color(userId: int):
    start = time.time()
    gender = await get_user_gender(userId)
    if gender == 1:
        to_do = 4
    else:
        to_do = 6
    name_list = ['top', 'outer', 'pants', 'onepiece', 'skirt']
    model_list = ['model_color_top.pickle', 'model_color_outer.pickle', 'model_color_pants.pickle', 'model_color_onepiece.pickle', 'model_color_skirt.pickle']
    context = dict()
    for i in range(1,to_do):
        users = pd.DataFrame(await get_color_user_meta(i+5))
        clothes = pd.DataFrame(await get_cloth_meta(i+5))
        user_info = await get_color_user_info(userId, i)
        real_user = get_color_real_user(users, user_info)
        model = pickle.load(open('./app/models/'+model_list[i-1], 'rb'))
        rec_color = sample_recommendation(model, clothes, users, real_user)
        result = await get_cloth(rec_color)
        context[name_list[i-1]] = result
    finish = time.time()
    print(finish - start)
    return context

def get_style_real_user(users_meta, user_info):
    sub_user = deepcopy(users_meta)
    sub_user['size'] = sub_user.apply(lambda x: abs(x['size']-user_info['size']), axis=1)
    sub_user.bright = sub_user.apply(lambda x: abs(x.bright-user_info['bright']), axis=1)
    sub_user.color = sub_user.apply(lambda x: abs(x.color-user_info['color']), axis=1)
    sub_user.thickness = sub_user.apply(lambda x: abs(x.thickness-user_info['thickness']), axis=1)
    sub_col = list(sub_user.columns)[2:]
    sub_user.insert(3, 'colorSum', 0, True)
    sub_user.colorSum = sum(sub_user[col_i] for col_i in sub_col)
    sub_user = sub_user.sort_values('colorSum')
    real_user = []
    for i in range(3):
        real_user.append(sub_user.iloc[i].userId)
    return real_user

@router.get('/recommend/style/{userId}', tags=["Recommend"])
async def rec_style(userId: int):
    start = time.time()
    gender = await get_user_gender(userId)
    if gender == 1:
        to_do = 4
    else:
        to_do = 6
    name_list = ['top', 'outer', 'pants', 'onepiece', 'skirt']
    model_list = ['model_style_top.pickle', 'model_style_outer.pickle', 'model_style_pants.pickle', 'model_style_onepiece.pickle', 'model_style_skirt.pickle']
    context = dict()
    for i in range(1,to_do):
        users = pd.DataFrame(await get_style_user_meta(i+10))
        clothes = pd.DataFrame(await get_cloth_meta(i+10))
        user_info = await get_style_user_info(userId, i)
        real_user = get_style_real_user(users, user_info)
        model = pickle.load(open('./app/models/'+model_list[i-1], 'rb'))
        rec_style = sample_recommendation(model, clothes, users, real_user)
        result = await get_cloth(rec_style)
        context[name_list[i-1]] = result
    finish = time.time()
    print(finish - start)
    return context


def get_category_real_user(users_meta, user_info):
    colum = list(users_meta.columns)
    di = dict()
    for i in range(len(colum)):
        di[colum[i]] = users_meta[colum[i]][0]
    col_list = []
    for idx, key in enumerate(di):
        if idx > 0 and di[key] > 0.2 and key != 'what':
            col_list.append(key)
    sub_user = deepcopy(users_meta)
    for i in range(1, len(col_list)):
        sub_user[col_list[i]] = sub_user.apply(lambda x: abs(x[col_list[i]]-user_info[col_list[i]]), axis=1)
    sub_col = list(sub_user.columns)[1:]
    sub_user.insert(1, 'categorySum', 0, True)
    sub_user.categorySum = sum(sub_user[col_i] for col_i in sub_col)
    sub_user = sub_user.sort_values('categorySum')
    real_user = []
    for i in range(3):
        real_user.append(sub_user.iloc[i].userId)
    return real_user

@router.get('/recommend/category/{userId}', tags=["Recommend"])
async def rec_category(userId: int):
    start = time.time()
    gender = await get_user_gender(userId)
    if gender == 1:
        to_do = 4
    else:
        to_do = 6
    name_list = ['top', 'outer', 'pants', 'onepiece', 'skirt']
    model_list = ['model_category_top.pickle', 'model_category_outer.pickle', 'model_category_pants.pickle', 'model_category_onepiece.pickle', 'model_category_skirt.pickle']
    context = dict()
    for i in range(1,to_do):
        users = pd.DataFrame(await get_category_user_meta(i+15))
        clothes = pd.DataFrame(await get_cloth_meta(i+15))
        user_info = await get_category_user_info(userId, i)
        real_user = get_category_real_user(users, user_info)
        model = pickle.load(open('./app/models/'+model_list[i-1], 'rb'))
        rec_category = sample_recommendation(model, clothes, users, real_user)
        result = await get_cloth(rec_category)
        context[name_list[i-1]] = result
    finish = time.time()
    print(finish - start)
    return context