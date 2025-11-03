"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const generatePDF = async (req, res) => {
    const htmlContent = req.body;
    if (!htmlContent) {
        return res
            .status(400)
            .send('No HTML content provided in the request body.');
    }
    try {
        const browser = await puppeteer_1.default.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
            ],
        });
        const page = await browser.newPage();
        await page.coverage.startCSSCoverage();
        await page.coverage.startJSCoverage();
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0',
        });
        // Generate PDF
        const pdfBuffer = await page.pdf({
            width: '16in',
            height: '9in',
            printBackground: true,
            landscape: false,
            waitForFonts: true,
            tagged: false,
            displayHeaderFooter: false,
            margin: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
        });
        await browser.close();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
        res.setHeader('Content-Length', pdfBuffer.length);
        // Send the PDF buffer
        res.send(pdfBuffer);
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        return res.status(500).json({
            error: 'Failed to generate PDF',
            message: error.message,
        });
    }
};
exports.generatePDF = generatePDF;
