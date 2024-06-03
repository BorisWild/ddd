import { createStore, combineReducers } from 'redux';

import { constructorReducer } from './constructorReducer';

const rootReducer = combineReducers({
	constructorReducer: constructorReducer,
});

export const setupStore = createStore(rootReducer);