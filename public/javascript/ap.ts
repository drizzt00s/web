import { bootstrap } from "@angular/platform-browser-dynamic";
import { Component } from "@angular/core";

@Component({
selector: 'hello-world',
template: `
<div>
fuck  {{name}}
</div>
`
})
class t {
	name:string;
	constructor(){
		this.name = "you";
	}
}

bootstrap(t);