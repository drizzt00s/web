"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var Products = (function () {
    function Products(sku, name, imageUrl, department, price) {
        this.sku = sku;
        this.name = name;
        this.imageUrl = imageUrl;
        this.department = department;
        this.price = price;
    }
    return Products;
}());
var ProductsList = (function () {
    function ProductsList() {
    }
    ProductsList = __decorate([
        core_1.Component({
            selector: 'products-list',
            inputs: ['productList'],
            template: "\n\t\t\t<div style='border:solid 1px green;'>\n\t\t\t<h1>{{productList.sku}}</h1>\n\t\t\t<span>{{productList.name}}</span>\n\t\t\t</div>\n\n\t\t\t"
        })
    ], ProductsList);
    return ProductsList;
}());
var InventoryApp = (function () {
    function InventoryApp() {
        this.products = [
            new Products('NICEHAT', 'A Nice Black Hat', '/resources/images/products/black-hat.jpg', ['Men', 'Accessories', 'Hats'], 29.99),
            new Products('man fucked', 'hahaha', '/resources/images2/products/black-hat11.jpg', ['girl', 'g1g', 'gh'], 123),
            new Products('d', 'ff', '/resou11rces/images/products/black-hat.jpg', ['Me111n', 'Acces111sories', 'Hat11s'], 2111.99)
        ];
    }
    InventoryApp = __decorate([
        core_1.Component({
            selector: 'inventory-app',
            directives: [ProductsList],
            template: "\n <div class=\"inventory-app\">\n\n\t <products-list [productList] = \"foo\" *ngFor = 'let foo of products'>\n\t </products-list>\n\n </div>\n "
        })
    ], InventoryApp);
    return InventoryApp;
}());
platform_browser_dynamic_1.bootstrap(InventoryApp);
