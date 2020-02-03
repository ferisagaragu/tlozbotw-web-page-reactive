import { combineReducers, reducer, windowSize } from 'reactive';
import { userData, lostPassword } from '../core/reducers/login.reducer';
import { loading } from '../core/reducers/loading.reducer';
import { allUsers } from '../core/reducers/admin.reducer';

export const reducers = combineReducers({
  form: reducer,
  windowSize,
  userData,
  lostPassword,
  loading,
  allUsers 
});

export const initState = { 
  userData: {
    "id": 1,
    "name": "Fernando",
    "lastName": "Aguirre",
    "phoneNumber": "+(52) 33-23-81-47-52",
    "imageUrl": "https://firebasestorage.googleapis.com/v0/b/tlozbotw-240a7.appspot.com/o/user-img%2Fk5yctgpl?alt=media&token=5dddc5ae-35a9-476d-aec0-4f0e4b1a5253",
    "userName": "fernnypay95",
    "email": "ferisagaragu@gmail.com",
    "firstSession": false,
    "locked": false,
    "enabled": true,
    "roles": [
      "ROLE_USER",
      "ROLE_ADMIN"
    ],
    "type": "Bearer",
    "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJmZXJubnlwYXk5NSIsImlhdCI6MTU4MDI3MDk5OSwiZXhwIjoxNTgwMjg4OTk5fQ.Q9prwvvLoYIEettsbV-kJhMy0tN1nXtQrofi9uAqCdsPI7wKLSpvyHneu-2XXVx9EeTuVpyEqpC4IG0toV318A"
  },
  //userData: null,
  lostPassword: false,
  loading: false,
  windowSize: "xm",
  allUsers: null
};