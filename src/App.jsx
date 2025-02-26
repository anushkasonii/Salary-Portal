import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
  Container,
} from "@mui/material";
import AdminDashboard from "./components/AdminDashboard";
import StaffSalary from "./components/StaffSalary";
import StaffPortal from "./components/StaffPortal";
import ViewAll from "./components/ViewAll";

function NavigationBar() {
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (location.pathname === "/") setSelectedTab(0);
    else if (location.pathname === "/staff-salary") setSelectedTab(1);
    else if (location.pathname === "/staff-portal") setSelectedTab(2);
    else if (location.pathname === "/view-all") setSelectedTab(3);
  }, [location]);

  return (
    <AppBar position="static" sx={{ bgcolor: "#53389e0f", boxShadow: 0 }}>
      <Toolbar>
        
        <Box sx={{ flexGrow: 1 }}>
          <Tabs
            value={selectedTab}
            onChange={(e, newValue) => setSelectedTab(newValue)}
            sx={{
              ml: 2,
              "& .MuiTabs-indicator": { backgroundColor: "#53389E" },
            }}
          >
            <Tab
              label="Admin"
              component={Link}
              to="/"
              sx={{
                fontSize:'15px',
                color: "#53389E",
                fontWeight: "500",
                "&.Mui-selected": { color: "#53389E", fontWeight: "bold" },
              }}
            />
            <Tab
              label="Staff Salary"
              component={Link}
              to="/staff-salary"
              sx={{
                fontSize:'15px',
                color: "#53389E",
                fontWeight: "500",
                "&.Mui-selected": { color: "#53389E", fontWeight: "bold" },
              }}
            />
            <Tab
              label="Staff Portal"
              component={Link}
              to="/staff-portal"
              sx={{
                fontSize:'15px',
                color: "#53389E",
                fontWeight: "500",
                "&.Mui-selected": { color: "#53389E", fontWeight: "bold" },
              }}
            />
            
          </Tabs>
         
        </Box>
        <Typography variant="h6" sx={{ color: "#53389E", fontWeight: "bold" }}>
          KidzShala
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  const [staffData, setStaffData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    if (staffData.length > 0) {
      const currentStaffIds = new Set(staffData.map((staff) => staff.id));
      const existingAttendance = attendanceData.filter((a) =>
        currentStaffIds.has(a.id)
      );
      const newStaffIds = staffData.filter(
        (staff) => !attendanceData.some((a) => a.id === staff.id)
      );

      const newAttendanceData = [
        ...existingAttendance,
        ...newStaffIds.map((staff) => ({
          id: staff.id,
          presentDays: Math.floor(Math.random() * (24 - 20 + 1)) + 20,
          salaryProcessed: false,
        })),
      ];

      setAttendanceData(newAttendanceData);
    }
  }, [staffData]);

  return (
    <Router>
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <NavigationBar />
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route
              path="/"
              element={
                <AdminDashboard
                  staffData={staffData}
                  setStaffData={setStaffData}
                />
              }
            />
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
            <Route
              path="/staff-portal"
              element={
                <StaffPortal />
              }
            />
            <Route
              path="/view-all"
              element={
                <ViewAll />
              }
            />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;