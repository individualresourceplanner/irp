import * as actionTypes from './actionTypes';

const initialState = {
  location: {
    latitude: 52.3918567,
    longitude: 13.1239394,
  },
  resources: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        location: action.location,
      };

    case actionTypes.SET_RESOURCES:
      return {
        ...state,
        resources: action.resources,
      };

    default:
      return state;
  }
}

export default reducer;
