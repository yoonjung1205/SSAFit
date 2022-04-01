from urllib import response
from fastapi import APIRouter
from ..database.database import *
from pydantic import BaseModel

router = APIRouter()
    
class Rec(BaseModel):
    newClothId : int
    clothName : str
    clothImg: str
    brand: str
    clothPrice: int
    goodsSize: str

@router.put('/user/{userId}', tags=["User"])
def changeUserInfo(userId: int, newClothId: int, num: int):
    change_user_info(userId, newClothId, num)
    return

@router.get('/user/{userId}/recentItems', response_model=list[Rec], tags=["User"])
def getRecentItems(userId: int):
    result = get_recent_items(userId)
    return result

@router.put('/user/{userId}/changeRecentItem',tags=["User"])
def changeRecentItem(userId: int, newClothId: int):
    change_recent_item(userId, newClothId)
    return