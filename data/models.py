from mongoengine import *

# mongodb documents 이름이랑 같아야한다.
class Codi(Document):
    codiId = IntField()
    codiStyle = StringField(max_length=100)
    codiTitle = StringField()
    codiContents = StringField()
    date = StringField()
    dateYear = IntField()
    dateMonth = IntField()
    dateDay = IntField()
    codiDate = IntField()
    codiDaily = IntField()
    codiCampus = IntField()
    codiParty = IntField()
    codiTravel = IntField()
    codiWedding = IntField()
    codiBusiness = IntField()
    codiInterview = IntField()
    codiHip = IntField()
    codiSports = IntField()
    codiGolf = IntField()
    codiOther = IntField()
    viewCnt = IntField()
    imgSrc = StringField()
    hashtags = ListField()
    clothes = ListField()
    meta = {'collection':'codi'}

class ClothTop(DynamicDocument):
    newClothId
    clothId
    # largeCategory
    largeCategoryName
    # smallCategoryHalfshort
    # smallCategoryShirt
    # smallCategoryCollar
    # smallCategoryHoody
    # smallCategorySweatshirt
    # smallCategoryKnit
    # smallCategoryLong
    # smallCategoryShort
    # smallCategoryOthers
    smallCategoryName
    # colorWhite
    # colorGrey
    # colorBlack
    # colorRed
    # colorPink
    # colorOrange
    # colorIvory
    # colorYellow
    # colorGreen
    # colorBlue
    # colorPurple
    # colorBrown
    # colorBeige
    # colorJean
    # colorPattern
    # colorOthers
    colorName
    clothName
    brand
    clothImg
    clothPrice
    date
    clothHashtags
    clothMale
    clothFemale
    clothRate
    clothReviewCnt
    fit
    feeling
    stretch
    visibility
    thickness
    seasonSpring
    seasonSummer
    seasonFall
    seasonWinter
    goodsSize
    reviewNoun
    userHeight
    userWeight
    userMale
    userFemale
    month1
    month2
    month3
    month4
    month5
    month6
    month7
    month8
    month9
    month10
    month11
    month12