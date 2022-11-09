import scrapy
import time
from scrapy.http import TextResponse

class DisplaydbspiderSpider(scrapy.Spider):
    name = "displaydbspider"
    allowed_domains = ["displaydb.com"]
    start_urls = ["https://www.displaydb.com/brands/"]

    def parse(self, response: TextResponse):
        brands = response.css("div.brand-item.col-6.col-lg-2.col-md-3")
        # f = open("myfile.txt", "wb")
        # f.write(response.body)
        print(len(brands))
        for brand in brands:
            relative_url = brand.css("a").attrib["href"]
            yield response.follow(
                relative_url,
                callback=self.parse_monitors
            )

    def parse_monitors(self, response):
        monitors = response.css("div.displays")
        for monitor in monitors:
            relative_url = monitor.css("a").attrib["href"]
            yield response.follow(
                relative_url,
                callback=self.parse_detailed_monitor_info,
                cb_kwargs={
                    "name": monitor.css("h4.card-title.font-16.mt-0::text").get()
                }
            )
    
    def parse_detailed_monitor_info(self, response, name):
        details_table = response.css("div.brief-specs.col")
        rows = details_table.css("tr")
        details = {}
        interested = True
        for row in rows:
            title = row.xpath("td[1]//text()").extract_first()
            value = row.xpath("td[2]//text()").extract_first()
            details[title] = value
            if title == "Type" and value != "Monitor":
                interested = False
                break
        if interested:
            yield {
                "name": name,
                "brand": str.strip(details.get("Brand","")),
                "size": str.strip(details.get("Size","")),
                "panel": str.strip(details.get("Panel","")),
                "refresh_rate": str.strip(details.get("Refresh Rate","")),
                "min_response_time": str.strip(details.get("Min Response Time","")),
                "screen_aspect_ratio": str.strip(details.get("Screen Aspect Ratio","")),
                "screen_resolution": str.strip(details.get("Screen Resolution","")),
                "url": response.url
            }

# def parse(self, response: TextResponse):
#     monitors = response.css("figcaption")
#     for monitor in monitors:
#         relative_url = monitor.css("a").attrib["href"]
#         yield response.follow(
#             relative_url,
#             callback=self.parse_stock,
#             cb_kwargs={
#                 "name": monitor.css("a.color-secundario.link-primario::text").get(),
#                 "price": monitor.css("h4.texto-xl.color-destacado.di.valign-medio::text").get().replace("\n                USD","").replace(" ",""),
#                 "url": relative_url
#             }
#         )

#     next_page = response.xpath('//div[@class="der paginacion-flechas nofloat-xs di"]/../../@href').get()
    
#     if next_page is not None:
#         next_page_url = "https://www.banifox.com" + next_page
#         yield response.follow(next_page_url, callback=self.parse)

# def parse_stock(self, response, name, price, url):
#     summary = response.css("div.col-5.col-sm-12.text-center-sm.padding-izq.padding-xs-izq-sm")
#     yield {
#             "name": name,
#             "price": price,
#             "url": url,
#             "stock": len(summary.css("div.alert.alert-stock")) == 0
#         }
