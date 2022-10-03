import React, { createContext, useState } from 'react';

const GithubContext = createContext();

const REACT_URL = process.env.REACT_APP_GITHUB_URL;
const REACT_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

      // API functions
      const fetchUsers = async () => {
        const response = await fetch(`${REACT_URL}/users`, {
            headers: {
                Authorization: `token ${REACT_TOKEN}`
            }
        });
        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
    }


    return(
        <GithubContext.Provider value={{
            users, isLoading, fetchUsers
        }}>
            { children }
        </GithubContext.Provider>
    )
}

export default GithubContext;
