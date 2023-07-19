# xml-2-html-2-pdf
Simple Node.js script to Convert XML to HTML using a provided XSLT and Generate PDF from the Resulting HTML.

```
Usage: node xml_to_html.js <xmlFilePath> <xsltFilePath> <htmlPath>
Usage: node html_to_pdf.js <htmlFilePath> <pdfFilePath>
Usage: node html_to_pdf_v2.js <htmlFilePath> <pdfFilePath>
```

* html_to_pdf_v2.js uses puppeteer-core instead of puppeteer, and allow to specify the chromicon executioner path.
  Right now the path is set to 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' - i'm lazy so if you need this patch modify it on line 21 of the code.

<br>
Cheers.
;)