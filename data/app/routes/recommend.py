from fastapi import APIRouter
# from mongoengine import connect
from ..database.database import *
from ..models.user_meta import *
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import pandas as pd
import numpy as np
import time
import pickle
import lightfm

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

@router.get('/rec/size/{userId}')
async def rec_size(userId: int):
    start = time.time()
    gender = await get_user_gender(userId)
    if gender == 1:
        to_do = list(range(1, 4))
    else:
        to_do = list(range(1, 6))
    name_list = ['top', 'outer', 'pants', 'onepiece', 'skirt']
    model_list = ['model_size_top.pickle', 'model_size_outer.pickle', 'model_size_pants.pickle', 'model_size_onepiece.pickle', 'model_size_skirt.pickle']
    context = dict()
    for i in to_do:
        users = pd.DataFrame(await retrieve_users(i))
        clothes = pd.DataFrame(await retrieve_clothes(i))
        user_info = await retrieve_user(userId, i)
        real_user = get_size_real_user(users, user_info)
        model = pickle.load(open('./app/routes/'+model_list[i-1], 'rb'))
        rec_size = sample_recommendation(model, clothes, users, real_user)
        result = await get_cloth(rec_size)
        context[name_list[i-1]] = result
    finish = time.time()
    print(finish - start)
    return context

# top : 18초
# outer : 10초
# pants : 13초
# onepiece : 9초
# skirt : 10초

# @router.get('/codi/category/{codiCategory}')
# def getcodi_by_category(codiCategory):
#     codis = json.loads(Codi.objects(codiStyle=codiCategory).to_json())
#     cate_cnt = Codi.objects(codiStyle=codiCategory).count()
#     return cate_cnt

# @router.get('/codi/{codiId}')
# def getdata(codiId: int):
#     codis = json.loads(Codi.objects(codiId=codiId).to_json())
#     codi_cnt = Codi.objects.get(codiId=codiId)
#     print(codi_cnt)

#     # print(Codi.objects())
#     # codi = json.loads(Codi.objects.get(codiId=codiId).to_json())
    
#     return codis
'''
만들어야할 api
size(유저의 키,몸무게,성별) 맞춤추천
취향(자주 구입한 옷의 정보, smallCategory, 몇 월에 자주 샀는지에 대한 정보, ELK) 맞춤추천
유사상품(SVD, 그 옷의 정보를 통해 추천) 추천
같은 브랜드 인기상품
코디 추천(상황 별 추천) : 랜덤하게 or 알고리즘을 통해 추천


'''
