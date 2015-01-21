;(function(){
//========== Game ==========
var Game = function(canvasID) {
	var self = this;
	var canvas = document.getElementById(canvasID);
	canvas.width = 800; canvas.height = 500;
	var display = canvas.getContext('2d');
	var displaySize = {x:canvas.width, y:canvas.height};
	
	canvas.addEventListener('click', click, false);
	canvas.addEventListener('mousemove', mouse, false);
	
	var bg = new Image(); bg.src = 'img/bg.png';
	this.objects = new Array();
	this.objects[0] = new Deck();
	this.objects[1] = new Player(this.objects[0]);
	this.objects[2] = new Enemy(this.objects[0]);
	
	var tick = function(){
		self.render(display, displaySize, bg);
		requestAnimationFrame(tick);
	};
	tick();
}; Game.prototype = {
	render:function(display, displaySize, bg){
		display.clearRect(0, 0, displaySize.x, displaySize.y); display.drawImage(bg, 0, 0, displaySize.x, displaySize.y, 0, 0, displaySize.x, displaySize.y);
		for(var i=0; i<this.objects.length;i++){
			this.objects[i].update();
			this.objects[i].draw(display);
		}
	}
}
//========== End Game ==========
//========== Deck ==========
var Deck = function(display){
	var cards = [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5]]; 
	this.pos = {x1:560, y1:145, x2:580, y2:155};
	this.koloda = this.tos(cards);
	this.kolvo = cards.length;
	this.kozir = new Card(this.koloda[0]);
	this.back = new Card(false);
}; Deck.prototype = {
	tos:function(cards) {
		var newKoloda = new Array();
		for(var i=0; i<cards.length;i++){
			var rand = Math.floor(Math.random() * (cards.length - i)) + i;
			newKoloda[i] = cards[rand];
			cards.splice(rand,1);
		}
	return newKoloda;
	},
	draw:function(display) {
		if(this.kolvo > 0) this.kozir.draw(display, this.pos.x1, this.pos.y1);
		if(this.kolvo > 1) this.back.draw(display, this.pos.x2, this.pos.y2);
	},
	update:function() {}
}
//========== End Deck ==========
//========== Player ==========
var Player = function(deck){
	this.deck = deck;
	this.cardPos = {x:310, y:301, a:45};
	this.cardAnimPos = [{x:this.deck.pos.x2, y:this.deck.pos.y2},{x:this.deck.pos.x2, y:this.deck.pos.y2},{x:this.deck.pos.x2, y:this.deck.pos.y2}];
	this.anim = false;
	this.cards = [false, false, false];
	this.points = 0;
	this.name = 0;
	this.id = 0;
	this.take(0);
}; Player.prototype = {
	draw:function(display){
		for(var i=0; i<3;i++){
			if (this.cards[i] != false) this.cards[i].draw(display, this.cardAnimPos[i].x, this.cardAnimPos[i].y);
		}
	},
	take:function(i){
		if (i<3 && this.cards[i] == false) {this.anim = i; this.cards[i] = new Card(this.deck.koloda[i+1]);}
	},
	update:function() {
		if(this.anim !== false){ 
			if(this.cardAnimPos[this.anim].x > this.cardPos.x+this.anim*this.cardPos.a) this.cardAnimPos[this.anim].x = this.cardAnimPos[this.anim].x-20; else {this.cardAnimPos[this.anim].x=this.cardPos.x+this.anim*this.cardPos.a;}
			if(this.cardAnimPos[this.anim].y < this.cardPos.y) this.cardAnimPos[this.anim].y = this.cardAnimPos[this.anim].y+15; else {this.cardAnimPos[this.anim].y=this.cardPos.y;}
			if(this.cardAnimPos[this.anim].x==this.cardPos.x+this.anim*this.cardPos.a && this.cardAnimPos[this.anim].y==this.cardPos.y) {i=this.anim+1; this.anim=false; this.take(i);}
		}
	}
}
//========== End Player ==========
//========== Enemy ==========
var Enemy = function(deck){
	this.deck = deck;
	this.cardPos = {x:310, y:6, a:45};
	this.cardAnimPos = [{x:this.deck.pos.x2, y:this.deck.pos.y2},{x:this.deck.pos.x2, y:this.deck.pos.y2},{x:this.deck.pos.x2, y:this.deck.pos.y2}];
	this.anim = false;
	this.cards = [false, false, false];
	this.points = 0;
	this.name = 0;
	this.id = 0;
	this.take(0);
}; Enemy.prototype = {
	draw:function(display){
		for(var i=0; i<3;i++){
			if (this.cards[i] != false) this.cards[i].draw(display, this.cardAnimPos[i].x, this.cardAnimPos[i].y);
		}
	},
	take:function(i){
		if (i<3 && this.cards[i] == false) {this.anim = i; this.cards[i] = new Card(this.deck.koloda[i+4]);}
	},
	update:function() {
		if(this.anim !== false){ 
			if(this.cardAnimPos[this.anim].x > this.cardPos.x+this.anim*this.cardPos.a) this.cardAnimPos[this.anim].x = this.cardAnimPos[this.anim].x-20; else {this.cardAnimPos[this.anim].x=this.cardPos.x+this.anim*this.cardPos.a;}
			if(this.cardAnimPos[this.anim].y > this.cardPos.y) this.cardAnimPos[this.anim].y = this.cardAnimPos[this.anim].y-15; else {this.cardAnimPos[this.anim].y=this.cardPos.y;}
			if(this.cardAnimPos[this.anim].x==this.cardPos.x+this.anim*this.cardPos.a && this.cardAnimPos[this.anim].y==this.cardPos.y) {i=this.anim+1; this.anim=false; this.take(i);}
		}
	}
}
//========== End Enemy ==========
//========== OnTable ==========
var OnTable = function(suit, val, posX, posY){
	
}
OnTable.prototype = {
	update:function(){
		
	}
}
//========== End OnTable ==========
//========== Card ==========
var Card = function(card){
	this.card = card;
	this.size = {width:46, height:58};
	this.img = new Image();
	if(this.card == false){
		this.img.src = 'img/backcard.png';
	} else {
		this.img.src = 'img/cards.png';
	}
}; Card.prototype = {
	draw:function(display, posX, posY){
		if(this.card == false)
			display.drawImage(this.img, 0, 0, this.size.width, this.size.height, posX, posY, this.size.width, this.size.height);
		else
			display.drawImage(this.img, this.card[1]*46, this.card[0]*58, this.size.width, this.size.height, posX, posY, this.size.width, this.size.height);
	}
}
//========== End Card ==========
//========== Mouse ==========
var mouse = function(e){
	console.log('mouse: '+ e.layerX, e.layerY);
	//console.log(Math.floor(Math.random()*2));
}
var click = function(e){
	console.log('click: '+ e.layerX, e.layerY);
}
//========== End Mouse ==========

window.onload = function(){
	/*VK.init(function() { 
		
	}, function() { 
		
	}, '5.27'); */
	new Game('bura');
}
})();