"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const address = "0.0.0.0:3000";
app_1.app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
