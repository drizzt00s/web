import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';
class Products{
	constructor(
		public sku:string,
		public name:string,
		public imageUrl:string,
		public department:string[],
		public price:number
	){}
}

















@Component({
	selector:'products-list',
	inputs:['productList'],
	
	template: 
			`
			<div style='border:solid 1px green;'>
			<h1>{{productList.sku}}</h1>
			<span>{{productList.name}}</span>
			</div>

			`
})
class ProductsList{
	productList:Products;
	constructor(){
	}
}




 @Component({
 selector: 'inventory-app',
 directives:[ProductsList],
 template: `
 <div class="inventory-app">

	 <products-list [productList] = "foo" *ngFor = 'let foo of products'>
	 </products-list>

 </div>
 `
 })
 class InventoryApp {
  	products:Array<Products>;
 	constructor(){
		this.products = [
			new Products(
				'NICEHAT', 'A Nice Black Hat',
				'/resources/images/products/black-hat.jpg',
				['Men', 'Accessories', 'Hats'],
				29.99
			),
			new Products(
			'man fucked', 'hahaha',
			'/resources/images2/products/black-hat11.jpg',
			['girl', 'g1g', 'gh'],
			123
			),
			new Products(
			'd', 'ff',
			'/resou11rces/images/products/black-hat.jpg',
			['Me111n', 'Acces111sories', 'Hat11s'],
			2111.99
			)
		];
 	}
 }












 bootstrap(InventoryApp);