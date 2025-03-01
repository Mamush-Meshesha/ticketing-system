import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import rootSaga from "./saga/index";
import rootReducer from "./redux/index"; 

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: "root", 
  storage, 
  whitelist: ["auth"], 
};

const persistedAuthReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedAuthReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"], 
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { store, persistor };