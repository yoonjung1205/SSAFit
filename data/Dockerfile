FROM python:3.9

WORKDIR /

COPY ./requirements.txt /requirements.txt
COPY ./main.py /main.py
COPY ./app /app
COPY ./models.py /models.py

RUN pip install --no-cache-dir --upgrade -r /requirements.txt

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8970", "--root-path", "/api_da"]
