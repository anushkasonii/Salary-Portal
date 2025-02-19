import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

function AdminDashboard({ staffData, setStaffData }) {
  const [newStaff, setNewStaff] = useState({
    name: "",
    yearlySalary: "",
    monthlySalary: "",
    leavesAllowed: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "yearlySalary") {
      setNewStaff({
        ...newStaff,
        yearlySalary: value,
        monthlySalary: (parseFloat(value) / 12).toFixed(2),
      });
    } else {
      setNewStaff({
        ...newStaff,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newStaff.name && newStaff.yearlySalary) {
      setStaffData([...staffData, { ...newStaff, id: Date.now() }]);
      setNewStaff({
        name: "",
        yearlySalary: "",
        monthlySalary: "",
        leavesAllowed: 0,
      });
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            }}
          >
            <TextField
              label="Staff Name"
              name="name"
              value={newStaff.name}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="Salary (Yearly)"
              name="yearlySalary"
              type="number"
              value={newStaff.yearlySalary}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="Salary (Monthly)"
              value={newStaff.monthlySalary}
              disabled
              fullWidth
            />
           
            <FormControl fullWidth>
              <InputLabel id="leaves-allowed-label">
                Leaves Allowed (Monthly)
              </InputLabel>
              <Select
                labelId="leaves-allowed-label"
                name="leavesAllowed"
                id= "leaves-allowed-monthly"
                value={newStaff.leavesAllowed}
                label= "Leaves Allowed (Monthly)"
                onChange={handleInputChange}
              >
                {[...Array(32)].map((_, i) => (
                  <MenuItem key={i} value={i}>
                    {i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="outlined"
            type="submit"
            sx={{
              borderRadius: "20px",
              marginBottom: "15px",
              marginRight: "20px",
              marginTop: "15px",
              borderColor: "#1FB892",
              color: "#1FB892",
              fontSize: "16px",
              backgroundColor: "white",
              width: "130px",
              alignItems: "center",
              "&:hover": {
                borderColor: "#1FB892",
                backgroundColor: "#1FB892",
                color: "white",
              },
            }}
          >
            Add Staff
          </Button>
        </form>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Staff Name</TableCell>
              <TableCell>Yearly Salary</TableCell>
              <TableCell>Monthly Salary</TableCell>
              <TableCell>Leaves Allowed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffData.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.yearlySalary}</TableCell>
                <TableCell>{staff.monthlySalary}</TableCell>
                <TableCell>{staff.leavesAllowed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminDashboard;
