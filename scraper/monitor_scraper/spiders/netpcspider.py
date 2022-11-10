import scrapy

from scrapy.http import TextResponse

class NetpcSpider(scrapy.Spider):
    name = "netpcspider"
    allowed_domains = ["netpc.uy"]
    start_urls = ["https://netpc.uy/categoria-producto/monitores/"]

    def parse(self, response: TextResponse):
        monitors = response.css("li.product")
        for monitor in monitors:
            relative_url = monitor.css("a.woocommerce-LoopProduct-link").attrib["href"]
            yield response.follow(
                relative_url,
                callback=self.parse_stock,
                cb_kwargs={
                    "name": monitor.css("h2.woocommerce-loop-product__title::text")[0].get(),
                    "price": monitor.css("bdi::text").get().replace('\xa0', ''),
                    "url": relative_url
                }
            )

        next_page_url = response.css("a.next.page-numbers").attrib["href"]
        
        if next_page_url is not None:
            yield response.follow(next_page_url, callback=self.parse)

    def parse_stock(self, response, name, price, url):
        back_order_notice = response.css("p.available-on-backorder").get()
        yield {
                "name": name,
                "price": price,
                "url": url,
                "stock": back_order_notice is None
            }
