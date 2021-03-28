import produce from "immer"
import { IUser } from '../../data';
import { getUserTypes } from '../../actions';

export interface IUsersState {
  isLoading: boolean;
  error?: string;
  data: IUser[];
}

const initialState: IUsersState = {
  isLoading: false,
  error: undefined,
  data: [],
}

export const usersReducer = produce((draft: IUsersState, action: any) => {
  switch (action.type) {
    case getUserTypes.GET_USERS_LOADING: {
      draft.isLoading = action.data.isLoading;
      break;
    }
    case getUserTypes.GET_USERS_ERROR: {
      draft.isLoading = action.data.isLoading;
      draft.error = action.data.error;
      break;
    }
    case getUserTypes.GET_USERS_SUCCESS: {
      draft.isLoading = action.data.isLoading;
      draft.error = undefined;
      draft.data = action.data.users;
      break;
    }
  }
}, initialState);
