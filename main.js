const puppeteer = require('puppeteer-core');
const user      = require('./dataset/auth.json');
const auth      = require('./fun/auth.js');


async function fun(){

    const browser = await puppeteer.launch({
        headless:false,
        executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" 
    })

    let page = await browser.newPage();
    
    await auth(page,user);
    

}

fun()
           