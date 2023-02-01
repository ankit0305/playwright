import { test, expect, Browser } from '@playwright/test';
import { URLS } from '../utils/urls';

test('has title', async ({ page, context }) => {
  await page.goto(URLS.cheapoairURL);
  await page.waitForLoadState("load")
  await page.waitForTimeout(10000)

    let details_first_page: string[] = [];
    let details_second_page: string[] = [];

   //First page
   let f_departure_city = await page.innerText("(//div[contains(@class,'deal-rs__destination-city')]/div)[7]")
   let f_destination_city = await page.innerText("(//div[contains(@class,'deal-rs__destination-city')]/div)[8]")
   details_first_page.push(f_departure_city, f_destination_city)

   const [newPage] = await Promise.all([
   context.waitForEvent('page'),

    // This action triggers the new tab
    await page.click('//*[@id="app"]/main/div[4]/div[2]/div[4]/div/div[3]/div/section/div[2]/a/i')
    // (//a[@class="deal-rs__btn"]/i)[7]')
   ])

   await newPage.waitForLoadState('load')


    //Second page
    let s_departure_city_locator = newPage.locator("[placeholder='Where from?'] + span")
    let s_departure_city = await s_departure_city_locator.innerText()
    let s_destination_city_locator = newPage.locator("[placeholder='Where to?'] + span")
    let s_destination_city = await s_destination_city_locator.innerText()
    
    details_second_page.push(s_departure_city, s_destination_city)

    // Assertion
    expect(details_first_page).toEqual(details_second_page)
});

