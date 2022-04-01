from fastapi import APIRouter
from pydantic import BaseModel
from ..database.database import *
from fastapi.responses import JSONResponse
from fastapi_pagination import Page, add_pagination, paginate
import pandas as pd

router = APIRouter()

class Review(BaseModel):
    reviewId: int
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
def getCloth(newClothId: int):
    result = get_cloth(newClothId)
    return result


@router.get('/cloth/reviews/{newClothId}', response_model=Page[Review], tags=["Review"])
def getReview(newClothId: int):
    result = get_reviews(newClothId)
    return paginate(result)

@router.get('/cloth/reviews/{newClothId}/{userId}', tags=["Review"])
def getImgReview(newClothId: int, userId: int):
    result = get_img_reviews(newClothId, userId)
    return result

@router.get('/cloth/brand/{newClothId}/{userId}', tags=["Cloth"])
def getBrandClothes(newClothId: int, userId: int):
    result = get_brand_clothes(newClothId, userId)
    return result

@router.get('/cloth/similar/{newClothId}', tags=["Cloth"])
def getSimilarClothes(newClothId: int):
    result = get_similar_clothes(newClothId)
    return result


@router.get('/cloth/isSSAFIT/{clothId}', tags=["Cloth"])
def getNewClothId(clothId: int, userId: int):
    result = get_cloth_by_user_info(clothId, userId)
    return result
