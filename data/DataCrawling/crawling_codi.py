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
import os

# 크롤링에서 사용하는 변수들
headers = { 'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36'}
baseUrl = "https://goods.musinsa.com/api/goods/v1/review/style/list";
page = 1
# 상품리뷰 없는거
# goodsNo = 1911367
# goodsNo = 2043036
goodsNo = 1576682
list_data = []

def writeCSV(list):
    list_title = ['codiId', 'codiStyle', 'codiTitle', 'codiContents', 'date', 'viewCnt', 'imgSrc', 'hashtags', 'clothes']
    if os.path.isfile("musinsa_codi.csv"):
        pass
    else:
        with open('musinsa_codi.csv', 'w', newline='', encoding='utf-8-sig') as f_object:
            writer_object = writer(f_object)
            writer_object.writerow(list_title)
            f_object.close()

    with open('musinsa_codi.csv', 'a', newline='', encoding='utf-8-sig') as f_object:
        writer_object = writer(f_object)
        for data in list:
            writer_object.writerow(data)
        f_object.close()

codiStyle = ['americancasual', 'casual', 'chic', 'dandy', 'formal', 'girlish', 'golf', 'retro', 'romantic', 'sports', 'street']

def get_content(codi):
    page = 1
    while True:
        url = f'https://www.musinsa.com/app/codimap/lists?style_type={codi}&tag_no=&brand=&display_cnt=60&list_kind=big&sort=date&page={page}'
        req = requests.get(url, headers=headers)
        html = req.text
        soup = bs(html, 'html.parser')
        lastPage = soup.select_one("body > div.wrap > div.right_area > form > div.right_contents.hover_box > div > div.thumbType-box.box > span.pagingNumber > span.totalPagingNum").text.strip()
        total_data = []
        totalCodi = soup.find_all("li", class_="style-list-item")
        for codiSoup in totalCodi:
            try:
                data = []
                codiOnclick = codiSoup.find('a', class_="style-list-item__link").attrs['onclick']
                codiId = ''
                for i in range(8, len(codiOnclick)):
                    if codiOnclick[i].isnumeric():
                        codiId += codiOnclick[i]
                    else:
                        break
                codiTitle = codiSoup.find('a', class_="style-list-item__link").attrs['title']
                date = '20'+codiSoup.find_all('span', class_="post-information__text")[0].text
                viewCnt = codiSoup.find_all('span', class_="post-information__text")[1].text.split()[1]
                imgSrc = codiSoup.find('img')['data-original']

                newUrl = f'https://www.musinsa.com/app/codimap/views/{codiId}'
                newReq = requests.get(newUrl, headers=headers)
                newhtml = newReq.text
                newSoup = bs(newhtml, 'html.parser')
                hashtags = []
                if newSoup.select_one("#style_info > div.styling_tag > div"):
                    hashtag = newSoup.select_one("#style_info > div.styling_tag > div").contents
                    # print(hashtag)
                    for i in range(1, len(hashtag)):
                        if hashtag[i].text != '\n':
                            hashtags.append(hashtag[i].text[1:])
                else:
                    hashtags = []
                codiContents = newSoup.select_one("#style_info > div.styling_tag > p").text
                # 하위 items                
                clothesInfo = newSoup.find_all("div", class_="swiper-slide")
                clothes = []
                for cloth in clothesInfo:
                    clothesBrand = cloth.find("a", class_="brand").text
                    clothesName = cloth.find("a", class_="brand_item").text
                    clothesImg = cloth.find("img")['src']
                    # if cloth.find
                    clothesId = clothesImg.split('/')[6]
                    clothesPrice = cloth.find("div", class_="price").contents[0].strip('\n').strip('\t')
                    clothes.append([clothesId, clothesBrand, clothesName, clothesImg, clothesPrice])
                codiStyle = codi
                data = [codiId, codiStyle, codiTitle, codiContents, date, viewCnt, imgSrc, hashtags, clothes]
                total_data.append(data)
            except:
                # html 못찾음
                pass
        writeCSV(total_data)
        
        if page == lastPage:
            print('lastPage?')
            break
        else:
            page += 1

for codi in codiStyle:
    get_content(codi)

# if __name__=='__main__':
#     start_time = time.time()
#     pool = Pool(processes=16) # 8개의 프로세스를 사용합니다.
#     pool.map(get_content, codiStyle)  # 2~3초 소요 500개 기준
#     # speed_get_content(get_links()) # 단일 프로세스 12~14초 소요 500여개 기준
#     print("--- %s seconds ---" % (time.time() - start_time))
