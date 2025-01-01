import React, { createContext, useReducer, useContext } from "react";

const initialState = {
    companies: [],
    communicationMethods: [],
    notifications: [],
}

const actionTypes = {
    SET_COMPANIES: "SET_COMPANIES",
    ADD_COMPANY: "ADD_COMPANY",
    UPDATE_COMPANY: "UPDATE_COMPANY",
    DELETE_COMPANY: "DELETE_COMPANY",
    SET_COMMUNICATION_METHODS: "SET_COMMUNICATION_METHODS",
    ADD_NOTIFICATION: "ADD_NOTIFICATION",
    REMOVE_NOTIFICATION: "REMOVE_NOTIFICATION",
};

const appReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_COMPANIES:
            return { ...state, companies: action.payload };
        case actionTypes.ADD_COMPANY:
            return { ...state, companies: [...state.companies, action.payload] };
        case actionTypes.UPDATE_COMPANY:
            return {
                ...state,
                companies: state.companies.map((company) => company.id === action.payload.id ? action.payload : company),
            };
        case actionTypes.DELETE_COMPANY:
            return {
                ...state,
                companies: state.companies.filter(
                    (company) => company.id !== action.payload
                ),
            };
        case actionTypes.SET_COMMUNICATION_METHODS:
            return { ...state, communicationMethods: action.payload };
        case actionTypes.ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
            };
        case actionTypes.REMOVE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification) => notification.id !== action.payload
                ),
            };
        default:
            return state;
    }
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }

    return context;
}

export const actions = actionTypes;