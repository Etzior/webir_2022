import json
import nltk
import re


def read_scrap():
    scrap1 = json.load(open("scrap/monitores_banifox2.json"))
    scrap2 = json.load(open("scrap/monitores_laaca2.json"))
    scrap3 = json.load(open("scrap/monitores_netpc.json"))

    return [("banifox", scrap1), ("laaca", scrap2), ("netpc", scrap3)]


def pre_process_postings(postings_dict):
    _postings = postings_dict.copy()
    for entry in _postings:
        entry["name"] = entry["name"].lower().replace("monitor", "").replace("  ", " ")
        entry["name"] = re.sub("\d+hz", "", entry["name"], re.IGNORECASE)
        entry["name"] = re.sub("(720p|1080p|1440p)$", "", entry["name"], re.IGNORECASE)
        # regex to extract model number
        # https://stackoverflow.com/questions/1872644/regex-to-validate-model-part-numbers
        model_match = re.search(
            "((?=[A-Za-z/-]{0,19}\d)[A-Za-z0-9/-]{4,20})", entry["name"]
        )
        if model_match:
            entry["model_number"] = model_match.group()
        else:
            entry["model_number"] = "???"
    return _postings


def pre_process_monitors(monitors_dict):
    _monitors = monitors_dict.copy()
    for monitor in _monitors:
        monitor["name"] = monitor["name"].lower().replace(" - ", " ")
    return _monitors


def match_monitors_to_postings():
    monitors_og = json.load(open("init_db/monitors.json"))
    scraps = read_scrap()
    for eshop, scrap in scraps:
        monitors = pre_process_monitors(monitors_og)
        postings = pre_process_postings(scrap)
        for [entry, entry_og] in zip(postings, scrap):
            min_distance = 999
            for [monitor, monitor_og] in zip(monitors, monitors_og):
                if re.search(
                    rf"\b{re.escape(entry['model_number'])}\b",
                    monitor["name"],
                    re.IGNORECASE,
                ):
                    min_distance = -1
                    entry_og["eshop"] = eshop
                    if "postings" in monitor:
                        monitor_og["postings"].append(entry_og)
                    else:
                        monitor_og["postings"] = [entry_og]
                    break
    monitors_with_matches = [m for m in monitors_og if "postings" in m]
    print(json.dumps(monitors_with_matches, sort_keys=True, indent=4))
    print(f"monitors: {len(monitors_with_matches)}")
    return monitors_with_matches
