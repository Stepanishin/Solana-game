import { combineReducers, createStore    } from "redux";
import { getTokenPhantomReducer } from "./getTokenPhantomReducer"


const rootReducer = combineReducers({
    getTokenPhantomReducer
})


export const store = createStore(rootReducer)