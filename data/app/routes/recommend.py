from fastapi import APIRouter
router = APIRouter()
@router.get('/rec')
def recommend():
    return {"hello":"recommend!!"}

'''
만들어야할 api
size(유저의 키,몸무게,성별) 맞춤추천
취향(자주 구입한 옷의 정보, smallCategory, 몇 월에 자주 샀는지에 대한 정보, ELK) 맞춤추천
유사상품(SVD, 그 옷의 정보를 통해 추천) 추천
같은 브랜드 인기상품
코디 추천(상황 별 추천) : 랜덤하게 or 알고리즘을 통해 추천


'''
