from fastapi import APIRouter
from ..database.database import *
from pydantic import BaseModel
from typing import List

router = APIRouter()
    
class Item(BaseModel):
    newClothId: int
    num: int
    
class Item_User(BaseModel):
    newClothId: int

@router.get('/user/recentItems/{userId}', tags=["User"])
def getRecentItems(userId: int):
    result = get_recent_items(userId)
    
    return result

@router.put('/user/changeRecentItem/{userId}', tags=["User"])
def changeRecentItem(userId: int, item: Item_User):
    change_recent_item(userId, item.newClothId)
    return

@router.put('/user/{userId}', tags=["User"])
def changeUserInfo(userId: int, item: Item):
    change_user_info(userId, item.newClothId, item.num)
    return