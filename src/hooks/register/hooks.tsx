import React from 'react';

import { reducer } from './index';
import type { RegisterState } from './types';
import {
  initialState,
  REDUCER_ACTION_TYPES,
} from './types';

export const useRegisterReducer = (): {
  state: RegisterState;
  handleCheckboxPress: () => void;
  handlePhoneNumberChange: (text: string) => void;
  handlePasswordChange: (text: string) => void;
  setPhoneServerError: (errorText: string) => void;
} => {
  const [state, dispatch] = React.useReducer(
    reducer,
    initialState,
  );

  const handleCheckboxPress = React.useCallback(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.CHECKBOX_TOGGLE,
    });
  }, [state]);
  const handlePhoneNumberChange = React.useCallback(
    (text: string) => {
      dispatch({
        type: REDUCER_ACTION_TYPES.PHONE_NUMBER_CHANGE,
        payload: text,
      });
    },
    [state],
  );
  const handlePasswordChange = React.useCallback(
    (text: string) => {
      dispatch({
        type: REDUCER_ACTION_TYPES.PASSWORD_CHANGE,
        payload: text,
      });
    },
    [state],
  );
  const setPhoneServerError = React.useCallback(
    (errorText: string) => {
      dispatch({
        type: REDUCER_ACTION_TYPES.SET_PHONE_SERVER_ERROR,
        payload: errorText,
      });
    },
    [state],
  );

  return {
    state,
    handleCheckboxPress,
    handlePhoneNumberChange,
    handlePasswordChange,
    setPhoneServerError,
  };
};
