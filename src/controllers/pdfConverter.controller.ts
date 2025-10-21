import { Request, Response } from "express"
import puppeteer from "puppeteer"

export const generatePDF = async (req: Request, res: Response) => {
    const htmlContent = req.body;

    if (!htmlContent) {
        return res.status(400).send('No HTML content provided in the request body.');
    }

    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
        });

        const page = await browser.newPage();

        await page.coverage.startCSSCoverage();
        await page.coverage.startJSCoverage();
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0',
        });
        await page.setViewport({
            width: 1152,   
            height: 648,   
            // deviceScaleFactor: 1, 
        });

        // Generate PDF
        const pdfBuffer = await page.pdf({
            width: '16in',        // 16 inches width
            height: '9in',        // 9 inches height
            printBackground: true,
            landscape: false,     // Set to false since you're defining exact dimensions
            waitForFonts: true,
            tagged: false,
            displayHeaderFooter: false,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        });

        await browser.close();


        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
        res.setHeader('Content-Length', pdfBuffer.length);

        // Send the PDF buffer
        return res.send(pdfBuffer);

    } catch (error) {
        console.error('Error generating PDF:', error);
        return res.status(500).json({
            error: 'Failed to generate PDF',
            message: error.message
        });
    }
}