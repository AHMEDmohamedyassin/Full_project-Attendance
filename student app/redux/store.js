import {createStore , applyMiddleware, combineReducers , compose } from 'redux';
import {thunk} from 'redux-thunk';
import { AuthReducer } from "./reducer/AuthReducer";
import { StudentReducer } from './reducer/StudentReducer';
import { SettingReducer } from './reducer/SettingReducer';

const rootReducer = combineReducers({
    Auth : AuthReducer ,
    Stud : StudentReducer ,
    Set : SettingReducer
})

export const store = createStore(
    rootReducer ,   
    applyMiddleware(thunk)
);

store.subscribe(() => {
    console.log('State updated Auth:', store.getState().Auth);
    console.log('State updated student:', store.getState().Stud);
    console.log('State updated setting:', store.getState().Set);
  });