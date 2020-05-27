const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;

const getHtml = async () => {
  try {
    return await axios.get("https://www.netflix.com/kr/browse/genre/83");
  } catch (error) {
    console.error(error);
  }
};

getHtml()
  .then(html => {
    let ulList = [];
    let titleList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("div.nm-collections-container div").children("section.nm-collections-row");

    $bodyList.each(function(i, elem) {
      ulList[i] = {
          title: $(this).find('h1.nm-collections-row-name a.nm-collections-link span.nm-collections-row-name').text(),
          url: $(this).find('div.nm-content-horizontal-row ul.nm-content-horizontal-row-item-container li.nm-content-horizontal-row-item a.nm-collections-link').attr('href'),
          
          //image_url: $(this).find('p.poto a img').attr('src'),
          //image_alt: $(this).find('p.poto a img').attr('alt'),
          //summary: $(this).find('p.lead').text().slice(0, -11),
          //date: $(this).find('span.p-time').text()
      };
    });

    const data = ulList.filter(n => n.title);
    return data;
  })
  .then(res => log(res));