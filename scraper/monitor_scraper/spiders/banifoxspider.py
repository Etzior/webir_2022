import scrapy

from scrapy.http import TextResponse

class BanifoxspiderSpider(scrapy.Spider):
    name = "banifoxspider"
    allowed_domains = ["www.banifox.com"]
    start_urls = ["https://www.banifox.com/monitores/n3_47/"]

    def parse(self, response: TextResponse):
        monitors = response.css("figcaption")
        for monitor in monitors:
            relative_url = monitor.css("a").attrib["href"]
            yield response.follow(
                relative_url,
                callback=self.parse_stock,
                cb_kwargs={
                    "name": monitor.css("a.color-secundario.link-primario::text").get(),
                    "price": monitor.css("h4.texto-xl.color-destacado.di.valign-medio::text").get().replace("\n                USD","").replace(" ",""),
                    "url": relative_url
                }
            )

        next_page = response.xpath('//div[@class="der paginacion-flechas nofloat-xs di"]/../../@href').get()
        
        if next_page is not None:
            next_page_url = "https://www.banifox.com" + next_page
            yield response.follow(next_page_url, callback=self.parse)

    def parse_stock(self, response, name, price, url):
        summary = response.css("div.col-5.col-sm-12.text-center-sm.padding-izq.padding-xs-izq-sm")
        yield {
                "name": name,
                "price": price,
                "url": url,
                "stock": len(summary.css("div.alert.alert-stock")) == 0
            }
