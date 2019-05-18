import * as actionTypes from './actionTypes';

const initialState = {
    location: {
        latitude: 52.3918567,
        longitude: 13.1239394,
    },
    resources: [{
        id:1337,
        title:'free aples',
        tags:["organice"],
        price:77,
        geo:[22.0,13.0]
    }],
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
