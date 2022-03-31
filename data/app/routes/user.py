from fastapi import APIRouter
from ..database.database import *

router = APIRouter()

@router.put('/user/{userId}', tags=["User"])
def changeUserInfo(userId: int, newClothId: int, num: int):
    change_user_info(userId, newClothId, num)
    return