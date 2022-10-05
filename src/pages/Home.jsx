import React from 'react';

// Components
import UserResults from '../components/users/UserResults';
import UserSearch from '../components/users/UserSearch';

const Home = () => {
    return(
        <div>
            <UserSearch />
            <UserResults />
        </div>
    )
}

export default Home;