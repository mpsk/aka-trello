'use strict';

import * as React from 'react';
import { TextField, Card, CardText, Button } from 'react-md';

import Column from '../../models/Column';
import { DashboardStore } from '../../stores';

import ItemMenu from '../ItemMenu/ItemMenu';

interface ColumnItemPorps {
    name: string;
    provided: any;
    onRemove(): void;
}

const ColumnItem: React.SFC<ColumnItemPorps> = ({name, provided, onRemove}) => {
    return (
        <div className="ColumnItem"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            >
            <Card className="ColumnItem-body">
                <ItemMenu onRemove={onRemove}/>
                <CardText className="ColumnItem-body-text">{name}</CardText>
            </Card>
        </div>
    );
}

export default ColumnItem;
