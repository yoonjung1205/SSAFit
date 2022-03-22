from mongoengine import Document,StringField,IntField,ListField

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
    codiGolf = IntField()
    codiOther = IntField()
    viewCnt = IntField()
    imgSrc = StringField()
    hashtag = ListField()
    clothes = ListField()
    # meta = {'collection':'codi'}