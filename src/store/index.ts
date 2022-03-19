import { combineReducers, createStore    } from "redux";
import { getTokenPhantomReducer } from "./getTokenPhantomReducer.ts"
import { getNicknameReducer } from "./getNicknameReducer.ts"


const rootReducer = combineReducers({
    getTokenPhantomReducer,
    getNicknameReducer
})


export const store = createStore(rootReducer)