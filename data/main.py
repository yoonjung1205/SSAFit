from dataclasses import asdict
import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
# from app.database.conn import db
# from app.common.config import conf
# from app.routes import data, recommend
from app.routes import recommend
from mongoengine import connect


# connect(host="mongodb://admin:ssafit@ssafit.site:8975/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")
connect(db="ssafit", host="ssafit.site", port=8975, username="admin", password="ssafit")
def create_app():
    """
    앱 함수 실행
    :return:
    """
    # c = conf()
    app = FastAPI()
    # 데이터 베이스 이니셜라이즈
    # conf_dict = asdict(c)
    # db.init_app(app, **conf_dict)
    # 미들웨어 정의
    app.add_middleware(
        CORSMiddleware,
        # allow_origins=conf().ALLOW_SITE,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    # 라우터 정의
    # app.include_router(data.router)
    app.include_router(recommend.router)
    return app


app = create_app()

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8970, reload=True)