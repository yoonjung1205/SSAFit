from fastapi import APIRouter
from ..database.database import *
from fastapi.responses import JSONResponse


router = APIRouter()


@router.get('/cloth/{newClothId}', tags=["Cloth"])
async def getCloth(newClothId: int):
    result = await get_cloth(newClothId)
    return result

@router.get('/codi/{codiTPO}', tags=["Codi"])
async def getCodi(codiTPO: str):
    result = await get_codi(codiTPO)
    # return result[:4] # 스웨거 확인용
    return result