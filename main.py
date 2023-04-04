import requests

datas = requests.api.get("https://flagcdn.com/en/codes.json").json()


i = 0
for key, data in datas.items():
    i += 1
    if (i < 25): 
        print("<p class=\"land\">{}</p>".format(data))