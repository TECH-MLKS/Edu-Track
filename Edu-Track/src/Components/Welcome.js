import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { auth } from '../Firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './Header';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Button,
    IconButton,
    Tooltip,
} from '@mui/material';
import { CalendarToday, BarChart, Info } from '@mui/icons-material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Sample data for graph
const graphData = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 200 },
    { name: 'Thu', value: 278 },
    { name: 'Fri', value: 189 },
    { name: 'Sat', value: 239 },
    { name: 'Sun', value: 349 },
];

function Welcome() {
    const [userEmail, setUserEmail] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);

    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                window.location.replace('/Edu-Track'); // Redirect to login if not authenticated
            }
        });
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <Header /> {/* Include the header */}
            <Box
                sx={{
                    marginTop: '100px',
                    padding: 3,
                    backgroundColor: '#f5f7fa',
                    borderRadius: 2,
                }}
            >
                {/* Welcome Message */}
                <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: 4 }}>
                    Hello, {userEmail}
                </Typography>
                <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: 4 }}>
                    Welcome to your dashboard! Explore your activities below.
                </Typography>

                {/* Interactive Dashboard */}
                <Grid container spacing={3}>
                    {/* Graph Section */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                                    Weekly Performance
                                </Typography>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={graphData}>
                                        <CartesianGrid stroke="#ccc" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <RechartsTooltip />
                                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Calendar Section */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" sx={{ marginBottom: 2 }}>
                                    Calendar
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <StaticDatePicker
                                        displayStaticWrapperAs="desktop"
                                        value={selectedDate}
                                        onChange={(newValue) => setSelectedDate(newValue)}
                                    />
                                </LocalizationProvider>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Quick Actions */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        marginTop: 4,
                    }}
                >
                    <Card sx={{ width: '30%' }}>
                        <CardContent>
                            <Tooltip title="View Attendance" arrow>
                                <IconButton color="primary">
                                    <CalendarToday />
                                </IconButton>
                            </Tooltip>
                            <Typography variant="h6">Attendance</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => navigate('/attendance')} // Navigate to Attendance page
                            >
                                View
                            </Button>
                        </CardContent>
                    </Card>
                    <Card sx={{ width: '30%' }}>
                        <CardContent>
                            <Tooltip title="Check Report" arrow>
                                <IconButton color="secondary">
                                    <BarChart />
                                </IconButton>
                            </Tooltip>
                            <Typography variant="h6">Reports</Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                onClick={() => navigate('/report-card')} // Navigate to Reports page
                            >
                                Check
                            </Button>
                        </CardContent>
                    </Card>
                    <Card sx={{ width: '30%' }}>
                        <CardContent>
                            <Tooltip title="More Info" arrow>
                                <IconButton color="error">
                                    <Info />
                                </IconButton>
                            </Tooltip>
                            <Typography variant="h6">Info</Typography>
                            <Button
                                variant="contained"
                                color="error"
                                fullWidth
                                onClick={() => navigate('/info')} // Navigate to Info page
                            >
                                Learn More
                            </Button>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </div>
    );
}

export default Welcome;
