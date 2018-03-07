'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Application from './components/Application';

import {initStores} from './stores';

const stores = initStores();

window['stores'] = stores;
['card1', 'card2', 'card3', 'card4']
    .forEach(card => stores.dashboardStore.columns[1].createCard(card));
['type1', 'type2', 'type3', 'type4']
    .forEach(card => stores.dashboardStore.columns[2].createCard(card));

ReactDOM.render(
    React.createElement(Application, {stores}),
    document.getElementById('app-view')
);
