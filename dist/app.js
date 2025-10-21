"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pdfConverter_route_1 = __importDefault(require("./routes/pdfConverter.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use(express_1.default.text({ type: "text/html" }));
app.use('/pdf', pdfConverter_route_1.default);
app.get("/health", (req, res) => {
    res.status(200).json({
        message: "Server health status is OK",
        status: "OK"
    });
});
exports.default = app;
