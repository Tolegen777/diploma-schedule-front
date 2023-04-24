import React, { createContext, useContext, useReducer } from 'react';

import { tokenService } from '../services/tokenService';

const initialState = {
  authUser: !!tokenService.getLocalAccessToken(),
  user: null,
};

const StateContext = createContext(undefined);

const stateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_AUTH_STATUS': {
      return {
        ...state,
        authUser: action.payload,
      }
    }
    case 'SET_USER_DATA': {
      return {
        ...state,
        user: action.payload,
      }
    }
    case 'SET_USER_PERMISSIONS': {
      return {
        ...state,
        permissions: action.payload,
      }
    }
    default: {
      throw new Error('Unhandled action type');
    }
  }
}

const StateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  const providerValue = { state, dispatch };

  return <StateContext.Provider value={providerValue}>{children}</StateContext.Provider>;
};

const useStateContext = () => {
  const context = useContext(StateContext)

  if (context) {
    return context;
  }

  throw new Error('useStateContext must be used within a StateContextProvider');
}

export { StateContextProvider, useStateContext };
