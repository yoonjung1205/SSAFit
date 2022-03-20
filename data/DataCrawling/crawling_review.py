# 참고 사이트
# https://beomi.github.io/2017/07/05/HowToMakeWebCrawler-with-Multiprocess/

from urllib import request
import requests
import csv
import ssl
from bs4 import BeautifulSoup as bs
import selenium
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
import time
from multiprocessing import Pool
from csv import writer
from datetime import datetime, timedelta
import os

# 크롤링에서 사용하는 변수들
headers = { 'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36'}
baseUrl = "https://goods.musinsa.com/api/goods/v1/review/style/list";

# 상품리뷰 없는거
# goodsNo = 1911367
# goodsNo = 2043036
list_data = []

def writeCSV(list):
    list_title = ['userName', 'date', 'goodsNo', 'userSex', 'userHeight', 'userWeight', 'goodsSize', 'reviewContent', 'review_img', 'size', 'bright', 'color', 'thickness', 'weightness', 'touch', 'helpNo', 'styleLikeNo']
    if os.path.isfile("musinsa_review.csv"):
        pass
    else:
        with open('musinsa_review.csv', 'w', newline='', encoding='utf-8-sig') as f_object:
            writer_object = writer(f_object)
            writer_object.writerow(list_title)
            f_object.close()

    with open('musinsa_review.csv', 'a', newline='', encoding='utf-8-sig') as f_object:
        writer_object = writer(f_object)
        for data in list:
            writer_object.writerow(data)
        f_object.close()


def get_content(goodsNo):
    page = 1
    url = baseUrl + "?" + "page=" + str(page) + "&goodsNo=" + str(goodsNo)
    req = requests.get(url, headers=headers)
    html = req.text
    soup = bs(html, 'html.parser')

    try:
        lastPage = int(soup.select('.box_page_msg')[0].text.replace(' ', '').replace('\n', '').split('페이지')[0])
        total_data = []
        for pages in range(1, lastPage + 1):
            url = baseUrl + "?" + "page=" + str(pages) + "&goodsNo=" + str(goodsNo)
            response = requests.get(url, headers=headers)
            html = response.text
            soup = bs(html, 'html.parser')
            soup = soup.find_all("div", class_="review-list")
            # print(soup)
            for review in soup:
                try:
                    data = []
                    # user 닉네임
                    userName = review.select(".review-profile__name")[0].text
                    # user가 리뷰쓴 날짜
                    date = review.select(".review-profile__date")[0].text
                    if date[1:] == '분 전' or date[2:] == '분 전' or date[1:] == '시간 전' or date[2:] == '시간 전':
                        today = str(datetime.now())
                        reviewDate = today[:4]+'.'+today[5:7]+'.'+today[8:10]
                        # reviewDate = time.strftime('%Y.%m.%d', today)
                    elif date[1:] == '일 전':
                        today = datetime.now()
                        reviewDate = today - timedelta(days=int(date[0]))
                        reviewDate = str(reviewDate)[:4]+'.'+str(reviewDate)[5:7]+'.'+str(reviewDate)[8:10]
                    elif date[2:] == '일 전':
                        today = datetime.now()
                        reviewDate = today - timedelta(days=int(date[:2]))
                        reviewDate = str(reviewDate)[:4]+'.'+str(reviewDate)[5:7]+'.'+str(reviewDate)[8:10]
                    else:
                        reviewDate = date

                    # 유저 성별, 유저 키, 유저 몸무게
                    userSex, userHeight, userWeight = review.select(".review-profile__body_information")[0].text.split(',')
                    
                    # 상품 사이즈
                    goodsSize = review.select(".review-goods-information__option")[0].text.replace(",", "").replace("\n", "").replace(" ", "")

                    # 리뷰 내용
                    reviewContent = review.find('div', class_="review-contents__text").contents

                    # 리뷰 사진
                    review_img = "https:" +  review.find_all("li", class_="review-content-photo__item")[0].find("img")['src']
                    
                    reviewWhatHow = review.find_all("li", class_="review-evaluation__item")
                    size, bright, color, thickness, weightness, touch = 0, 0, 0, 0, 0, 0
                    for whatHow in reviewWhatHow:
                        what, how = whatHow.text.split(' ')
                        if what == '사이즈':
                            if how == '커요':
                                size = 1
                            elif how == '보통이에요':
                                size = 2
                            else:
                                size = 3
                        elif what == '밝기':
                            if how == '밝아요':
                                bright = 1
                            elif how == '보통이에요':
                                bright = 2
                            else:
                                bright = 3
                        elif what == '색감':
                            if how == '선명해요':
                                color = 1
                            elif how == '보통이에요':
                                color = 2
                            else:
                                color = 3
                        elif what == '두께감':
                            if how == '두꺼워요':
                                thickness = 1
                            elif how == '보통이에요':
                                thickness = 2
                            else:
                                thickness = 3
                        elif what == '무게감':
                            if how == '가벼워요':
                                weightness = 1
                            elif how == '적당해요':
                                weightness = 2
                            else:
                                weightness = 3
                        elif what == '촉감':
                            if how == '부드러워요':
                                touch = 1
                            elif how == '평범해요':
                                touch = 2
                            else:
                                touch = 3
                    
                    if len(review.find_all('span', class_="review-evaluation-button__count")) == 1:
                        helpNo = review.find_all('span', class_="review-evaluation-button__count")[0].text
                        styleLikeNo = 0
                    elif len(review.find_all('span', class_="review-evaluation-button__count")) == 2:
                        helpNo = review.find_all('span', class_="review-evaluation-button__count")[0].text
                        styleLikeNo = review.find_all('span', class_="review-evaluation-button__count")[1].text

                    data = [userName, date, goodsNo, userSex, userHeight, userWeight, goodsSize, reviewContent, review_img, size, bright, color, thickness, weightness, touch, helpNo, styleLikeNo]
                    total_data.append(data)
                except:
                    # html 못찾음
                    pass
        writeCSV(total_data)
        
    except:
        # 상품 리뷰 없음
        pass


get_content(1139338)

# if __name__=='__main__':
#     start_time = time.time()
#     pool = Pool(processes=16) # 8개의 프로세스를 사용합니다.
#     pool.map(get_content, get_links())  # 2~3초 소요 500개 기준
#     # speed_get_content(get_links()) # 단일 프로세스 12~14초 소요 500여개 기준
#     print("--- %s seconds ---" % (time.time() - start_time))