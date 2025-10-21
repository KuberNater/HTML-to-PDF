"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pdfConverter_controller_1 = require("../controllers/pdfConverter.controller");
const router = express_1.default.Router();
router.post('/create', pdfConverter_controller_1.generatePDF);
exports.default = router;
