"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const conection_1 = require("./DB/conection");
const Order_1 = __importDefault(require("./Routes/Order"));
const Product_1 = __importDefault(require("./Routes/Product"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)());
app.use((0, express_2.json)());
app.use((0, express_2.urlencoded)({ extended: false }));
app.use('/order', Order_1.default);
app.use('/product', Product_1.default);
app.get("/", (req, res) => {
    res.status(200).send('How You Doin');
});
app.get("/*", (req, res) => {
    res.status(404).send({ error: "End Point NOt Found!" });
});
app.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield conection_1.AppDataSource.initialize();
        console.log(`connected to the database`);
    }
    catch (error) {
        throw new Error(`${error.message}`);
    }
}));
