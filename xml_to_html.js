// Import the required libraries
const fs = require('fs');
const path = require('path');
const saxon = require('saxon-js');

// XSLT Script
const xsltFilePath = 'xslt/test.xsl';
const env = saxon.getPlatform(); 
const doc = env.parseXmlFromString(env.readFile(xsltFilePath));
doc._saxonBaseUri = "dummy";
const sef = saxon.compile(doc);

// XML File content
const xmlFilePath = 'samples/test.xml';
let xml = fs.readFileSync(xmlFilePath, 'utf-8');

// Outup HTML file 
// Output HTML file
const htmlPath = "output/html/"
const htmlFilename = path.basename(xmlFilePath, path.extname(xmlFilePath)) + '.html';
console.log('HTML File:', htmlFilename);

// Transform the XML to HTML
saxon.transform({
    stylesheetInternal:sef,
    sourceType: "xml",
    sourceText:xml,
    destination: "serialized"}, "async"
).then( output => {
    let transformedHTML = output.principalResult
    console.log(transformedHTML);
    fs.writeFileSync(htmlPath + htmlFilename, transformedHTML, 'utf-8');
});