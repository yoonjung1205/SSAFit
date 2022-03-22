# Fast API



- 라이브러리 실행

  ```bash
  pip install fastapi
  pip install uvicorn
  ```



- main.py

  ```python
  from typing import Optional
  from fastapi import FastAPI
  
  app = FastAPI()
  
  @app.get("/")
  def read_root():
      return {"Hello": "World"}
  
  @app.get("/items/{item_id}")
  def read_item(item_id: int, q: Optional[str] = None):
      return {"item_id": item_id, "q": q}
  ```

  

- 실행

  ```bash
  uvicorn main:app --reload
  ```

  

- swagger

  ```
  http://127.0.0.1:8000/docs
  ```

  

- 폴더 구조

  <img src="https://d388jojcgskje1.cloudfront.net/forAuthors/vkAMQwPJIeemK0bydKGg4YgrtKWzR9sPgrRYjPR6mxiU3kIlXo1rtbZPSrXWkhpMj.webp" style="zoom: 33%;" /> 





- conts.py 와 config.py

  - conts.py : 상수를 넣는 공간

    - 어떤 환경에서도 변경되지 않는 것을 넣는다.

  - config.py : 환경별 변수를 넣는 공간

    - 각 상황바다의 설정 파일
    - 예제

    ```python
    from dataclasses import dataclass, asdict
    from os import path, environ
    
    base_dir = path.dirname(path.dirname(path.dirname(path.abspath(__file__))))
    
    # 부모 클래스
    @dataclass
    class Config:
        """
        기본 Configuration
        """
        BASE_DIR = base_dir
    
        DB_POOL_RECYCLE: int = 900
        DB_ECHO: bool = True
    
    # Config 아래 클래스
    @dataclass
    class LocalConfig(Config):
        PROJ_RELOAD: bool = True
    
    # Config 아래 클래스
    @dataclass
    class ProdConfig(Config):
        PROJ_RELOAD: bool = False
    
    
    def conf():
        """
        환경 불러오기
        :return:
        """
        config = dict(prod=ProdConfig(), local=LocalConfig())
        return config.get(environ.get("API_ENV", "local"))
    ```

    ```bash
    # 해당 클래스를 Dict 형태로 추출하는 방법
    print(asdict(LocalConfig()))
    ```

    

​	

- main.py

  ```python
  from typing import Optional
  
  import uvicorn
  from fastapi import FastAPI
  
  from app.common.config import conf
  
  
  def create_app():
      """
      앱 함수 실행
      :return:
      """
      c = conf()
      app = FastAPI()
  
      # 데이터 베이스 이니셜라이즈
  
      # 레디스 이니셜라이즈
  
      # 미들웨어 정의
  
      # 라우터 정의
  
      return app
  
  
  app = create_app()
  
  if __name__ == "__main__":
      uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
  ```

  



- mongodb 설정

  ```bash
  $ pip install mongoengine
  ```

  ```python
  # main.py
  from fastapi import FastAPI
  from models import Employee
  from mongoengine import connect
  import json
  
  app = FastAPI()
  connect(db="hrms", host="localhost", port=27017)
  
  @app.get("/")
  def home():
      return {"message":"Hello World!"}
  
  @app.get("/get_all_employees")
  def get_all_employees():
      # employees = Employee.objects().to_json() # 터미널창에서 프린트
      # print(type(employees)) # str
  	# employees_list = json.loads(employees) # list
      employees = json.loads(Employee.objects().to_json())
      
      return {"employees": employees_list}
  
  from fastapi import Path
  
  @app.get("/get_all_employee/{emp_id}")
  def get_employee(emp_id: int = Path(..., gt=0)):
      employee = Employee.objects.get(emp_id=emp_id) #document(emp_id)=value(emp_id)
      
      employee_dict = {
          "emp_id": employee.emp_id,
          "name": employee.name,
          "age": employee.age,
          "teams": employee.teams
      }
      return employee_dict
  
  from fastapi import Query
  from mongoengine.queryset.visitor import Q
  
  @app.get("/search_employees")
  def search_employees(name: str, age: int= Query(None, gt=18)):
      employees = json.loads(Employee.objects.filter(Q(name__icontains=name) | Q(age=age)).to_json()) # name, age 둘중 하나만 있어도 검색가능
      return {"employees": employees}
  
  from pydantic import BaseModel
  from fastapi import Body
  
  class NewEmployee(BaseModel):
      emp_id: int
      name: str
      age: int = Body(None, gt=18)
      teams: list
          
  @app.post("/add_employee")
  def add_employee(employee: NewEmployee):
      new_employee = Employee(emp_id=employee.emp_id, 
                              name=employee.name, 
                              age=employee.age, 
                              teams=employee.teams)
      new_employee.save()
      
      return {"message":"Employee added successfully"}
  ```

  

  ```python
  # models.py
  from mongoengine import Document,StringField,IntField,ListField
  
  # mongodb documents 이름이랑 같아야한다.
  class Employee(Document):
      emp_id = IntField()
      name = StringField(max_length=100)
      age = IntField()
      teams = ListField()
  ```

  



