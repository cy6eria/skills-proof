import { Dispatch } from 'redux';
import faker from 'faker';
import {
  startOfDay, addHours,
} from 'date-fns';
import { TimeEntry, User } from '../../data';

export enum getUserTypes {
  GET_USERS_LOADING = 'GET_USERS_LOADING',
  GET_USERS_ERROR = 'GET_USERS_ERROR',
  GET_USERS_SUCCESS = 'GET_USERS_SUCCESS',
}

export const getUsers = () => (dispatch: Dispatch) => {
  dispatch({
    type: getUserTypes.GET_USERS_LOADING,
    data: {
      isLoading: true,
    },
  });

  if (Math.random() < 0.25) {
    setTimeout(() => {    
      dispatch({
        type: getUserTypes.GET_USERS_ERROR,
        data: {
          isLoading: false,
          error: 'Something went wrong! Try again.',
        },
      });
    }, 1000)
  } else {
    setTimeout(() => {
      const usersRaw = localStorage.getItem('users');
      let users;

      if (!usersRaw) {
        users = Array.from(new Array(150)).map(() => {
          return new User({
            id: faker.random.uuid(),
            name: faker.name.findName(),
            active: Boolean(faker.random.boolean()),
            times: Array.from(new Array(faker.random.number(3))).map(() => {
              const date = startOfDay(new Date(faker.date.past()));
              const start = addHours(date, 9);
              const end = addHours(date, 18);
              const unproductiveTime = {
                hours: faker.random.number(7),
                minutes: faker.random.number(59),
              };

              return new TimeEntry({
                id: faker.random.uuid(),
                start,
                end,
                unproductiveTime,
              });
            }),
          });
        });

        localStorage.setItem('users', JSON.stringify(users));
      } else {
        users = JSON.parse(usersRaw).map((u: any) => new User({
          id: u.id,
          name: u.name,
          active: u.active,
          times: u.times.map((t: any) => new TimeEntry({
            id: t.id,
            start: new Date(t.start),
            end: new Date(t.end),
            unproductiveTime: t.unproductiveTime,
          }))
        }));
      }

      dispatch({
        type: getUserTypes.GET_USERS_SUCCESS,
        data: {
          isLoading: false,
          users,
        },
      });
    }, 3000)
  }
}
