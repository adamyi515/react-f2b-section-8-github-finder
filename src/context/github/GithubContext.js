import React, { createContext, useState, useReducer } from 'react';
import githubReducer from './GithubReducer';

// Context
const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        isLoading: false
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // API functions /////////////////////////////////////////
    const searchUsers = async (text) => {
        setLoading();

        const params = new URLSearchParams({
            q: text
        });


        const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            }
        });

        const data = await response.json();

        dispatch({
            type: 'SEARCH_USERS',
            payload: data.items
        });

    }

    const getUser = async (login) => {
        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            }
        });

        if(response.status === 404){
            console.log('Not found.');
        } else {
            const data = await response.json();
            dispatch({
                type: 'GET_USER',
                payload: data
            });
        }
    }

    const getUserRepos = async (login) => {
        setLoading();

        const params = new URLSearchParams({
            sort: 'created',
            per_page: 10
        })

        const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            }
        });
        const data = await response.json();

        dispatch({
            type: 'GET_REPOS',
            payload: data
        });

    }

    const clearUsers = async () => {
        dispatch({
            type: 'CLEAR'
        })
    }

    const fetchUsers = async () => {
        setLoading();

        const response = await fetch(`${GITHUB_URL}/users`, {
            headers: {
                Authorization: `${GITHUB_TOKEN}`
            }
        });

        const data = await response.json();
        dispatch({
            type: 'GET_USERS',
            payload: data
        })
    }

    // Private methods /////////////////////////////////////////
    const setLoading = () => dispatch({ type: 'SET_LOADING' });


    return(
        <GithubContext.Provider value={{
            users: state.users, 
            user: state.user,
            repos: state.repos,
            isLoading: state.isLoading, 
            searchUsers,
            getUser,
            getUserRepos,
            clearUsers
        }}>
            { children }
        </GithubContext.Provider>
    )
}

export default GithubContext;
