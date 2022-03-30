def user_ssafit_helper(user_ssafit):
    context = {
        "_id": str(user_ssafit['_id']),
        "userId": int(user_ssafit['userId']),
        "userMale": user_ssafit['userMale'],
        "userFemale": user_ssafit['userFemale'],
        "userHeight": user_ssafit['userHeight'],
        "userWeight": user_ssafit['userWeight'],
    }
    return context

def user_ssafit_size_helper(user_ssafit):
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

def user_ssafit_color_helper(user_ssafit):
    context = {
        "_id": str(user_ssafit['_id']),
        "userId": int(user_ssafit['userId']),
        "largecategory": user_ssafit['largecategory'],
        "colorWhite": user_ssafit['colorWhite'],
        "colorGrey": user_ssafit['colorGrey'],
        "colorBlack": user_ssafit['colorBlack'],
        "colorRed": user_ssafit['colorRed'],
        "colorPink": user_ssafit['colorPink'],
        "colorOrange": user_ssafit['colorOrange'],
        "colorIvory": user_ssafit['colorIvory'],
        "colorYellow": user_ssafit['colorYellow'],
        "colorGreen": user_ssafit['colorGreen'],
        "colorBlue": user_ssafit['colorBlue'],
        "colorBrown": user_ssafit['colorBrown'],
        "colorBeige": user_ssafit['colorBeige'],
        "colorJean": user_ssafit['colorJean'],
        "colorPattern": user_ssafit['colorPattern'],
        "colorOthers": user_ssafit['colorOthers']
    }
    return context

def user_ssafit_style_helper(user_ssafit):
    context = {
        "_id": str(user_ssafit['_id']),
        "userId": int(user_ssafit['userId']),
        "largecategory": user_ssafit['largecategory'],
        "size": user_ssafit['size'],
        "bright": user_ssafit['bright'],
        "color": user_ssafit['color'],
        "thickness": user_ssafit['thickness']
    }
    return context

def user_ssafit_category_top_helper(user_ssafit):
    context = {
        "_id": str(user_ssafit['_id']),
        "userId": int(user_ssafit['userId']),
        "largecategory": user_ssafit['largecategory'],
        "smallCategoryHalfshort": user_ssafit['smallCategoryHalfshort'],
        "smallCategoryShirt": user_ssafit['smallCategoryShirt'],
        "smallCategoryCollar": user_ssafit['smallCategoryCollar'],
        "smallCategoryHoody": user_ssafit['smallCategoryHoody'],
        "smallCategorySweatshirt": user_ssafit['smallCategorySweatshirt'],
        "smallCategoryKnit": user_ssafit['smallCategoryKnit'],
        "smallCategoryLong": user_ssafit['smallCategoryLong'],
        "smallCategoryShort": user_ssafit['smallCategoryShort'],
        "smallCategoryOthers": user_ssafit['smallCategoryOthers'],
    }
    return context

def user_ssafit_category_outer_helper(user_ssafit):
    context = {
        "_id": str(user_ssafit['_id']),
        "userId": int(user_ssafit['userId']),
        "largecategory": user_ssafit['largecategory'],
        "smallCategoryHoodie": user_ssafit['smallCategoryHoodie'],
        "smallCategoryBlouson": user_ssafit['smallCategoryBlouson'],
        "smallCategoryRiders": user_ssafit['smallCategoryRiders'],
        "smallCategoryMustang": user_ssafit['smallCategoryMustang'],
        "smallCategoryCardigan": user_ssafit['smallCategoryCardigan'],
        "smallCategoryFleece": user_ssafit['smallCategoryFleece'],
        "smallCategoryCoat": user_ssafit['smallCategoryCoat'],
        "smallCategoryPaddedcoat": user_ssafit['smallCategoryPaddedcoat'],
        "smallCategoryVest": user_ssafit['smallCategoryVest'],
        "smallCategoryJacket": user_ssafit['smallCategoryJacket'],
        "smallCategoryOthers": user_ssafit['smallCategoryOthers'],
    }
    return context

def user_ssafit_category_pants_helper(user_ssafit):
    context = {
        "_id": str(user_ssafit['_id']),
        "userId": int(user_ssafit['userId']),
        "largecategory": user_ssafit['largecategory'],
        "smallCategoryDenimpants": user_ssafit['smallCategoryDenimpants'],
        "smallCategoryCottonpants": user_ssafit['smallCategoryCottonpants'],
        "smallCategorySlacks": user_ssafit['smallCategorySlacks'],
        "smallCategoryJoggerpants": user_ssafit['smallCategoryJoggerpants'],
        "smallCategoryShortpants": user_ssafit['smallCategoryShortpants'],
        "smallCategoryLeggings": user_ssafit['smallCategoryLeggings'],
        "smallCategoryJumpsuit": user_ssafit['smallCategoryJumpsuit'],
        "smallCategoryOthers": user_ssafit['smallCategoryOthers'],
    }
    return context

def user_ssafit_category_onepiece_helper(user_ssafit):
    context = {
        "_id": str(user_ssafit['_id']),
        "userId": int(user_ssafit['userId']),
        "largecategory": user_ssafit['largecategory'],
        "smallCategoryMinidress": user_ssafit['smallCategoryMinidress'],
        "smallCategoryMidi": user_ssafit['smallCategoryMidi'],
        "smallCategoryMaxidress": user_ssafit['smallCategoryMaxidress'],
    }
    return context

def user_ssafit_category_skirt_helper(user_ssafit):
    context = {
        "_id": str(user_ssafit['_id']),
        "userId": int(user_ssafit['userId']),
        "largecategory": user_ssafit['largecategory'],
        "smallCategoryMiniskirt": user_ssafit['smallCategoryMiniskirt'],
        "smallCategoryMidi": user_ssafit['smallCategoryMidi'],
        "smallCategoryLongskirt": user_ssafit['smallCategoryLongskirt'],
    }
    return context

def user_size_helper(user_meta):
    context = {
        "_id": str(user_meta['_id']),
        "userId": int(user_meta['userId']),
        "userMale": user_meta['userMale'],
        "userFemale": user_meta['userFemale'],
        "userHeight": user_meta['userHeight'],
        "userWeight": user_meta['userWeight']
    }
    return context

def user_meta_color_helper(user_meta):
    context = {
        "_id": str(user_meta['_id']),
        "userId": int(user_meta['userId']),
        "colorWhite": user_meta['colorWhite'],
        "colorGrey": user_meta['colorGrey'],
        "colorBlack": user_meta['colorBlack'],
        "colorRed": user_meta['colorRed'],
        "colorPink": user_meta['colorPink'],
        "colorOrange": user_meta['colorOrange'],
        "colorIvory": user_meta['colorIvory'],
        "colorYellow": user_meta['colorYellow'],
        "colorGreen": user_meta['colorGreen'],
        "colorBlue": user_meta['colorBlue'],
        "colorBrown": user_meta['colorBrown'],
        "colorBeige": user_meta['colorBeige'],
        "colorJean": user_meta['colorJean'],
        "colorPattern": user_meta['colorPattern'],
        "colorOthers": user_meta['colorOthers']
    }
    return context

def user_meta_style_helper(user_meta):
    context = {
        "_id": str(user_meta['_id']),
        "userId": int(user_meta['userId']),
        "size": user_meta['size'],
        "bright": user_meta['bright'],
        "color": user_meta['color'],
        "thickness": user_meta['thickness'],
        "what": user_meta['what']
    }
    return context

def user_meta_category_top_helper(user_meta):
    context = {
        "_id": str(user_meta['_id']),
        "userId": int(user_meta['userId']),
        "smallCategoryHalfshort": user_meta['smallCategoryHalfshort'],
        "smallCategoryShirt": user_meta['smallCategoryShirt'],
        "smallCategoryCollar": user_meta['smallCategoryCollar'],
        "smallCategoryHoody": user_meta['smallCategoryHoody'],
        "smallCategorySweatshirt": user_meta['smallCategorySweatshirt'],
        "smallCategoryKnit": user_meta['smallCategoryKnit'],
        "smallCategoryLong": user_meta['smallCategoryLong'],
        "smallCategoryShort": user_meta['smallCategoryShort'],
        "smallCategoryOthers": user_meta['smallCategoryOthers'],
        "what": user_meta['what']
    }
    return context

def user_meta_category_outer_helper(user_meta):
    context = {
        "_id": str(user_meta['_id']),
        "userId": int(user_meta['userId']),
        "smallCategoryHoodie": user_meta['smallCategoryHoodie'],
        "smallCategoryBlouson": user_meta['smallCategoryBlouson'],
        "smallCategoryRiders": user_meta['smallCategoryRiders'],
        "smallCategoryMustang": user_meta['smallCategoryMustang'],
        "smallCategoryCardigan": user_meta['smallCategoryCardigan'],
        "smallCategoryFleece": user_meta['smallCategoryFleece'],
        "smallCategoryCoat": user_meta['smallCategoryCoat'],
        "smallCategoryPaddedcoat": user_meta['smallCategoryPaddedcoat'],
        "smallCategoryVest": user_meta['smallCategoryVest'],
        "smallCategoryJacket": user_meta['smallCategoryJacket'],
        "smallCategoryOthers": user_meta['smallCategoryOthers'],
        "what": user_meta['what']
    }
    return context

def user_meta_category_pants_helper(user_meta):
    context = {
        "_id": str(user_meta['_id']),
        "userId": int(user_meta['userId']),
        "smallCategoryDenimpants": user_meta['smallCategoryDenimpants'],
        "smallCategoryCottonpants": user_meta['smallCategoryCottonpants'],
        "smallCategorySlacks": user_meta['smallCategorySlacks'],
        "smallCategoryJoggerpants": user_meta['smallCategoryJoggerpants'],
        "smallCategoryShortpants": user_meta['smallCategoryShortpants'],
        "smallCategoryLeggings": user_meta['smallCategoryLeggings'],
        "smallCategoryJumpsuit": user_meta['smallCategoryJumpsuit'],
        "smallCategoryOthers": user_meta['smallCategoryOthers'],
        "what": user_meta['what']
    }
    return context

def user_meta_category_onepiece_helper(user_meta):
    context = {
        "_id": str(user_meta['_id']),
        "userId": int(user_meta['userId']),
        "smallCategoryMinidress": user_meta['smallCategoryMinidress'],
        "smallCategoryMidi": user_meta['smallCategoryMidi'],
        "smallCategoryMaxidress": user_meta['smallCategoryMaxidress'],
        "what": user_meta['what']
    }
    return context

def user_meta_category_skirt_helper(user_meta):
    context = {
        "_id": str(user_meta['_id']),
        "userId": int(user_meta['userId']),
        "smallCategoryMiniskirt": user_meta['smallCategoryMiniskirt'],
        "smallCategoryMidi": user_meta['smallCategoryMidi'],
        "smallCategoryLongskirt": user_meta['smallCategoryLongskirt'],
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
        'newClothId': int(cloth['newClothId']),
        'clothId': cloth['clothId'],
        'clothName': cloth['clothName'],
        'brand': cloth['brand'],
        'clothImg': cloth['clothImg'],
        'clothPrice': cloth['clothPrice'],
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

def review_helper(review):
    context = {
        "_id": str(review['_id']),
        "userName": str(review['userName']),
        "date": str(review['date']),
        "goodsNo": int(review['goodsNo']),
        "userSexMen": int(review['userSexMen']),
        "userSexWomen": int(review['userSexWomen']),
        "userHeight": int(review['userHeight']),
        "userWeight": int(review['userWeight']),
        "goodsSize": str(review['goodsSize']),
        "reviewContent": list(review['reviewContent']),
        "reviewImg": str(review['reviewImg']),
        "reviewStyle": int(review['reviewStyle']),
        "size": int(review['size']),
        "bright": int(review['bright']),
        "color": int(review['color']),
        "newGoodsNo": int(review['newGoodsNo']),
    }
    return context

def review_img_helper(review):
    context = {
        "_id": str(review['_id']),
        "userName": str(review['userName']),
        "goodsNo": int(review['goodsNo']),
        "userSexMen": int(review['userSexMen']),
        "userSexWomen": int(review['userSexWomen']),
        "userHeight": int(review['userHeight']),
        "userWeight": int(review['userWeight']),
        "goodsSize": str(review['goodsSize']),
        "reviewImg": str(review['reviewImg']),
        "newGoodsNo": int(review['newGoodsNo']),
    }
    return context