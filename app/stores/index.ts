'use strict';

import { useStrict } from 'mobx';
import AppStore from './AppStore';
import DashboardStore from './DashboardStore';

useStrict(true);

export {
	initStores,
	AppStore,
	DashboardStore
}

export interface Stores {
	app: AppStore;
	dashboardStore: DashboardStore;
}

const columns = [{ name: 'Column1' }, { name: 'Column2' }, { name: 'Column3' }];

function initStores(): Stores {
	return {
		app: new AppStore(),
		dashboardStore: DashboardStore.create(columns) // read from localStorage before init all
	}
}
