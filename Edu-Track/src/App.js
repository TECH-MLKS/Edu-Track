import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { auth } from './Firebase/Firebase';

import Sidebar from './Components/Sidebar';
import Welcome from './Components/Welcome';
import ProfileInfo from './Components/ProfileInfo';

import SchoolInfo from './Pages/SchoolInfo';
import FeePortal from './Pages/FeePortal';
import Attendance from './Pages/Attendance';
import ReportCard from './Pages/ReportCard';
import TimeTable from './Pages/TimeTable';
import Login from './Components/Login';

// Material-UI imports
import { CssBaseline, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// MUI Theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#282c34', // Replace with your preferred primary color
        },
        secondary: {
            main: '#61dafb', // Replace with your preferred secondary color
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif', // Replace with your preferred font
    },
});

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(60); // Default collapsed width

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsAuthenticated(user !== null);
        });
        return () => unsubscribe();
    }, []);

    const handleSidebarToggle = (isExpanded) => {
        setSidebarWidth(isExpanded ? 240 : 60); // Update width based on sidebar state
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Resets browser default styles */}
            <Router>
                <Box display="flex">
                    {isAuthenticated && (
                        <Box width={sidebarWidth}>
                            <Sidebar onToggle={handleSidebarToggle} />
                        </Box>
                    )}
                    <Box
                        className="main-content"
                        sx={{
                            ml: `${sidebarWidth}px`,
                            transition: 'margin 0.3s',
                            width: `calc(100% - ${sidebarWidth}px)`,
                        }}
                    >
                        <Routes>
                            <Route path="/Edu-Track" element={<Login />} />
                            <Route path="/welcome" element={<Welcome />} />
                            <Route path="/profileinfo" element={<ProfileInfo />} />
                            <Route path="/school-info" element={<SchoolInfo />} />
                            <Route path="/fee-portal" element={<FeePortal />} />
                            <Route path="/attendance" element={<Attendance />} />
                            <Route path="/report-card" element={<ReportCard />} />
                            <Route path="/time-table" element={<TimeTable />} />
                        </Routes>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
