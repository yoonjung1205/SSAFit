from fastapi import APIRouter
from ..database.database import *
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get('/cloth/{newClothId}', tags=["Cloth"])
async def getCloth(newClothId: int):
    result = await get_cloth(newClothId)
    return result

