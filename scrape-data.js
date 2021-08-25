const puppeteer = require('puppeteer');
const fs = require('fs');

const URL = 'https://whats.new/shortcuts/';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(URL);
    await page.waitForSelector('.data-table__content');

    const data = await page.$$eval('table', (tables) => {
      const shortcuts = {};
      tables.forEach((table) => {
        const categoryName = table.getAttribute('data-category-name');
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach((tr) => {
          const links = tr.querySelectorAll('.data-table__cell--domain a');
          const company = tr
            .querySelector('.data-table__cell--company')
            .textContent.trim();
          const description = tr
            .querySelector('.data-table__cell--description')
            .textContent.trim();
          links.forEach((link) => {
            const url = link.getAttribute('href').trim();
            const shortcutLabel = link.querySelector('div').textContent.trim();
            const shortcut = shortcutLabel.split('.')[0];
            shortcuts[shortcut] = {
              url,
              company,
              description,
              category: categoryName,
            };
          });
        });
      });
      return shortcuts;
    });
    fs.writeFileSync('data.json', JSON.stringify(data), 'utf-8');
    console.log('Data saved to data.json');
    await browser.close();
  } catch (e) {
    console.error('ERROR: ', e);
  }
})();
