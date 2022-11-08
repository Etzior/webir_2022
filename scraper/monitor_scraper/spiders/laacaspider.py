import scrapy


class LaacaspiderSpider(scrapy.Spider):
    name = 'laacaspider'
    allowed_domains = ['laaca.com.uy']
    start_urls = ['https://laaca.com.uy/product-category/pc-gaming/monitores/']

    def parse(self, response):
        monitors = response.css("div.product-block")
        for monitor in monitors:
            relative_url = monitor.css("h3.name a").attrib["href"].replace("https://laaca.com.uy","")
            yield response.follow(
                relative_url, 
                callback=self.parse_stock,
                cb_kwargs={
                    "name": monitor.css("h3.name a::text").get(),
                    "price": monitor.css("ins bdi::text").get() or monitor.css("bdi::text").get(),
                    "url": relative_url
                }
                ) 

        next_page_url = response.css('a.next.page-numbers').attrib["href"]

        if next_page_url is not None:
            yield response.follow(next_page_url, callback=self.parse)

    def parse_stock(self, response, name, price, url):
        summary = response.css("div.summary.entry-summary")
        yield {
                "name": name,
                "price": price,
                "url": url,
                "stock": len(summary.css("p.stock").xpath("@class").re("in-stock")) > 0
            }
