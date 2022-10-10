import React, { createContext, useState, useReducer } from 'react';
import githubReducer from './GithubReducer';

// Context
const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        isLoading: false
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);


    return(
        <GithubContext.Provider value={{
            ...state, 
            dispatch,
        }}>
            { children }
        </GithubContext.Provider>
    )
}

export default GithubContext;
