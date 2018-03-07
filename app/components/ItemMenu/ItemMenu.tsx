'use strict';

import * as React from 'react';
import { TextField, Card, CardText, Button, MenuButton, ListItem } from 'react-md';

import './ItemMenu.scss';

interface ItemMenuProps {
    onRemove(): void;
}

const ItemMenu: React.SFC<ItemMenuProps> = ({onRemove}) => {
    return (
        <MenuButton id="menu-button" icon listInline centered
            className="ItemMenu"
            menuItems={[
                <ListItem key={1} className="column-menu-item" primaryText="Remove" onClick={onRemove}/>
            ]}
            anchor={{x: 'center', y: 'center'}}
            children="more_horiz"
        />
    )
}

export default ItemMenu;
