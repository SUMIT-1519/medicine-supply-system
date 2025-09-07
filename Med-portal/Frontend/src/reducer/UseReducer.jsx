import React from 'react';

const UserContext = React.createContext();

export const initialState = {
    isLoggedIn: false,
    medicalOwnerId: null
};

export const userReducer = (state, action) => {
    switch (action.type) {
        case "MEDICAL":
            return {
                ...state,
                isLoggedIn: action.payload.isLoggedIn,
                medicalOwnerId: action.payload.medicalOwnerId
            };
        default:
            return state;
    }
};