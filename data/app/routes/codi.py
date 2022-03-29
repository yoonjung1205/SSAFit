from fastapi import APIRouter
from ..database.database import *

router = APIRouter()

@router.get('/codi/{codiTPO}', tags=["Codi"])
async def getCodi(codiTPO: str):
    result = await get_codi(codiTPO)

    return result