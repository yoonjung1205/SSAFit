from fastapi import APIRouter
from fastapi.responses import JSONResponse
import json


router = APIRouter()


@router.get('/api_da/cloth/{clothId}')
def getCloth():
    
    return 

@router.get('/codi/{codiId}')
def getdata(codiId: int):
    codis = json.loads(Codi.objects(codiId=codiId).to_json())
    codi_cnt = Codi.objects.get(codiId=codiId)
    print(codi_cnt)

    # print(Codi.objects())
    # codi = json.loads(Codi.objects.get(codiId=codiId).to_json())
    
    return codis