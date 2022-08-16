const puppeteer = require('puppeteer-core');
// const config    = require('./config.json');
let attack_mat = ["super-effective","not-very-effective","no-effect"]
let defence_mat = ["resists","weak-to","immune-to"]

async function fun(){
    const browser = await puppeteer.launch({
        headless:false,
        executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" 
    })
    let type = ["normal","fire","water","electric","grass","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"]
    const page = await browser.newPage();
    let f = {};
    let attack,defence;
    for(i=0;i<type.length;i++){
        await page.goto("https://pokemondb.net/type/"+type[i]);
        await page.waitForSelector("#main > div.grid-row > div:nth-child(1) > div");
        attack  = await page.evaluate(()=>document.querySelector("#main > div.grid-row > div:nth-child(1) > div > div").innerText)
        defence = await page.evaluate(()=>document.querySelector("#main > div.grid-row > div:nth-child(1) > div > div:nth-child(2)").innerText)
        attack  = attack.split('\n').filter(n=>n)
        defence = defence.split('\n').filter(n=>n)
        attack  = attack.slice(1,attack.length).filter((n,i)=>{if(i%2){return n}}).map(n=>n.split(' ').map(n=>n.toLowerCase()))
        defence = defence.slice(1,defence.length).filter((n,i)=>{if(i%2){return n}}).map(n=>n.split(' ').map(n=>n.toLowerCase()))
        f[type[i]] = {"attack":{},"defence":{}}
        for(k=0;k<attack.length;k++){
            f[type[i]]["attack"][attack_mat[k]] = attack[k] 
        }
        for(k=0;k<defence.length;k++){
            f[type[i]]["defence"][defence_mat[k]] = defence[k] 
        }
    }
    console.log(JSON.stringify(f))
 
}

fun()
           