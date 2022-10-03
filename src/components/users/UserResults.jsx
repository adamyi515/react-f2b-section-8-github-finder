import React, { useContext, useEffect } from 'react';

// Context
import GithubContext from '../../context/github/GithubContext'

// Components
import Spinner from '../layout/Spinner';
import UserItem from './UserItem';

const UserResults = () => {
    const { users, isLoading, fetchUsers } = useContext(GithubContext);

    useEffect(() => {
        fetchUsers();
    }, []);

    if(isLoading){
        return(
            <Spinner />
        )
    }

    return(
        <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
            {users.map((user) => <UserItem key={user.id} user={user} />)}
        </div>
    )
}

export default UserResults;