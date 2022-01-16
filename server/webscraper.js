const puppeteer = require('puppeteer-extra');

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

async function scrapePitchforkReviews(){
    try{
        const browser = await puppeteer.launch({headless: true,
            args: [
                '--aggressive-cache-discard',
                '--disable-cache',
                '--disable-application-cache',
                '--disable-offline-load-stale-cache',
                '--disable-gpu-shader-disk-cache',
                '--media-cache-size=0',
                '--disk-cache-size=0'
                ]
        });

        const page = await browser.newPage();
        let pageNumber = 1;
        let url = `https://www.albumoftheyear.org/ratings/1-pitchfork-highest-rated/1999/${pageNumber}`
        
        await page.goto(url);

        let album_info = [];
        const finalPageNum = await page.$$eval('.pageSelectSmall', el => el[el.length - 1].innerText)
        console.log(finalPageNum)

        while(pageNumber <= finalPageNum){
            url = `https://www.albumoftheyear.org/ratings/1-pitchfork-highest-rated/1999/${pageNumber}`
            await page.goto(url);
            const albums = await page.$$('.albumListRow')
            for(const ele of albums) {
                const album_name = await ele.$eval('h2 > span > a', el => el.innerText)
                const album_date = await ele.$eval('.albumListDate', el => el.innerText);
                const album_score = await ele.$eval('.scoreValue', el => el.innerText);
                
                let album_cover = await ele.$eval('.albumListCover > a > img', el => el.getAttribute('data-src'))
                album_cover = album_cover.replace('200x', '400x')

                album_info.push({album_name, album_date, album_score, album_cover})
            }
            pageNumber++;
        }
        console.log(album_info)
        await browser.close();
        return album_info;

    } catch(err) {
        console.log("ERROR: ", err);
    }

}

scrapePitchforkReviews();
// module.exports = {
//     scrapePitchforkReviews
// }