import reducer from './reducers'
import {createStore} from 'redux'

export default function configureStore() {
  return createStore(
    reducer,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // Uncomment if you want to use the dev tools
  );
}