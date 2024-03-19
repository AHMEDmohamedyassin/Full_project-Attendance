import {createStore , applyMiddleware, combineReducers , compose} from 'redux';
import {thunk} from 'redux-thunk';
import { AuthReducer } from "./reducer/AuthReducer";
import { LectureReducer } from "./reducer/LectureReducer";

const rootReducer = combineReducers({
    Auth : AuthReducer ,
    Lecture : LectureReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer ,   composeEnhancers(applyMiddleware(thunk)));