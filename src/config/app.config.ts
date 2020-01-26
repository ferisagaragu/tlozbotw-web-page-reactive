import { createStore, applyMiddleware, compose, thunk, axios } from 'reactive';
import { reducers, initState } from '../declarations/redux.declarations';
import { initializeFirebaseApp, awesomeLibrary } from 'reactive';
import icons from '../declarations/fontawesome.declarations';

//REDUX
const windowRef: any = window;
const composeEnhancers = windowRef.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, initState, composeEnhancers(applyMiddleware(thunk)));

//FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyAPCD6Ai9aASF4j36Sagyn8pI6JlZj3fEE",
  authDomain: "tlozbotw-240a7.firebaseapp.com",
  databaseURL: "https://tlozbotw-240a7.firebaseio.com",
  projectId: "tlozbotw-240a7",
  storageBucket: "tlozbotw-240a7.appspot.com",
  messagingSenderId: "299245941226",
  appId: "1:299245941226:web:c9bac6e300e32279"
}
initializeFirebaseApp(firebaseConfig);

//FONT AWESOME
awesomeLibrary.add(icons);

//AXIOS
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000'
});