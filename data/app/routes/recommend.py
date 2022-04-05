from fastapi import APIRouter
from ..database.database import *
from ..models.user_meta import *
import pandas as pd
import numpy as np
import pickle
import lightfm
from copy import deepcopy
from pydantic import BaseModel
from typing import List

router = APIRouter()

class Rec(BaseModel):
    newClothId : int
    clothName : str
    clothImg: str
    brand: str
    clothPrice: int
    goodsSize: str
    

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


@router.get('/recommend/size/{userId}', tags=["Recommend"])
def rec_size(userId: int):
    gender = get_user_gender(userId)
    if gender == 1:
        to_do = 4
    else:
        to_do = 6
    name_list = ['top', 'outer', 'pants', 'onepiece', 'skirt']
    model_list = ['model_size_top.pickle', 'model_size_outer.pickle', 'model_size_pants.pickle', 'model_size_onepiece.pickle', 'model_size_skirt.pickle']
    context = dict()
    for i in range(1,to_do):
        users = pd.DataFrame(get_user_meta(i, userId))
        clothes = pd.DataFrame(get_cloth_meta(i))
        user_info = get_size_user_info(userId, i)
        model = pickle.load(open('./app/models/'+model_list[i-1], 'rb'))
        rec_size = sample_recommendation(model, clothes, users, user_info)
        result = get_cloth(rec_size)
        context[name_list[i-1]] = result

    return context


@router.get('/recommend/color/{userId}', tags=["Recommend"])
def rec_color(userId: int):
    gender = get_user_gender(userId)
    if gender == 1:
        to_do = 4
    else:
        to_do = 6
    name_list = ['top', 'outer', 'pants', 'onepiece', 'skirt']
    model_list = ['model_color_top.pickle', 'model_color_outer.pickle', 'model_color_pants.pickle', 'model_color_onepiece.pickle', 'model_color_skirt.pickle']
    context = dict()
    for i in range(1,to_do):
        users = pd.DataFrame(get_user_meta(i, userId))
        clothes = pd.DataFrame(get_cloth_meta(i))
        user_info = get_color_user_info(userId, i)
        model = pickle.load(open('./app/models/'+model_list[i-1], 'rb'))
        rec_size = sample_recommendation(model, clothes, users, user_info)
        result = get_cloth(rec_size)
        context[name_list[i-1]] = result

    return context


@router.get('/recommend/style/{userId}', tags=["Recommend"])
def rec_style(userId: int):
    gender = get_user_gender(userId)
    if gender == 1:
        to_do = 4
    else:
        to_do = 6
    name_list = ['top', 'outer', 'pants', 'onepiece', 'skirt']
    model_list = ['model_style_top.pickle', 'model_style_outer.pickle', 'model_style_pants.pickle', 'model_style_onepiece.pickle', 'model_style_skirt.pickle']
    context = dict()
    for i in range(1,to_do):
        users = pd.DataFrame(get_user_meta(i, userId))
        clothes = pd.DataFrame(get_cloth_meta(i))
        user_info = get_style_user_info(userId, i)
        model = pickle.load(open('./app/models/'+model_list[i-1], 'rb'))
        rec_size = sample_recommendation(model, clothes, users, user_info)
        result = get_cloth(rec_size)
        context[name_list[i-1]] = result

    return context


@router.get('/recommend/category/{userId}', tags=["Recommend"])
def rec_category(userId: int):
    gender = get_user_gender(userId)
    if gender == 1:
        to_do = 4
    else:
        to_do = 6
    name_list = ['top', 'outer', 'pants', 'onepiece', 'skirt']
    model_list = ['model_category_top.pickle', 'model_category_outer.pickle', 'model_category_pants.pickle', 'model_category_onepiece.pickle', 'model_category_skirt.pickle']
    context = dict()
    for i in range(1,to_do):
        users = pd.DataFrame(get_user_meta(i, userId))
        clothes = pd.DataFrame(get_cloth_meta(i))
        user_info = get_category_user_info(userId, i)
        model = pickle.load(open('./app/models/'+model_list[i-1], 'rb'))
        rec_size = sample_recommendation(model, clothes, users, user_info)
        result = get_cloth(rec_size)
        context[name_list[i-1]] = result

    return context

@router.get('/cloth/brand/{newClothId}', response_model=List[Rec], tags=["Recommend"])
def getBrandClothes(newClothId: int):
    result = get_brand_clothes(newClothId)

    return result

@router.get('/cloth/similar/{newClothId}', response_model=List[Rec], tags=["Recommend"])
def getSimilarClothes(newClothId: int):
    result = get_similar_clothes(newClothId)

    return result