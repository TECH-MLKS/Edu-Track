import React, { useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from '@mui/material';
import { School, Person, Visibility } from '@mui/icons-material';

const classes = [
    { id: 1, name: 'Class 1' },
    { id: 2, name: 'Class 2' },
    { id: 3, name: 'Class 3' },
    { id: 4, name: 'Class 4' },
    { id: 5, name: 'Class 5' },
    { id: 6, name: 'Class 6' },
    { id: 7, name: 'Class 7' },
    { id: 8, name: 'Class 8' },
    { id: 9, name: 'Class 9' },
    { id: 10, name: 'Class 10' },
];

// Sample data for students (replace with your dynamic data source)
const studentsData = {
    1: [{ id: 101, name: 'John Doe' }, { id: 102, name: 'Jane Smith' }],
    2: [{ id: 103, name: 'Alice Johnson' }],
    // Add similar structure for other classes
};

function ReportCardManagement() {
    const [selectedClass, setSelectedClass] = useState(null);
    const [students, setStudents] = useState([]);
    const [openReportCard, setOpenReportCard] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleClassClick = (classId) => {
        setSelectedClass(classId);
        setStudents(studentsData[classId] || []);
    };

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
        setOpenReportCard(true);
    };

    const handleCloseReportCard = () => {
        setOpenReportCard(false);
        setSelectedStudent(null);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Report Card Management
            </Typography>
            <Grid container spacing={3}>
                {/* Class List */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Classes
                            </Typography>
                            <List>
                                {classes.map((cls) => (
                                    <ListItem
                                        button
                                        key={cls.id}
                                        onClick={() => handleClassClick(cls.id)}
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                            },
                                        }}
                                    >
                                        <ListItemIcon>
                                            <School />
                                        </ListItemIcon>
                                        <ListItemText primary={cls.name} />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Student List */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Students in {selectedClass ? `Class ${selectedClass}` : 'Class'}
                            </Typography>
                            {students.length > 0 ? (
                                <List>
                                    {students.map((student) => (
                                        <ListItem
                                            button
                                            key={student.id}
                                            onClick={() => handleStudentClick(student)}
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#f5f5f5',
                                                },
                                            }}
                                        >
                                            <ListItemIcon>
                                                <Person />
                                            </ListItemIcon>
                                            <ListItemText primary={student.name} />
                                            <IconButton
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStudentClick(student);
                                                }}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        </ListItem>
                                    ))}
                                </List>
                            ) : (
                                <Typography>No students available</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Actions Section */}
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Actions
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={!selectedClass}
                                sx={{ marginBottom: 2 }}
                            >
                                Add Student
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                fullWidth
                                disabled={!selectedClass}
                            >
                                Generate Report Cards
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Report Card Dialog */}
            <Dialog open={openReportCard} onClose={handleCloseReportCard} fullWidth maxWidth="sm">
                <DialogTitle>
                    Report Card for {selectedStudent?.name || 'Student'}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body1" gutterBottom>
                        Here, you can display the detailed report card information for{' '}
                        {selectedStudent?.name}.
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Remarks"
                        placeholder="Add remarks or grades for the student"
                        sx={{ marginTop: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseReportCard} color="primary">
                        Close
                    </Button>
                    <Button variant="contained" color="secondary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ReportCardManagement;
