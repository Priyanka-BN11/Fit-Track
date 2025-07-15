import React from 'react';
import { Route, Routes,useLocation} from 'react-router-dom';
import AuthPage from './components/AuthPage';
import UserProfile from './components/UserProfile';
import ProgressDashboard from './components/ProgressDashboard';
import LogActivity from './components/LogActivity';
import Navbar from './components/navbar';

const App: React.FC = () => {
    const location = useLocation();
 const hideNavbar = location.pathname === '/' || location.pathname === '/authpage';
    return (
        <div className="App">
             {!hideNavbar && <Navbar />}
            {/* <Navbar /> */}
                <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/authpage" element={<AuthPage />} /> {/* optional */}
                    <Route path="/userprofile" element={<UserProfile />} />
                    <Route path="/progressdashboard" element={<ProgressDashboard />} />
                    <Route path="/logactivity" element={<LogActivity />} />
                </Routes>
        
        </div>
    );
};

export default App;