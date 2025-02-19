import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Button, Box,  } from '@mui/material';
import AdminDashboard from './components/AdminDashboard';
import StaffSalary from './components/StaffSalary';

function App() {
  const [staffData, setStaffData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  // Initialize or update attendance data whenever staff data changes
  useEffect(() => {
    if (staffData.length > 0) {
      const currentStaffIds = new Set(staffData.map(staff => staff.id));
      const existingAttendance = attendanceData.filter(a => currentStaffIds.has(a.id));
      const newStaffIds = staffData.filter(staff => !attendanceData.some(a => a.id === staff.id));
      
      const newAttendanceData = [
        ...existingAttendance,
        ...newStaffIds.map(staff => ({
          id: staff.id,
          presentDays: Math.floor(Math.random() * (30 - 25 + 1)) + 25,
          salaryProcessed: false,
        }))
      ];
      
      setAttendanceData(newAttendanceData);
    }
  }, [staffData]);

  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor:"#53389e0f"}}>
          <Toolbar >
            
            <Button color="#53389E" component={Link} to="/">Admin</Button>
            <Button color="#53389E" component={Link} to="/staff-salary">Staff Salary</Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<AdminDashboard staffData={staffData} setStaffData={setStaffData} />} />
            <Route 
              path="/staff-salary" 
              element={
                <StaffSalary 
                  staffData={staffData} 
                  setStaffData={setStaffData}
                  attendanceData={attendanceData}
                  setAttendanceData={setAttendanceData}
                />
              } 
            />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}
 
export default App;