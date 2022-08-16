async function auth(page,login_data){

    await page.goto('https://play.pokemonshowdown.com/')

    await page.setViewport({ width: 1536, height: 714 })

    await page.waitForSelector('button[name="login"]')
    await page.click('button[name="login"]')


    await page.waitForSelector('input[name="username"]')
    await page.type('input[name="username"]', login_data.username)
    await page.click('button[type="submit"]')

    await page.waitForSelector('input[type="password"]')
    await page.type('input[type="password"]', login_data.password)
    await page.click('button[type="submit"]')
    
    await page.waitForSelector('#header > div.userbar > span')
    try{
     let user = await page.evaluate(()=>document.querySelector('#header > div.userbar > span').innerText)
     console.log(user,"logged in")
    }
    catch(err){
        console.log("login Error: "+err)
    }
    
}


module.exports = auth