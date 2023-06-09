"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChattyServer = void 0;
const express_1 = require("express");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const compression_1 = __importDefault(require("compression"));
const cookie_session_1 = __importDefault(require("cookie-session"));
require("express-async-errors");
const SERVER_PORT = 5000;
class ChattyServer {
    constructor(app) {
        this.app = app;
    }
    start() {
        this.securityMiddleware(this.app);
        this.standardMiddleware(this.app);
        this.routeMiddleware(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }
    securityMiddleware(app) {
        app.use((0, cookie_session_1.default)({
            name: "session",
            keys: ["test1", "test2"],
            maxAge: 24 * 7 * 3600000,
            secure: false,
        }));
        app.use((0, hpp_1.default)());
        app.use((0, helmet_1.default)());
        app.use((0, cors_1.default)({
            origin: "*",
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        }));
    }
    standardMiddleware(app) {
        //this will help compress our req and res
        app.use((0, compression_1.default)());
        //this will allow us to send json data back and forth
        //from client to server and server to the client
        app.use((0, express_1.json)({ limit: "50mb" }));
        app.use((0, express_1.urlencoded)({ extended: true, limit: "50mb" }));
    }
    routeMiddleware(app) { }
    globalErrorHandler(app) { }
    startServer(app) {
        try {
            const httpServer = new http_1.default.Server(app);
            this.startHttpServer(httpServer);
        }
        catch (error) {
            console.log(error);
        }
    }
    createSocketIO(httpServer) { }
    startHttpServer(httpServer) {
        httpServer.listen(SERVER_PORT, () => {
            console.log(`Server running on port ${SERVER_PORT}`);
        });
    }
}
exports.ChattyServer = ChattyServer;
//# sourceMappingURL=setupServer.js.map