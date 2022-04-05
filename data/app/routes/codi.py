from fastapi import APIRouter
from ..database.database import *

router = APIRouter()

@router.get('/codi/{codiTPO}', tags=["Codi"])
def getCodi(codiTPO: str):
    result = get_codi(codiTPO)
    return result