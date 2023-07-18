const fs = require('fs');
const puppeteer = require('puppeteer');


// Get the command-line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: node html_to_pdf.js <htmlFilePath> <xsltFilePath> <pdfFilePath>');
  process.exit(1);
}

const htmlFilePath = args[0];
const pdfFilePath = args[1];

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
