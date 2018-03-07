import { observable, computed, action, IObservableArray } from 'mobx';
import { uniqueId } from 'lodash';

export interface CardProps {
    title: string;
}

export default class Card {

    title: string;
    id: string;

    constructor(options: CardProps) {
        this.id = uniqueId('card-');
        this.title = options.title;
    }
}
