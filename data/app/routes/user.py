from fastapi import APIRouter
from ..database.database import *

router = APIRouter()

@router.put('/user/{userId}', tags=["User"])
def changeUserInfo(userId: int, newClothId: int, num: int):
    change_user_info(userId, newClothId, num)
    return

@router.get('/user/{userId}/recentItems', tags=["User"])
def getRecentItems(userId: int):
    result = get_recent_items(userId)
    return result

@router.put('/user/{userId}/changeRecentItem',tags=["User"])
def changeRecentItem(userId: int, newClothId: int):
    change_recent_item(userId, newClothId)
    return