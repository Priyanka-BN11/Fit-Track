import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AuthPage from './components/AuthPage';
import UserProfile from './components/UserProfile';
import ProgressDashboard from './components/ProgressDashboard';

const App: React.FC = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/userprofile" element={<UserProfile user={{}} />} />
                <Route path="/progressdashboard" element={<ProgressDashboard />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;