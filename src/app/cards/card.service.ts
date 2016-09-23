import { Injectable } from '@angular/core';
import { Card } from './card.model';
import { CARDS } from './mock-cards';

@Injectable()
export class CardService {

	getCards() : Promise<Card[]>{
		return Promise.resolve(CARDS);
	}

	constructor() {  }
}
