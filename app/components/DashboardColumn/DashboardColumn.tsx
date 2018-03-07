'use strict';

import * as React from 'react';
import { observer } from 'mobx-react';
import { TextField, Card, CardTitle, MenuButton, ListItem } from 'react-md';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import Column from '../../models/Column';
import { DashboardStore } from '../../stores';

import AddItem from '../AddItem/AddItem';
import ItemMenu from '../ItemMenu/ItemMenu';
import ColumnItem from './ColumnItem';
import './DashboardColumn.scss';

interface DashboardColumnPorps {
    column: Column;
    dragType: string;
    index: number;
    droppableId: string;
    onColumnRemove(): void;
}

const DashboardColumn: React.SFC<DashboardColumnPorps> = ({column, dragType, index, droppableId, onColumnRemove}) => {
    const onAddCard = (value) => column.createCard(value);
    const items = column.cards.map((card, idx) => {
        const onRemove = () => column.removeCard(card);
        return (
            <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided, snapshot) => (
                    <div className='column-item-container'>
                        <ColumnItem provided={provided} name={card.title} onRemove={onRemove}/>
                        {provided.placeholder}
                    </div>
                )}
            </Draggable>
        );
    });

    return (
        <Droppable droppableId={droppableId} type={dragType}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="DashboardColumn">
                    <Card className="DashboardColumn-body">
                        <CardTitle title={column.name}>
                            <ItemMenu onRemove={onColumnRemove}/>
                        </CardTitle>
                        {items}
                        <AddItem onSubmit={onAddCard} placeholder='Add a card...'/>
                    </Card>
                </div>
            )}
        </Droppable>
    );
}

export default observer(DashboardColumn);