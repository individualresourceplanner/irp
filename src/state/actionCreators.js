//  import * as actions from './counter.actions';
import * as actionTypes from './actionTypes';

export function setLocation(location) {
  return { type: actionTypes.SET_LOCATION, location };
}

export function setResources(resources) {
  return { type: actionTypes.SET_RESOURCES, resources };
}

export function addLocation(location) {
  return { type: actionTypes.SET_LOCATION, location };
}

export function setAggregations(aggregations) {
  return { type: actionTypes.SET_AGGREGATIONS, aggregations };
}

export function addAggregation(aggregation) {
  return { type: actionTypes.ADD_AGGREGATION, aggregation };
}
