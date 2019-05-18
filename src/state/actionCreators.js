//  import * as actions from './counter.actions';
import * as actionTypes from './actionTypes';

export function setLocation(location) {
    return { type: actionTypes.SET_LOCATION, location };
  }