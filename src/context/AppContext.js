import React, { createContext, useReducer, useEffect } from "react";
import companiesData from "../mockData/companies.json";
import methodsData from "../mockData/methods.json";
import interactionsData from "../mockData/interactions.json";

const initialState = {
    companies: [],
    communicationMethods: [],
    interactions: [],
    notifications: { overdue: [], dueToday: [] },
};

export const actionTypes = {
    SET_COMPANIES: "SET_COMPANIES",
    SET_COMMUNICATION_METHODS: "SET_COMMUNICATION_METHODS",
    SET_INTERACTIONS: "SET_INTERACTIONS",
    ADD_INTERACTION: "ADD_INTERACTION",
    SET_NOTIFICATIONS: "SET_NOTIFICATIONS",
    RESET_HIGHLIGHTS: "RESET_HIGHLIGHTS",
    UPDATE_COMPANY: "UPDATE_COMPANY",
    DELETE_COMPANY: "DELETE_COMPANY",
    UPDATE_COMMUNICATION_METHOD: "UPDATE_COMMUNICATION_METHOD",
    DELETE_COMMUNICATION_METHOD: "DELETE_COMMUNICATION_METHOD",
    ADD_COMMUNICATION_METHOD: "ADD_COMMUNICATION_METHOD",
    UPDATE_INTERACTION: "UPDATE_INTERACTION",
    DELETE_INTERACTION: "DELETE_INTERACTION",
};

const appReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_COMPANIES:
            return { ...state, companies: action.payload };

        case actionTypes.SET_COMMUNICATION_METHODS:
            return { ...state, communicationMethods: action.payload };

        case actionTypes.SET_INTERACTIONS:
            return { ...state, interactions: action.payload };

        case actionTypes.ADD_INTERACTION:
            return {
                ...state,
                interactions: [...state.interactions, action.payload],
            };

        case actionTypes.SET_NOTIFICATIONS:
            return { ...state, notifications: action.payload };

        case actionTypes.RESET_HIGHLIGHTS:
            const updatedCompanies = state.companies.map((company) => {
                if (action.payload.includes(company.id)) {
                    return { ...company, highlight: "" };
                }
                return company;
            });
            return { ...state, companies: updatedCompanies };

        case actionTypes.UPDATE_COMPANY:
            const updatedCompanyList = state.companies.map((company) => {
                if (company.id === action.payload.id) {
                    return { ...company, highlight: "", ...action.payload.updates };
                }
                return company;
            });
            return { ...state, companies: updatedCompanyList };

        case actionTypes.DELETE_COMPANY:
            const filteredCompanies = state.companies.filter(
                (company) => company.id !== action.payload
            );
            return { ...state, companies: filteredCompanies };

        case actionTypes.UPDATE_COMMUNICATION_METHOD:
            const updatedMethodList = state.communicationMethods.map((method) => {
                if (method.id === action.payload.id) {
                    return { ...method, ...action.payload };
                }
                return method;
            });
            return { ...state, communicationMethods: updatedMethodList };

        case actionTypes.DELETE_COMMUNICATION_METHOD:
            const filteredMethods = state.communicationMethods.filter(
                (method) => method.id !== action.payload
            );
            return { ...state, communicationMethods: filteredMethods };

        case actionTypes.ADD_COMMUNICATION_METHOD:
            return {
                ...state,
                communicationMethods: [
                    ...state.communicationMethods,
                    action.payload,
                ],
            };

        case actionTypes.UPDATE_INTERACTION:
            const updatedInteractionList = state.interactions.map((interaction) => {
                if (interaction.id === action.payload.id) {
                    return { ...interaction, ...action.payload.updates };
                }
                return interaction;
            });
            return { ...state, interactions: updatedInteractionList };

        case actionTypes.DELETE_INTERACTION:
            const filteredInteractions = state.interactions.filter(
                (interaction) => interaction.id !== action.payload
            );
            return { ...state, interactions: filteredInteractions };

        default:
            return state;
    }
};

export const AppContext = createContext({
    state: initialState,
    dispatch: () => {
        throw new Error("Dispatch function not initialized. Ensure AppProvider wraps your component.");
    },
});

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    // Helper function to calculate periodicity from string (e.g., "Every 2 weeks")
    const getPeriodicityInDays = (periodicity) => {
        const match = periodicity.match(/Every (\d+) (day|week)s?/);
        if (match) {
            const value = parseInt(match[1]);
            if (match[2] === "week") {
                return value * 7;
            } else if (match[2] === "day") {
                return value;
            }
        }
        return 0;
    };

    useEffect(() => {
        const loadMockData = async () => {
            try {
                if (Array.isArray(companiesData)) {
                    dispatch({ type: actionTypes.SET_COMPANIES, payload: companiesData });
                } else {
                    console.warn("Companies data is not an array:", companiesData);
                }

                if (Array.isArray(methodsData)) {
                    dispatch({
                        type: actionTypes.SET_COMMUNICATION_METHODS,
                        payload: methodsData,
                    });
                } else {
                    console.warn("Methods data is not an array:", methodsData);
                }

                if (Array.isArray(interactionsData)) {
                    dispatch({ type: actionTypes.SET_INTERACTIONS, payload: interactionsData });
                } else {
                    console.warn("Interactions data is not an array:", interactionsData);
                }
            } catch (error) {
                console.error("Error loading mock data:", error);
            }
        };

        loadMockData();
    }, []);

    useEffect(() => {
        const calculateNotifications = () => {
            const now = new Date();
            const overdue = [];
            const dueToday = [];

            state.companies.forEach((company) => {
                const lastInteraction = state.interactions
                    .filter((interaction) => interaction.companyId === company.id)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

                const nextCommunicationDate = lastInteraction
                    ? new Date(lastInteraction.date)
                    : new Date();

                const periodicityDays = getPeriodicityInDays(company.communicationPeriodicity);
                nextCommunicationDate.setDate(nextCommunicationDate.getDate() + periodicityDays);

                if (nextCommunicationDate < now) {
                    overdue.push(company);
                } else if (nextCommunicationDate.toDateString() === now.toDateString()) {
                    dueToday.push(company);
                }
            });

            dispatch({
                type: actionTypes.SET_NOTIFICATIONS,
                payload: { overdue, dueToday },
            });
        };

        if (state.companies.length && state.interactions.length) {
            calculateNotifications();
        }
    }, [state.companies, state.interactions]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};
