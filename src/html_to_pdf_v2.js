const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

// Get the command-line arguments
const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: node html_to_pdf.js <htmlFilePath> <pdfFilePath>');
  process.exit(1);
}

const htmlFilePath = args[0];
// Output HTML file
const pdfFilePath = args[1] + path.basename(htmlFilePath, path.extname(htmlFilePath)) + '.pdf';

(async () => {
  // Provide the path to your specific Chromium executable
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // Replace with the actual path to your Chromium executable
  });
  
  const page = await browser.newPage();

  // Read the HTML content
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

  // Set the HTML content to the page
  await page.setContent(htmlContent);

  // Generate the PDF
  await page.pdf({ path: pdfFilePath, format: 'A3' });

  // Close the browser
  await browser.close();

  // console.log('PDF generated successfully.');
})();
