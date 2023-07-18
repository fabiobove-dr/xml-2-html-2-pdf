const fs = require('fs');
const puppeteer = require('puppeteer');

const htmlFilePath = 'output/html/test.html'; // Change this to your generated HTML file path
const pdfFilePath = 'output/pdf/A3/output.pdf'; // Output PDF file path

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

  // Read the HTML content
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

  // Set the HTML content to the page
  await page.setContent(htmlContent);

  // Generate the PDF
  await page.pdf({ path: pdfFilePath, format: 'A4', headless: 'new' });

  // Close the browser
  await browser.close();

  console.log('PDF generated successfully.');
})();
