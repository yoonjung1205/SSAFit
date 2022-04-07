from fastapi import APIRouter
from ..database.database import get_codi, get_codi_detail

router = APIRouter()

@router.get('/codi/{codiTPO}', tags=["Codi"])
def getCodi(codiTPO: str):
    result = get_codi(codiTPO)
    return result

@router.get('/codi/detail/{codiId}', tags=["Codi"])
def getCodiDetail(codiId: int):
    result = get_codi_detail(codiId)
    return result