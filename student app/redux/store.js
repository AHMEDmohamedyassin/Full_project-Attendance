import {createStore , applyMiddleware, combineReducers , compose } from 'redux';
import {thunk} from 'redux-thunk';
import { AuthReducer } from "./reducer/AuthReducer";
import { StudentReducer } from './reducer/StudentReducer';

const rootReducer = combineReducers({
    Auth : AuthReducer ,
    Stud : StudentReducer
})

export const store = createStore(
    rootReducer ,   
    applyMiddleware(thunk)
);

store.subscribe(() => {
    console.log('State updated:', store.getState().Auth);
  });