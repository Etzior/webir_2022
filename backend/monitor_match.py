import json
import nltk
import re

monitors = json.load(open("init_db/monitors.json"))
scrap1 = json.load(open("scrap/monitores_banifox2.json"))
scrap2 = json.load(open("scrap/monitores_laaca2.json"))
scrap3 = json.load(open("scrap/monitores_netpc.json"))

scrap = scrap1 + scrap2 + scrap3
print(len(scrap))

# preprocessing
for entry in scrap:
    entry['name'] = entry['name'].lower().replace('monitor', '').replace('  ', ' ')
    entry['name'] = re.sub('\d+hz', '', entry['name'], re.IGNORECASE)
    # regex to extract model number
    # https://stackoverflow.com/questions/1872644/regex-to-validate-model-part-numbers
    model_match = re.search('((?=[A-Za-z/-]{0,19}\d)[A-Za-z0-9/-]{5,20})', entry['name'])
    if model_match:
        entry['model_number'] = model_match.group()
    else:
        entry['model_number'] = '???'

for monitor in monitors:
    monitor['name'] = monitor['name'].lower().replace(' - ', ' ')

for entry in scrap:
    min_distance = 999
    result = ''
    for monitor in monitors:
        if entry['model_number'] in monitor['name']:
            min_distance = -1
            result = monitor['name']
            break
        new_distance = nltk.edit_distance(entry['name'], monitor['name'].lower(), substitution_cost=2)
        if new_distance < min_distance:
            min_distance = new_distance
            result = monitor['name']
    print(f"[{min_distance}] [{entry['model_number']}] {entry['name']} -> {result}")

