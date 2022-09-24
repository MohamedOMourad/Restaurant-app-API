"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderLine = void 0;
const typeorm_1 = require("typeorm");
const Order_1 = require("./Order");
const Product_1 = require("./Product");
const SuperClass_1 = require("./SuperClass");
let OrderLine = class OrderLine extends SuperClass_1.SuperClass {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderLine.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.orderLine, { nullable: false }),
    __metadata("design:type", Product_1.Product)
], OrderLine.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Order_1.Order, (order) => order.orderLine, { nullable: false }),
    __metadata("design:type", Order_1.Order)
], OrderLine.prototype, "order", void 0);
OrderLine = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(["product", "order"])
], OrderLine);
exports.OrderLine = OrderLine;
