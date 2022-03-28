def user_ssafit_helper(user_ssafit):
    context = {
        "_id": str(user_ssafit['_id']),
        "userId": int(user_ssafit['userId']),
        "largecategory": user_ssafit['largecategory'],
        "userMale": user_ssafit['userMale'],
        "userFemale": user_ssafit['userFemale'],
        "userHeight": user_ssafit['userHeight'],
        "userWeight": user_ssafit['userWeight'],
    }
    return context


def user_meta_helper(user_meta):
    context = {
        "_id": str(user_meta['_id']),
        "userId": int(user_meta['userId']),
        "userMale": user_meta['userMale'],
        "userFemale": user_meta['userFemale'],
        "userHeight": user_meta['userHeight'],
        "userWeight": user_meta['userWeight'],
        "what": user_meta['what']
    }
    return context


def cloth_meta_helper(cloth_meta):
    context = {
        "_id": str(cloth_meta['_id']),
        "newClothId": int(cloth_meta['newClothId']),
        "idx": cloth_meta['idx'],
        "what": cloth_meta['what'],
    }
    return context

# 추천 알고리즘 거쳐 나온 옷 리스트들
def cloth_helper(cloth):
    context = {
        "_id": str(cloth['_id']),
        'newClothId': int(cloth['newClothId']),
        'clothId': cloth['clothId'],
        'largeCategoryName': cloth['largeCategoryName'],
        'smallCategoryName': cloth['smallCategoryName'],
        'colorName': cloth['colorName'],
        'clothName': cloth['clothName'],
        'brand': cloth['brand'],
        'clothImg': cloth['clothImg'],
        'clothPrice': cloth['clothPrice'],
        'date': cloth['date'],
        'clothMale': cloth['clothMale'],
        'clothFemale': cloth['clothFemale'],
        'clothRate': cloth['clothRate'],
        'clothReviewCnt': cloth['clothReviewCnt'],
        'goodsSize': cloth['goodsSize'],
    }
    return context

# detail페이지로 보내줄 cloth
def cloth_detail_helper(cloth):
    context = {
        "_id": str(cloth['_id']),
        'newClothId': int(cloth['newClothId']),
        'clothId': cloth['clothId'],
        'largeCategory': cloth['largeCategory'],
        'largeCategoryName': cloth['largeCategoryName'],
        'smallCategoryName': cloth['smallCategoryName'],
        'colorName': cloth['colorName'],
        'clothName': cloth['clothName'],
        'brand': cloth['brand'],
        'clothImg': cloth['clothImg'],
        'clothPrice': cloth['clothPrice'],
        'date': cloth['date'],
        'clothHashtags': cloth['clothHashtags'],
        'clothMale': cloth['clothMale'],
        'clothFemale': cloth['clothFemale'],
        'clothRate': cloth['clothRate'],
        'clothReviewCnt': cloth['clothReviewCnt'],
        'fit': cloth['fit'],
        'feeling': cloth['feeling'],
        'stretch': cloth['stretch'],
        'visibility': cloth['visibility'],
        'thickness': cloth['thickness'],
        'seasonSpring': cloth['seasonSpring'],
        'seasonSummer': cloth['seasonSummer'],
        'seasonFall': cloth['seasonFall'],
        'seasonWinter': cloth['seasonWinter'],
        'goodsSize': cloth['goodsSize'],
        'reviewNoun': cloth['reviewNoun'],
        'userHeight': cloth['userHeight'],
        'userWeight': cloth['userWeight'],
        'userMale': cloth['userMale'],
        'userFemale': cloth['userFemale'],
        'month1': cloth['month1'],
        'month2': cloth['month2'],
        'month3': cloth['month3'],
        'month4': cloth['month4'],
        'month5': cloth['month5'],
        'month6': cloth['month6'],
        'month7': cloth['month7'],
        'month8': cloth['month8'],
        'month9': cloth['month9'],
        'month10': cloth['month10'],
        'month11': cloth['month11'],
        'month12': cloth['month12'],
    }
    return context


def codi_helper(codi):
    context = {
        "_id": str(codi['_id']),
        "codiId": int(codi['codiId']),
        "codiStyle": str(codi['codiStyle']),
        "codiTitle": str(codi['codiTitle']),
        "codiContents": str(codi['codiContents']),
        "date": str(codi['date']),
        "dateYear": int(codi['dateYear']),
        "dateMonth": int(codi['dateMonth']),
        "dateDay": int(codi['dateDay']),
        "codiDate": int(codi['codiDate']),
        "codiDaily": int(codi['codiDaily']),
        "codiCampus": int(codi['codiCampus']),
        "codiParty": int(codi['codiParty']),
        "codiTravel": int(codi['codiTravel']),
        "codiWedding": int(codi['codiWedding']),
        "codiBusiness": int(codi['codiBusiness']),
        "codiInterview": int(codi['codiInterview']),
        "codiHip": int(codi['codiHip']),
        "codiSports": int(codi['codiSports']),
        "codiGolf": int(codi['codiGolf']),
        "codiOther": int(codi['codiOther']),
        "viewCnt": int(codi['viewCnt']),
        "imgSrc": str(codi['imgSrc']),
        "hashtags": list(codi['hashtags']),
        "clothes": list(codi['clothes']),
    }
    return context