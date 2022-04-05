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
import os

import random

headers = { 'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36'}
color = []
colorUrl = "https://www.musinsa.com/category/001"
colorResponse = requests.get(colorUrl, headers=headers)
colorHtml = colorResponse.text
colorSoup = bs(colorHtml, 'html.parser')
colorUl = colorSoup.find('ul', class_="division_color")
colorLi = colorUl.find_all('a')
for col in colorLi:
    color.append([col['data-code'],col.text])
    
    print(col['data-code'],col.text)

# print(color)