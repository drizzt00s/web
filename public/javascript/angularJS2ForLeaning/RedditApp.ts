import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component} from '@angular/core';

class Article{
	title:string;
	link:string;
	votes:number;
	constructor(title:string, link:string, votes?: number){
		this.title = title;
		this.link = link;
		this.votes = votes || 0;
	}
	voteUp():void {
		this.votes += 1;
	}

	voteDown() :void {
		this.votes -= 1;
	}
}

@Component({
	selector:'reddit-article',
	inputs:['article'],
	host:{
		class:'row'
	},
	template:`
		<div class="four wide column center aligned votes">
			<div class="ui statistic">
			<div class="value">
			{{ article.votes }}
			</div>
			<div class="label">
			Points
			</div>
			</div>
			</div>
			<div class="twelve wide column">
			<a class="ui large header" href="{{ article.link }}">
			{{ article.title }}
			</a>
			<ul class="ui big horizontal list voters">
			<li class="item">
			<a href (click)="voteUp()">
			<i class="arrow up icon"></i>
			upvote
			</a>
			</li>
			<li class="item">
			<a href (click)="voteDown()">
			<i class="arrow down icon"></i>
			downvote
			</a>
			</li>
			</ul>
		</div>
		`	
})
class articleComp{
	article:Article;
	constructor(){
	}
	voteUp(): boolean {
		this.article.voteUp();
		return false;
	}
	voteDown(): boolean {
		this.article.voteDown();
		return false;
	}
}





@Component({
	selector: 'reddit',
	directives:[articleComp],
	template:`
		<form class="ui large form segment" style='border:solid 1px red;'>
			<h3 class="ui header">Add a Link</h3>
			<div class="field">
				<label for="title">Title:</label>
				<input name="title" #newtitle>
			</div>
			<div class="field">
				<label for="link">Link:</label>
				<input name="link" #newlink>
			</div>

			<button (click)="add(newtitle, newlink)" ui positive right floated button>
			Submit link
			</button>
		</form>
	

		<div class="ui grid posts">
			<reddit-article
			*ngFor="let foobar of sortedArticles()"
			[article]="foobar">
			</reddit-article>
		</div>
		`
})
class RedditApp{
	articles: Article[];
	constructor(){
		this.articles = [
			new Article('Angular 2', 'http://angular.io', 3),
			new Article('Fullstack', 'http://fullstack.io', 2),
			new Article('Angular Homepage', 'http://angular.io', 1)
		];
	}
	add(title:HTMLInputElement, link:HTMLInputElement):void{
		// console.log(title.value);
		//console.log(link.value);
		 this.articles.push(new Article(title.value, link.vlaue, 0));
		 title.value = '';
		 link.value = '';
	}
	sortedArticles():Article[]{
		return this.articles.sort((a: Article, b: Article) => b.votes - a.votes);
	}
}




bootstrap(RedditApp);