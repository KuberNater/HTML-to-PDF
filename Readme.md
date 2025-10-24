# HTML to PDF Converter

A robust PDF generation service built with Puppeteer that converts HTML content into high-quality PDF documents with a 16:9 aspect ratio.

## Overview

This service provides a RESTful API for generating PDFs from HTML markup. Built with TypeScript and modern Node.js practices, it offers a reliable solution for server-side PDF generation.

### Features

- **HTML to PDF Conversion**: Convert any HTML string into a professionally formatted PDF
- **16:9 Aspect Ratio**: Optimized for presentation and document formats
- **Health Monitoring**: Built-in health check endpoint for monitoring and auto-wake capabilities
- **Type-Safe**: Written in TypeScript for enhanced reliability and developer experience

## Prerequisites

- Node.js (v16 or higher recommended)
- pnpm package manager

## Getting Started

### Installation

Install all project dependencies:
```bash
pnpm install
```

### Build

Compile the TypeScript source code:
```bash
pnpm run build
```

### Running the Server

Start the production server:
```bash
pnpm run start
```

The server will start on `http://localhost:8000` by default.

## API Reference

### Generate PDF

Convert HTML content to PDF format.

**Endpoint**
```
POST http://localhost:8000/pdf/create
```

**Request Body**
- Content-Type: `text/html`
- Body: Raw HTML as a string

**Example Request**
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <h1>Hello World</h1>
</body>

</html>
```

**Response**
- Status Code: `200 OK`
- Content-Type: `application/pdf`
- Content-Disposition: `attachment; filename="document.pdf"`
- Body: Binary PDF buffer

**Response Headers**
```
Content-Type: application/pdf
Content-Disposition: attachment; filename="document.pdf"
Content-Length: [size-in-bytes]
```

**Success Response**

The API returns the generated PDF file as a downloadable attachment. The browser will automatically trigger a download with the filename `document.pdf`.

**Reference**: See [Generate PDF.bru](./PDF%20Generator/Generate%20PDF.bru) for complete request examples.

---

### Health Check

Check server status and keep the service active.

**Endpoint**
```
GET http://localhost:8000/health
```

**Response**
```json
{
   "message": "Server health status is OK",
    "status": "OK",
}
```

**Use Cases**
- Monitor service availability
- Wake up inactive/sleeping servers
- Integration with uptime monitoring tools

**Reference**: See [Server Health check.bru](./PDF%20Generator/Server%20Health%20check.bru) for complete request examples.

## Technology Stack

- **Runtime**: Node.js with TypeScript
- **Package Manager**: pnpm
- **PDF Generation**: Puppeteer
- **Output Format**: PDF (16:9 inches)


## Development

### Scripts

- `pnpm run build` - Compile TypeScript to JavaScript
- `pnpm run start` - Start the production server
- `pnpm run dev` - Start development server with hot-reload (if configured)
- `pnpm run format` - Formats the codebase using Prettier
