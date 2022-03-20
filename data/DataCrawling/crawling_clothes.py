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


def writeCSV(list):
    list_title = ['clothId', 'largeCategory', 'smallCategory', 'colorNo', 'clothName', 'brand', 'image_path', 'clothPrice', 'date', 'hashtags', 'clothSex', 'clothRate', 'clothRevieweNo', 'fit', 'feeling', 'stretch', 'visibility', 'thickness', 'season']
    if os.path.isfile("musinsa_clothes.csv"):
        pass
    else:
        with open('musinsa_clothes.csv', 'w', newline='', encoding='utf-8-sig') as f_object:
            writer_object = writer(f_object)
            writer_object.writerow(list_title)
            f_object.close()

    with open('musinsa_clothes.csv', 'a', newline='', encoding='utf-8-sig') as f_object:
        writer_object = writer(f_object)
        for data in list:
            writer_object.writerow(data)
        f_object.close()


data = []
largeCategoryNo = [1, 2, 3, 20, 22]
def get_clothes(largeNo):
    colorList = [1,13,24,3,25,2,51,11,50,47,10,45,48,55,52,54,53,46,12,23,44,9,43,14,33,31,32,6,34,30,35,37,38,7,36,41,39,8,40,49,4,56,27,28,26,29,5,16,57,58,59,60,19,20,18,65,66,71,67,70,17,21,68,22,15]
    # for largeNo in largeCategoryNo:
    #     print(largeNo)
    for colorNo in colorList:
        pageNo = 1
        while True:
            if largeNo < 10:
                url = "https://www.musinsa.com/category/00"+str(largeNo)+"?&brand=&rate=&page_kind=search&list_kind=small&sort=pop&sub_sort=&page="+str(pageNo)+"&display_cnt=90&sale_goods=&group_sale=&kids=N&ex_soldout=&color="+str(colorNo)+"&price1=&price2=&exclusive_yn=&shoeSizeOption=&tags=&campaign_id=&timesale_yn=&q=&includeKeywords=&measure="
            else:
                url = "https://www.musinsa.com/category/0"+str(largeNo)+"?&brand=&rate=&page_kind=search&list_kind=small&sort=pop&sub_sort=&page="+str(pageNo)+"&display_cnt=90&sale_goods=&group_sale=&kids=N&ex_soldout=&color="+str(colorNo)+"&price1=&price2=&exclusive_yn=&shoeSizeOption=&tags=&campaign_id=&timesale_yn=&q=&includeKeywords=&measure="
            response = requests.get(url, headers=headers)
            html = response.text
            soup = bs(html, 'html.parser')
            totalpageNo = soup.select_one('#goods_list > div.boxed-list-wrapper > div.thumbType_box.box > span.pagingNumber > span.totalPagingNum').contents[0]
            crawling(soup, colorNo)
            if pageNo == totalpageNo:
                break
            else:
                pageNo += 1

def crawling(soup, colorNo):
    print('start')
    total_data = []
    itemNo = 1
    while itemNo <= 90:
        # 이미지 경로(src)
        image_path = soup.select_one(f'#searchList > li:nth-child({itemNo}) > div.li_inner > div.list_img > a > img')['data-original']
        # 옷 등록 년월일
        date = image_path[42:50]
        # 옷 고유 id
        clothId = image_path[51:62].split('/')[0]
        # 옷 가격
        clothPrice = soup.select_one(f"#searchList > li:nth-child({itemNo}) > div.li_inner > div.article_info > p.price").contents
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
        largeCategory = new_soup.select_one("#page_product_detail > div.right_area.page_detail_product > div.right_contents.section_product_summary > div.product_info > p > a:nth-child(1)").contents[0]
        # 옷 작은 카테고리
        smallCategory = new_soup.select_one("#page_product_detail > div.right_area.page_detail_product > div.right_contents.section_product_summary > div.product_info > p > a:nth-child(2)").contents[0]
        # 옷 이름
        clothName = new_soup.select_one("#page_product_detail > div.right_area.page_detail_product > div.right_contents.section_product_summary > span > em").contents[0]
        # 옷 브랜드
        brand = new_soup.select_one("#product_order_info > div.explan_product.product_info_section > ul > li:nth-child(1) > p.product_article_contents > strong > a").contents[0]
        
        # 성별
        if new_soup.select_one("#product_order_info > div.explan_product.product_info_section > ul > li:nth-child(2) > p.product_article_contents > span.txt_gender"):
            clothSex = new_soup.select_one("#product_order_info > div.explan_product.product_info_section > ul > li:nth-child(2) > p.product_article_contents > span.txt_gender").contents
            if len(clothSex) == 3:
                clothSex = clothSex[1].text
            else:
                clothSex = '공용'
        else:
            clothSex = '공용'
        # 옷 평점
        if new_soup.select_one("#product_order_info > div.explan_product.product_info_section > ul > li:nth-child(6) > p.product_article_contents > a > span.prd-score__rating"):
            clothRate = new_soup.select_one("#product_order_info > div.explan_product.product_info_section > ul > li:nth-child(6) > p.product_article_contents > a > span.prd-score__rating").contents[0]
        else:
            clothRate = 0
        # 옷 리뷰수
        if new_soup.select_one("#product_order_info > div.explan_product.product_info_section > ul > li:nth-child(6) > p.product_article_contents > a > span.prd-score__review-count"):
            clothReviewNo = new_soup.select_one("#product_order_info > div.explan_product.product_info_section > ul > li:nth-child(6) > p.product_article_contents > a > span.prd-score__review-count").contents[0].split()[1][:-1]
        else:
            clothReviewNo = 0

        # 가이드
        fit = 0
        feeling = 0
        stretch = 0
        visibility = 0
        thickness = 0
        season = []
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
                            season.append(j-2)
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

        data = [clothId, largeCategory, smallCategory, colorNo, clothName, brand, image_path, clothPrice, date, hashtags, clothSex, clothRate, clothReviewNo, fit, feeling, stretch, visibility, thickness, season]
        total_data.append(data)
        itemNo += 1
    writeCSV(total_data)

if __name__=='__main__':
    start_time = time.time()
    pool = Pool(processes=16) # 8개의 프로세스를 사용합니다.
    pool.map(get_clothes, largeCategoryNo)  # 2~3초 소요 500개 기준
    # speed_get_content(get_links()) # 단일 프로세스 12~14초 소요 500여개 기준
    print("--- %s seconds ---" % (time.time() - start_time))