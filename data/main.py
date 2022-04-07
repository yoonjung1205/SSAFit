from dataclasses import asdict
import uvicorn
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.routes import recommend, cloth, codi, user
from fastapi_pagination import add_pagination

origins = ["http://ssafit.site",
    "https://ssafit.site",
    "https://ssafit.site/api_da/docs",
    "http://localhost",
    "http://localhost:3000",]

def create_app():
    app = FastAPI()

    # 미들웨어 정의
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    # 라우터 정의
    app.include_router(recommend.router)
    app.include_router(cloth.router)
    app.include_router(codi.router)
    app.include_router(user.router)
    return app


app = create_app()
add_pagination(app)

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8970, reload=True)