# 참고 사이트
# https://beomi.github.io/2017/07/05/HowToMakeWebCrawler-with-Multiprocess/

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
# 크롤링에서 사용하는 변수들
headers = { 'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36'}
baseUrl = "https://goods.musinsa.com/api/goods/v1/review/style/list";
page = 1
# 상품리뷰 없는거
# goodsNo = 1911367
# goodsNo = 2043036


def writeCSV(list):
    list_title = ['clothId', 'largeCategory', 'largeCategoryName', 'smallCategory', 'smallCategoryName', 'colorNo', 'clothName', 'brand', 'image', 'clothPrice', 'date', 'hashtags', 'clothSexMen', 'clothSexWomen', 'clothSexCommon', 'clothRate', 'clothReviewNo', 'fit', 'feeling', 'stretch', 'visibility', 'thickness', 'seasonSpring', 'seasonSummer', 'seasonFall', 'seasonWinter']
    # ===================================================
    if os.path.isfile("musinsa_clothes_top.csv"):
        pass
    else:
        with open('musinsa_clothes_top.csv', 'w', newline='', encoding='utf-8-sig') as f_object:
            writer_object = writer(f_object)
            writer_object.writerow(list_title)
            f_object.close()

    with open('musinsa_clothes_top.csv', 'a', newline='', encoding='utf-8-sig') as f_object:
        writer_object = writer(f_object)
        for data in list:
            writer_object.writerow(data)
        f_object.close()

data = []
largeCategoryNo = [1, 2, 3, 20, 22]
def colorList():
    color = []
    colorUrl = "https://www.musinsa.com/category/001"
    colorResponse = requests.get(colorUrl, headers=headers)
    colorHtml = colorResponse.text
    colorSoup = bs(colorHtml, 'html.parser')
    colorUl = colorSoup.find('ul', class_="division_color")
    colorLi = colorUl.find_all('a')
    for col in colorLi:
        color.append(col['data-code'])
    return color[11:34]


def get_clothes(colorNo):
    # for largeNo in largeCategoryNo:
    #     print(largeNo)
    # for colorNo in colorList:
    pageNo = 1
    while True:
        # if largeNo < 10:
        #     url = "https://www.musinsa.com/category/00"+str(largeNo)+"?&brand=&rate=&page_kind=search&list_kind=small&sort=pop&sub_sort=&page="+str(pageNo)+"&display_cnt=90&sale_goods=&group_sale=&kids=N&ex_soldout=&color="+str(colorNo)+"&price1=&price2=&exclusive_yn=&shoeSizeOption=&tags=&campaign_id=&timesale_yn=&q=&includeKeywords=&measure="
        # else:
        #     url = "https://www.musinsa.com/category/0"+str(largeNo)+"?&brand=&rate=&page_kind=search&list_kind=small&sort=pop&sub_sort=&page="+str(pageNo)+"&display_cnt=90&sale_goods=&group_sale=&kids=N&ex_soldout=&color="+str(colorNo)+"&price1=&price2=&exclusive_yn=&shoeSizeOption=&tags=&campaign_id=&timesale_yn=&q=&includeKeywords=&measure="
        
        # ===================================================
        url = "https://www.musinsa.com/category/001?&brand=&rate=&page_kind=search&list_kind=small&sort=pop&sub_sort=&page="+str(pageNo)+"&display_cnt=90&sale_goods=&group_sale=&kids=N&ex_soldout=&color="+colorNo+"&price1=&price2=&exclusive_yn=&shoeSizeOption=&tags=&campaign_id=&timesale_yn=&q=&includeKeywords=&measure="
        response = requests.get(url, headers=headers)
        html = response.text
        soup = bs(html, 'html.parser')
        if soup.select_one('#goods_list > div.boxed-list-wrapper > div.thumbType_box.box > span.pagingNumber > span.totalPagingNum'):
            totalpageNo = soup.select_one('#goods_list > div.boxed-list-wrapper > div.thumbType_box.box > span.pagingNumber > span.totalPagingNum').contents[0]
            crawling(soup, colorNo)
        else:
            break

        if pageNo == totalpageNo:
            break
        else:
            pageNo += 1

def crawling(soup, colorNo):
    total_data = []
    searchBox = soup.find("ul", id="searchList")
    totalClothes = searchBox.find_all("li", class_="li_box")
    for cloth in totalClothes:
        try:
            data = []
            # 이미지 경로(src)
            image_path = cloth.find("img")['data-original'].split('/')
            # 옷 등록 년월일
            date = image_path[5]
            # 옷 고유 id
            clothId = image_path[6]
            # 옷 브랜드
            brand = cloth.find('p', class_="item_title").text
            # 옷 가격
            clothPrice = cloth.find('p', class_="price").contents
            if len(clothPrice)==1:
                clothPrice = clothPrice[0].strip()
            elif len(clothPrice)==3:
                clothPrice = clothPrice[2].strip()
                    
            # 옷의 고유 디테일 페이지 url
            new_url = "https://store.musinsa.com/app/goods/"+clothId
            new_response = requests.get(new_url, headers=headers)
            new_html = new_response.text
            new_soup = bs(new_html, 'html.parser')
            # 옷 큰 카테고리

            # ===================================================
            # largeCategory = new_soup.select_one("#page_product_detail > div.right_area.page_detail_product > div.right_contents.section_product_summary > div.product_info > p > a:nth-child(1)").contents[0]
            largeCategory = 1
            largeCategoryName = '상의'
            # 옷 작은 카테고리
            smallCategory = new_soup.select_one("#page_product_detail > div.right_area.page_detail_product > div.right_contents.section_product_summary > div.product_info > p > a:nth-child(2)")
            smallCategoryName = smallCategory.text
            smallCategory = str(largeCategory) + smallCategory['href'][-2:]

            # 옷 이름
            image = new_soup.select_one("#bigimg")["src"]
            clothName = new_soup.select_one("#page_product_detail > div.right_area.page_detail_product > div.right_contents.section_product_summary > span > em").contents[0]
            
            # 성별
            clothSex = new_soup.find('span', class_="txt_gender").contents
            clothSexMen = 0
            clothSexWomen = 0
            clothSexCommon = 0

            if len(clothSex) == 3:
                if clothSex[1].text == '남':
                    clothSexMen = 1
                elif clothSex[1].text == '여':
                    clothSexWomen = 1
            else:
                clothSexCommon = 1
            # 옷 평점
            if new_soup.find('span', class_="prd-score__rating"):
                clothRate = new_soup.find('span', class_="prd-score__rating").text
            else:
                clothRate = 0
            # 옷 리뷰수
            if new_soup.find('span', class_="prd-score__review-count"):
                clothReviewNo = new_soup.find('span', class_="prd-score__review-count").text.split()[1][:-1]
            else:
                clothReviewNo = 0

            # 가이드
            fit = 0
            feeling = 0
            stretch = 0
            visibility = 0
            thickness = 0
            seasonSpring = 0
            seasonSummer = 0
            seasonFall = 0
            seasonWinter = 0
            if new_soup.find("table", attrs={'class': 'table-simple'}):
                # total_guide = new_soup.select_one("#page_product_detail > div.right_area.page_detail_product > div.right_contents.section_product_summary > div.wrap_product > div.product_left > div:nth-child(8) > table")
                total_guide = new_soup.find("table", attrs={'class': 'table-simple'})
                total_guide = str(total_guide)
                total_guide = total_guide.split('</tr>')
                total_guide = list(total_guide)
                for i in total_guide:
                    guide = i.split('\n')
                    if '<th>핏</th>' in guide:
                        for j in range(len(guide)):
                            if 'active' in guide[j]:
                                fit = j-3
                    elif '<th>촉감</th>' in guide:
                        for j in range(len(guide)):
                            if 'active' in guide[j]:
                                feeling = j-2
                    elif '<th>신축성</th>' in guide:
                        for j in range(len(guide)):
                            if 'active' in guide[j]:
                                stretch = j-2
                    elif '<th>비침</th>' in guide:
                        for j in range(len(guide)):
                            if 'active' in guide[j]:
                                visibility = j-2
                    elif '<th>두께</th>' in guide:
                        for j in range(len(guide)):
                            if 'active' in guide[j]:
                                thickness = j-2
                    elif '<th>계절</th>' in guide:
                        for j in range(len(guide)):
                            if 'active' in guide[j]:
                                if '봄' in guide[j]:
                                    seasonSpring = 1
                                elif '여름' in guide[j]:
                                    seasonSummer = 1
                                elif '가을' in guide[j]:
                                    seasonFall = 1
                                elif '겨울' in guide[j]:
                                    seasonWinter = 1
                    else:
                        continue                    

            # 해쉬태그들
            hashtags = []
            if new_soup.select_one("#product_order_info > div.explan_product.product_info_section > ul > li.article-tag-list.list > p"):
                hashtag = new_soup.select_one("#product_order_info > div.explan_product.product_info_section > ul > li.article-tag-list.list > p").contents
                for i in range(1, len(hashtag)):
                    if hashtag[i].text != '\n':
                        hashtags.append(hashtag[i].text[1:])
            else:
                hashtags = []
            data = [clothId, largeCategory, largeCategoryName, smallCategory, smallCategoryName, colorNo, clothName, brand, image, clothPrice, date, hashtags, clothSexMen, clothSexWomen, clothSexCommon, clothRate, clothReviewNo, fit, feeling, stretch, visibility, thickness, seasonSpring, seasonSummer, seasonFall, seasonWinter]
            total_data.append(data)
        except:
            pass
    writeCSV(total_data)

if __name__=='__main__':
    start_time = time.time()
    pool = Pool(processes=16) # 8개의 프로세스를 사용합니다.
    pool.map(get_clothes, colorList())  # 2~3초 소요 500개 기준
    # speed_get_content(get_links()) # 단일 프로세스 12~14초 소요 500여개 기준
    print("--- %s seconds ---" % (time.time() - start_time))