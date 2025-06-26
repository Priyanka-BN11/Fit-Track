import React from 'react';
import UserProfile from './components/UserProfile';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Fitness Tracker</h1>
            <UserProfile />
        </div>
    );
};

export default App;