'use strict';

import * as React from 'react';

import { Stores } from '../stores';
import Dashboard from './Dashboard/Dashboard';

import './Application.scss';

interface AppProps {
    stores: Stores;
}

const Application: React.SFC<AppProps> = ({stores}) => {
    return (
        <div className='Application'>
            <Dashboard dashboardStore={stores.dashboardStore}/>
        </div>
    );
}

export default Application;
