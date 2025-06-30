import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthPage from './components/AuthPage';
import UserProfile from './components/UserProfile';

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;