import requests

response = requests.get('http://127.0.0.1:8000/rides/create?location_from=Chascom%C3%BAs%2C%20Buenos%20Aires%2C%20Argentina%20&location_to=Santa%20Rosa%2C%20La%20Pampa%2C%20Argentina%20')
print(response.status_code)
print(response.text)
