import pandas as pd
from urllib import request
import requests
import csv
import ssl
from bs4 import BeautifulSoup as bs
# import selenium
# from selenium import webdriver
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support import expected_conditions as EC
import time
from multiprocessing import Pool
from csv import writer
from datetime import datetime, timedelta
import os
import random
headers = { 'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36'}

colorUrl = "https://www.musinsa.com/category/001"
colorResponse = requests.get(colorUrl, headers=headers)
colorHtml = colorResponse.text
colorSoup = bs(colorHtml, 'html.parser')
colorUl = colorSoup.find('ul', class_="division_color")
colorLi = colorUl.find_all('a')
total_data = []
for col in colorLi:   
    colorNo = col['data-code']
    colorName = col.text
    data = [colorNo, colorName]
    total_data.append(data)

list_title = ['colorNo', 'colorName']
# ===================================================
if os.path.isfile("color_top.csv"):
    pass
else:
    with open('color_top.csv', 'w', newline='', encoding='utf-8-sig') as f_object:
        writer_object = writer(f_object)
        writer_object.writerow(list_title)
        f_object.close()

with open('color_top.csv', 'a', newline='', encoding='utf-8-sig') as f_object:
    writer_object = writer(f_object)
    for data in total_data:
        writer_object.writerow(data)
    f_object.close()
    