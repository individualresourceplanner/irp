import * as actionTypes from './actionTypes';

const initialState = {
  location: {},
  resources: [],
  aggregations: [],
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
    case actionTypes.ADD_AGGREGATION:
      return {
        ...state,
        aggregations: state.aggregations.push(action.aggregation)
      };
    case actionTypes.SET_AGGREGATIONS:
      return {
        ...state,
        aggregations: action.aggregations
      };

    default:
      return state;
  }
}

export default reducer;
