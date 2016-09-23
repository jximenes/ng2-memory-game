import { Component, OnInit } from '@angular/core';
import { CardService } from '../cards/card.service';
import { Card } from '../cards/card.model';

@Component({
  selector: 'grid',
  template: `
  		{{message}}
  		<div class="container">
        <div *ngFor="let row of shuffledCards">
          <div *ngFor="let card of row" (click)="flip(card)" class="card">
            <img src="images/back.png" *ngIf="!card.flipped" />
            <img src="images/{{ card.image }}" *ngIf="card.flipped" />
          <div>
			  <div>
		  </div>
	`,
  styleUrls: ['grid.component.css'],
  providers: [CardService]
})
export class GridComponent implements OnInit {

	message = "";
	cards : Card[] = [];
	shuffledCards : Card[][] = [];

	firstCard = undefined;
	timerClean = undefined;

	shuffleCards(){
		var rows = Math.floor(Math.sqrt(this.cards.length));
		var cols = this.cards.length / rows;
		this.shuffledCards = [];
		for(var r = 0; r<rows; r++){
			this.shuffledCards[r] = [];
			for(var c = 0; c<cols; c++){
				if(this.cards.length>0){
					var i = Math.floor(Math.random() * this.cards.length)
					var randomCard = this.cards.splice(i, 1)[0];
					this.shuffledCards[r][c] =randomCard;
				}
			}
		}
	}

	flip(card){
		if(card.flipped===true || this.timerClean){
			return;
		}

		card.flipped=true;

		if(!this.firstCard){
			this.firstCard = card;

			return;
		}
		else{
			if(this.firstCard.name === card.name){
				this.firstCard = undefined;
				this.message = "Right pair";
			}
			else{
				//var self=this;
				this.timerClean = setTimeout(()=>{
					this.firstCard.flipped = false;
					card.flipped = false;
					this.firstCard = undefined;
					this.timerClean=undefined;
				}, 2000);
			}
		}
	}

	constructor( private cardService : CardService ) {
		this.cardService = cardService;
	}

	ngOnInit() {
		this.cardService.getCards().then(c => {
			this.cards = this.duplicate(c);
			this.shuffleCards();
		});

	}

	duplicate(arr: any[]){
		var temp = [];
		arr.forEach((x) => {
			temp.push(Object.assign({}, x));
		});
		return arr.concat(temp);
	}

}
