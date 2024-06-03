import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { drimoAPI } from "../services/DrimoService.ts";
import modalReducer from './reducers/client/ModalSlice.ts'
import notificationsReducer from './reducers/NotificationsSlice.ts'
import { constructorReducer } from './constructorReducer.js';


const rootReducer = combineReducers({
  modalReducer,
  notificationsReducer,
  constructorReducer,
  [drimoAPI.reducerPath]: drimoAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) =>
    //   getDefaultMiddleware()
    //     .concat(drimoAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']