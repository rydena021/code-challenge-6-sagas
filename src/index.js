import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';
import { takeEvery, call, put as dispatch } from 'redux-saga/effects';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';

function* addAnimal(action) {
  try {
    yield call(axios.post, '/zoo', action.payload);
    yield dispatch({ type: 'ANIMAL_SNACK' });
    yield dispatch({ type: 'GET_ZOO_ANIMALS' });
  } catch (error) {
    console.log('error: ', error);
  }
}

function* addClass(action) {
  try {
    yield call(axios.post, '/zoo/classes', action.payload);
    yield dispatch({ type: 'CLASS_SNACK' });
    yield dispatch({ type: 'GET_CLASSES' });
  } catch (error) {
    console.log('error: ', error);
  }
}

function* fetchAnimals() {
  try {
    const animalsResponse = yield call(axios.get, '/zoo');
    yield dispatch({ type: 'SET_ZOO_ANIMALS', payload: animalsResponse.data });
  } catch (error) {
    console.log('error: ', error);
  }
}

function* fetchClasses() {
  try {
    const classesResponse = yield call(axios.get, '/zoo/classes');
    yield dispatch({ type: 'SET_CLASSES', payload: classesResponse.data });
  } catch (error) {
    console.log('error: ', error);
  }
}

function* removeAnimal(action) {
  try {
    yield call(axios.delete, `/zoo/${action.payload}`);
    yield dispatch({ type: 'DELETE_SNACK' });
    yield dispatch({ type: 'GET_ZOO_ANIMALS' });
  } catch (error) {
    console.log('error: ', error);
  }
}

// Your saga should listen for the action type of `GET_ZOO_ANIMALS`
function* rootSaga() {
  yield takeEvery('GET_ZOO_ANIMALS', fetchAnimals);
  yield takeEvery('ADD_ANIMAL', addAnimal);
  yield takeEvery('REMOVE_ANIMAL', removeAnimal);
  yield takeEvery('GET_CLASSES', fetchClasses);
  yield takeEvery('ADD_CLASS', addClass);
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store class and number of unique animals in that class
const zooAnimals = (state = [], action) => {
    switch (action.type) {
        case 'SET_ZOO_ANIMALS':
            return action.payload;
        default:
            return state;
    }
}

const classes = (state = [], action) => {
    switch (action.type) {
        case 'SET_CLASSES':
            return action.payload;
        default:
            return state;
    }
}

const snackbars = (state = { open: false, message: '' }, action) => {
  switch (action.type) {
    case 'ANIMAL_SNACK':
      return { open: true, message: 'Animal Added' };
    case 'CLASS_SNACK':
      return { open: true, message: 'Class Added' };
    case 'DELETE_SNACK':
      return { open: true, message: 'Animal Transferred' };
    case 'HIDE_SNACK':
      return { open: false, message: '' };
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        zooAnimals,
        classes,
        snackbars
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
