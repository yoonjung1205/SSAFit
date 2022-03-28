from fastapi import APIRouter
from ..database.database import *
from fastapi.responses import JSONResponse
import json


router = APIRouter()


@router.get('/cloth/{newClothId}', tags=["Cloth"])
async def getCloth(newClothId: int):
    result = await get_cloth(newClothId)
    return result

@router.get('/codi/{codiId}')
def getdata(codiId: int):
    pass

    return