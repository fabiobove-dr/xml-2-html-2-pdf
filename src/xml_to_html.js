// Import the required libraries
const fs = require('fs');
const path = require('path');
const saxon = require('saxon-js');

// Get the command-line arguments
const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error('Usage: node xml_to_html.js <xmlFilePath> <xsltFilePath> <htmlPath>');
  process.exit(1);
}

const xmlFilePath = args[0];
const xsltFilePath = args[1];
const htmlPath = args[2];

// XSLT Script
const env = saxon.getPlatform();
const xsltContent = fs.readFileSync(xsltFilePath, 'utf-8');
const xsltDoc = env.parseXmlFromString(xsltContent);
xsltDoc._saxonBaseUri = 'dummy';
const xsltCompiled = saxon.compile(xsltDoc);

// XML File content
const xml = fs.readFileSync(xmlFilePath, 'utf-8');

// Output HTML file

const htmlFilename =
  path.basename(xmlFilePath, path.extname(xmlFilePath)) + '.html';
console.log('HTML File:', htmlFilename);

// Transform the XML to HTML
saxon
  .transform(
    {
      stylesheetInternal: xsltCompiled,
      sourceType: 'xml',
      sourceText: xml,
      destination: 'serialized'
    },
    'async'
  )
  .then((output) => {
    const transformedHTML = output.principalResult;
    //console.log(transformedHTML);
    fs.writeFileSync(htmlPath + htmlFilename, transformedHTML, 'utf-8');
    console.log('Transformation completed');
})
  .catch((error) => {
    console.error('Error during transformation:', error);
  });
