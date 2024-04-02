import {createStore , applyMiddleware, combineReducers , compose} from 'redux';
import {thunk} from 'redux-thunk';
import { AuthReducer } from "./reducer/AuthReducer";
import { LectureReducer } from "./reducer/LectureReducer";
import { StudentReducer } from './reducer/StudentReducer';

const rootReducer = combineReducers({
    Auth : AuthReducer ,
    Lecture : LectureReducer ,
    Stud : StudentReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer ,   composeEnhancers(applyMiddleware(thunk)));