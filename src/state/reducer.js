import * as actionTypes from './actionTypes';

const initialState = {
  location: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        location: action.location,
      };

    default:
      return state;
  }
}

export default reducer;
