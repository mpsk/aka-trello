'use strict';

import { observable, action, IObservableArray, IObservableObject } from 'mobx';
import Column, { ColumnProps } from '../models/Column';

export default class DashboardStore {
    static create = create;
    @observable columns: IObservableArray<Column>;

    @action addColumn(name: string): Column {
        const column = new Column({ name });
        if (!this.columns.find((item) => item.name === name)) {
            this.columns.push(column);
        }
        return column;
    }

    @action moveColumn(id, toIdx) {
        const idx = this.columns.findIndex((column) => column.id === id);
        if (idx >= 0) {
            this.columns.move(idx, idx + toIdx);
        }
    }

    @action removeColumn(column) {
        this.columns.remove(column);
    }

    @action moveCardToColumn(fromColumnId, cardId, toColumnId, idxPosition) {
        const sourceColumn = this.findColumnById(fromColumnId);
        const targetColumn = this.findColumnById(toColumnId);
        if (sourceColumn && targetColumn) {
            let isNew = false;
            if (sourceColumn.id !== targetColumn.id) {
                const card = sourceColumn.getCartById(cardId);
                sourceColumn.removeCardById(cardId);
                targetColumn.addCard(card);
                isNew = true;
            }
            targetColumn.moveCard(cardId, idxPosition, isNew);
        }
    }

    findColumnById(columnId): Column {
        return this.columns.find(({ id }) => id === columnId);
    }

}

function create(columns: Array<ColumnProps>): DashboardStore {
    const store = new DashboardStore();
    store.columns = observable(
        columns.map((item: ColumnProps) => new Column(item))
    );
    return store;
}