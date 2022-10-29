import scrapy


class LaacaspiderSpider(scrapy.Spider):
    name = 'laacaspider'
    allowed_domains = ['laaca.com.uy']
    start_urls = ['https://laaca.com.uy/product-category/pc-gaming/monitores/']

    def parse(self, response):
        monitors = response.css("div.product-block")
        for monitor in monitors:
            yield {
                "name": monitor.css("h3.name a::text").get(),
                "price": monitor.css("ins bdi::text").get() or monitor.css("bdi::text").get(),
                "url": monitor.css("h3.name a").attrib["href"].replace("https://laaca.com.uy","")
            }

        next_page_url = response.css('a.next.page-numbers').attrib["href"]

        if next_page_url is not None:
            yield response.follow(next_page_url, callback=self.parse)
