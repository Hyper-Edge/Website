import { createContext, ReactNode, useEffect, useReducer } from 'react';
import Reducer from './Reducer';

const INITIAL_STATE = {
  user: {},
  isFetching: false,
  error: false,
};

export const Context = createContext<any>(INITIAL_STATE);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  //update initial state
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('loginData') || '{}') || null;
    if (user) dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  }, []);
  useEffect(() => {
    localStorage.setItem('loginData', JSON.stringify(state.user));
  }, [state.user]);
  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
