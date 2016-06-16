"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var Article = (function () {
    function Article(title, link, votes) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }
    Article.prototype.voteUp = function () {
        this.votes += 1;
    };
    Article.prototype.voteDown = function () {
        this.votes -= 1;
    };
    return Article;
}());
var articleComp = (function () {
    function articleComp() {
    }
    articleComp.prototype.voteUp = function () {
        this.article.voteUp();
        return false;
    };
    articleComp.prototype.voteDown = function () {
        this.article.voteDown();
        return false;
    };
    articleComp = __decorate([
        core_1.Component({
            selector: 'reddit-article',
            inputs: ['article'],
            host: {
                class: 'row'
            },
            template: "\n\t\t<div class=\"four wide column center aligned votes\">\n\t\t\t<div class=\"ui statistic\">\n\t\t\t<div class=\"value\">\n\t\t\t{{ article.votes }}\n\t\t\t</div>\n\t\t\t<div class=\"label\">\n\t\t\tPoints\n\t\t\t</div>\n\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"twelve wide column\">\n\t\t\t<a class=\"ui large header\" href=\"{{ article.link }}\">\n\t\t\t{{ article.title }}\n\t\t\t</a>\n\t\t\t<ul class=\"ui big horizontal list voters\">\n\t\t\t<li class=\"item\">\n\t\t\t<a href (click)=\"voteUp()\">\n\t\t\t<i class=\"arrow up icon\"></i>\n\t\t\tupvote\n\t\t\t</a>\n\t\t\t</li>\n\t\t\t<li class=\"item\">\n\t\t\t<a href (click)=\"voteDown()\">\n\t\t\t<i class=\"arrow down icon\"></i>\n\t\t\tdownvote\n\t\t\t</a>\n\t\t\t</li>\n\t\t\t</ul>\n\t\t</div>\n\t\t"
        })
    ], articleComp);
    return articleComp;
}());
var RedditApp = (function () {
    function RedditApp() {
        this.articles = [
            new Article('Angular 2', 'http://angular.io', 3),
            new Article('Fullstack', 'http://fullstack.io', 2),
            new Article('Angular Homepage', 'http://angular.io', 1)
        ];
    }
    RedditApp.prototype.add = function (title, link) {
        // console.log(title.value);
        //console.log(link.value);
        this.articles.push(new Article(title.value, link.vlaue, 0));
        title.value = '';
        link.value = '';
    };
    RedditApp.prototype.sortedArticles = function () {
        return this.articles.sort(function (a, b) { return b.votes - a.votes; });
    };
    RedditApp = __decorate([
        core_1.Component({
            selector: 'reddit',
            directives: [articleComp],
            template: "\n\t\t<form class=\"ui large form segment\" style='border:solid 1px red;'>\n\t\t\t<h3 class=\"ui header\">Add a Link</h3>\n\t\t\t<div class=\"field\">\n\t\t\t\t<label for=\"title\">Title:</label>\n\t\t\t\t<input name=\"title\" #newtitle>\n\t\t\t</div>\n\t\t\t<div class=\"field\">\n\t\t\t\t<label for=\"link\">Link:</label>\n\t\t\t\t<input name=\"link\" #newlink>\n\t\t\t</div>\n\n\t\t\t<button (click)=\"add(newtitle, newlink)\" ui positive right floated button>\n\t\t\tSubmit link\n\t\t\t</button>\n\t\t</form>\n\t\n\n\t\t<div class=\"ui grid posts\">\n\t\t\t<reddit-article\n\t\t\t*ngFor=\"let foobar of sortedArticles()\"\n\t\t\t[article]=\"foobar\">\n\t\t\t</reddit-article>\n\t\t</div>\n\t\t"
        })
    ], RedditApp);
    return RedditApp;
}());
platform_browser_dynamic_1.bootstrap(RedditApp);
