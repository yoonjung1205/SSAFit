from fastapi import APIRouter
from pydantic import BaseModel
from ..database.database import *
from fastapi.responses import JSONResponse
from fastapi_pagination import Page, add_pagination, paginate
import pandas as pd

router = APIRouter()

class Review(BaseModel):
    userName: str
    date: str
    goodsNo: int
    userSexMen: int
    userSexWomen: int
    userHeight: int
    userWeight: int
    goodsSize: str
    reviewContent: list
    reviewImg: str
    reviewStyle: int
    size: int
    bright: int
    color: int
    newGoodsNo: int

@router.get('/cloth/{newClothId}', tags=["Cloth"])
async def getCloth(newClothId: int):
    result = await get_cloth(newClothId)
    return result


@router.get('/cloth/reviews/{newClothId}', response_model=Page[Review], tags=["Review"])
async def getReview(newClothId: int):
    result = await get_reviews(newClothId)
    return paginate(result)

@router.get('/cloth/reviews/{newClothId}/{userId}/', tags=["Review"])
async def getImgReview(newClothId: int, userId: int):
    gender, height, weight = await get_user_info(userId)
    df_review = pd.DataFrame(await get_img_reviews(newClothId))
    df_review.userHeight = df_review.apply(lambda x: abs(x.userHeight-height), axis=1)
    df_review.userWeight = df_review.apply(lambda x: abs(x.userWeight-weight), axis=1)
    df_review.insert(2, 'summation', 0, True)
    df_review.summation = df_review.userHeight + df_review.userWeight
    if gender == 1:
        df_review = df_review.sort_values(['summation', 'userSexMen'])
    else:
        df_review = df_review.sort_values(['summation', 'userSexWomen'])
    id_list = list(df_review._id[:10])
    result = await get_img_reviews_by_id(id_list)
    return result

@router.get('/cloth/brand/{newClothId}/{userId}', tags=["Cloth"])
async def getBrandClothes(newClothId: int, userId: int):
    result = await get_brand_clothes(newClothId, userId)
    return result

@router.get('/cloth/similar/{newClothId}/{userId}', tags=["Cloth"])
async def getSimilarClothes(newClothId: int, userId: int):
    result = await get_similar_clothes(newClothId, userId)
    return result