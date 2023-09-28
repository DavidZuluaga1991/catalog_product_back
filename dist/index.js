"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const startServer = () => {
    try {
        const app = (0, server_1.configureServer)();
        const port = 3000;
        app.listen(port, () => {
            console.log(`Servidor en funcionamiento en http://localhost:${port}`);
        });
    }
    catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
};
startServer();
