import requests
from bs4 import BeautifulSoup

f = open("colors.sql", "w", encoding = "utf-8")


# URL = "https://en.wikipedia.org/wiki/List_of_colors:_A%E2%80%93F"
# URL = "https://en.wikipedia.org/wiki/List_of_colors:_G%E2%80%93M"
URL = "https://en.wikipedia.org/wiki/List_of_colors:_N%E2%80%93Z"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")
results = soup.find_all("table", class_="wikitable")
table = results[0]
trs = table.find_all("tr");

f.write("insert into Color (name, red, green, blue) values ")
for i in range(1, len(trs)):
    tr = trs[i]
    
    ths = tr.find_all("th")
    tds = tr.find_all("td")
    # print(tds)

    hex = tds[0].text.strip();
    red = int(hex[1:3], 16)
    green = int(hex[3:5], 16)
    blue = int(hex[5:7], 16)
    f.write("(\"{0}\", {1}, {2}, {3})".format(ths[0].text.strip(), red, green, blue))
    if i == len(trs) - 1:
        f.write(";")
    else:
        f.write(", ")
    
    # job_element.find()
    # print(job_element, end="\n"*2)

f.close()