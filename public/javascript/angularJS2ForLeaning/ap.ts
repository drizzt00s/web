import { bootstrap } from "@angular/platform-browser-dynamic";
import { Component } from "@angular/core";

@Component({
selector: 'hello-world',
template: `
<ul>
<li *ngFor="let name of names" style="border:solid 1px red;list-style-type:none;">hello {{name}}</li>
</ul>
`
})
class t {
	name:Array<string>;
	constructor(){
		this.names = ["lili","Tyson","Holyfield"]
	}
}

bootstrap(t);