'use strict';

import { expr } from 'mobx';
import { observer, Observer } from 'mobx-react';
import * as React from 'react';
import { TextField, Grid } from 'react-md';
import { DragDropContext, Draggable, Droppable, DraggableProvided, DraggableStateSnapshot} from 'react-beautiful-dnd';

import { DashboardStore } from '../../stores';

import DashboardColumn from '../DashboardColumn/DashboardColumn';
import AddItem from '../AddItem/AddItem';
import './Dashboard.scss';

interface DashboardProps {
    dashboardStore: DashboardStore;
}

const DRAG_TYPE = {
    COLUMN: 'COLUMN',
    CARD: 'CARD'
};

const Dashboard: React.SFC<DashboardProps> = ({dashboardStore}) => {

    const onAddColumn = (value) => dashboardStore.addColumn(value);
    const onDragEnd = (result) => moveItem(result, dashboardStore);

    const columns = dashboardStore.columns
        .map((column, idx) => {
            const itemProps = {
                key: column.id,
                dragType: DRAG_TYPE.CARD,
                index: idx,
                droppableId: column.id,
                column,
                onColumnRemove: () => dashboardStore.removeColumn(column)
            };

            return (
                <Draggable key={itemProps.key} draggableId={itemProps.key}>
                    {(provided, snapshot) => (
                        <div className='column-container'>
                            <div ref={provided.innerRef} style={provided.draggableProps.style} {...provided.dragHandleProps}>
                                <DashboardColumn {...itemProps} />
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Draggable>
            )
        });


    return (
        <div className="Dashboard">
            <AddItem onSubmit={onAddColumn} placeholder='Add a list...'/>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="dashboard" 
                    type={DRAG_TYPE.COLUMN}
                    direction="horizontal">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="container-dash-columns">
                            <Grid className="dash-columns">
                                {columns}
                            </Grid>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default observer(Dashboard);

function moveItem(result, dashboardStore) {
    if(!result.destination) {
        return; 
    }
    const {source, destination} = result;

    switch (result.type) {
        case DRAG_TYPE.COLUMN: {
            if (source.droppableId === destination.droppableId &&
                source.index === destination.index) {
                break;
            }
            dashboardStore.moveColumn(result.draggableId, destination.index);
            break;
        }
        case DRAG_TYPE.CARD: {
            dashboardStore.moveCardToColumn(source.droppableId, result.draggableId, destination.droppableId, destination.index);
            break;
        }
    }
}