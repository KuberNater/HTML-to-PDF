"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeBrowser = exports.generatePDF = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
// Global browser instance
let browserInstance = null;
/**
 * Initialize browser instance once
 */
const initializeBrowser = async () => {
    if (!browserInstance || !browserInstance.isConnected()) {
        browserInstance = await puppeteer_1.default.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--disable-gpu',
                '--disable-features=IsolateOrigins,site-per-process',
                '--disable-blink-features=AutomationControlled'
            ]
        });
        // Handle browser disconnection
        browserInstance.on('disconnected', () => {
            console.log('Browser disconnected');
            browserInstance = null;
        });
        console.log('Browser initialized');
    }
    return browserInstance;
};
/**
 * Optimize HTML content
 */
const optimizeHTML = (html) => {
    return html
        // Remove HTML comments
        .replace(/<!--[\s\S]*?-->/g, '')
        // Remove excessive whitespace between tags
        .replace(/>\s+</g, '><')
        // Remove multiple spaces
        .replace(/\s{2,}/g, ' ')
        .trim();
};
const generatePDF = async (req, res) => {
    const htmlContent = req.body;
    if (!htmlContent) {
        return res.status(400).send('No HTML content provided in the request body.');
    }
    const startTime = Date.now();
    try {
        // Get or create browser instance
        const browser = await initializeBrowser();
        // Create new page
        const page = await browser.newPage();
        // Optimize HTML
        const optimizedHTML = optimizeHTML(htmlContent);
        // Set viewport
        await page.setViewport({
            width: 1152,
            height: 648,
            deviceScaleFactor: 1
        });
        // Load content with faster wait condition
        await page.setContent(optimizedHTML, {
            waitUntil: 'domcontentloaded', // Much faster than 'networkidle0'
            timeout: 15000
        });
        // Wait for fonts to load
        await page.evaluateHandle('document.fonts.ready');
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
                left: 0
            }
        });
        // Close only the page, not the browser
        await page.close();
        const generationTime = Date.now() - startTime;
        const pdfSizeMB = (pdfBuffer.length / 1024 / 1024).toFixed(2);
        console.log(`PDF generated in ${generationTime}ms, size: ${pdfSizeMB}MB`);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
        res.setHeader('Content-Length', pdfBuffer.length);
        return res.send(pdfBuffer);
    }
    catch (error) {
        console.error('Error generating PDF:', error);
        return res.status(500).json({
            error: 'Failed to generate PDF',
            message: error.message
        });
    }
};
exports.generatePDF = generatePDF;
// Optional: Graceful shutdown function
const closeBrowser = async () => {
    if (browserInstance) {
        await browserInstance.close();
        browserInstance = null;
        console.log('Browser closed');
    }
};
exports.closeBrowser = closeBrowser;
