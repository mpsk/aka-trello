import { observable, computed, action, IObservableArray } from 'mobx';
import { uniqueId } from 'lodash';
import { DashboardStore } from '../stores';
import Card from './Card';

export interface ColumnProps {
    name: string;
}

export default class Column {

    name: string;
    id: string;
    @observable cards: IObservableArray<Card> = observable([]);

    constructor(options: ColumnProps) {
        this.id = uniqueId('column-');
        this.name = options.name;
    }

    @action createCard(title: string): Card {
        const card = new Card({ title });
        this.addCard(card);
        return card;
    }

    @action addCard(card: Card): Column {
        this.cards.push(card);
        return this;
    }

    @action removeCard(card: Card) {
        this.cards.remove(card);
    }

    @action removeCardById(cardId) {
        const card = this.getCartById(cardId);
        if (card) {
            this.cards.remove(card);
        }
    }

    @action moveCard(cardId, toIdx, isNew) {
        const idx = this.cards.findIndex(({ id }) => id === cardId);
        if (idx >= 0) {
            this.cards.move(idx, isNew ? (idx - toIdx) : (idx + toIdx));
        }
    }

    getCartById(cardId): Card {
        return this.cards.find(({ id }) => id === cardId);
    }
}
