import { combineReducers } from 'redux';
import { usersReducer, IUsersState } from './usersReducer';

export interface IState {
  users: IUsersState;
}

const reducers = combineReducers({
  users: usersReducer,
});

export default reducers;
