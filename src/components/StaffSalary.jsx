import { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const months = [
  { name: 'January', workingDays: 27, holidays: 4 },
  { name: 'February', workingDays: 25, holidays: 3 },
  { name: 'March', workingDays: 27, holidays: 4 },
  { name: 'April', workingDays: 28, holidays: 2 },
];

function StaffSalary({ staffData, setStaffData, attendanceData, setAttendanceData }) {
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
    // Reset attendance data when month changes
    setAttendanceData(
      staffData.map(staff => ({
        id: staff.id,
        presentDays: Math.floor(Math.random() * (28 - 24 + 1)) + 24,
        salaryProcessed: false,
      }))
    );
  };

  const calculateLeaves = (presentDays, workingDays) => {
    return workingDays - presentDays;
  };

  const calculateExtraLeaves = (leaves, leavesAllowed) => {
    return Math.max(0, leaves - leavesAllowed);
  };

  const calculatePerDaySalary = (monthlySalary) => {
    return monthlySalary / 30;
  };

  const handleDeductClick = (staff, leaves, leavesAllowed) => {
    setSelectedStaff({
      ...staff,
      extraLeaves: calculateExtraLeaves(leaves, leavesAllowed),
    });
    setOpenDialog(true);
  };

  const handleKeepClick = (staff, leaves, leavesAllowed) => {
    const extraLeaves = calculateExtraLeaves(leaves, leavesAllowed);
    setAttendanceData(prevData =>
      prevData.map(attendance =>
        attendance.id === staff.id
          ? { 
              ...attendance, 
              salaryProcessed: true,
              deductionApplied: false,
              extraLeaves: extraLeaves
            }
          : attendance
      )
    );
  };

  const handleSalaryAction = (action) => {
    if (!selectedStaff) return;

    const perDaySalary = calculatePerDaySalary(parseFloat(selectedStaff.monthlySalary));
    const updatedStaffData = staffData.map(staff => {
      if (staff.id === selectedStaff.id) {
        let updatedSalary = parseFloat(selectedStaff.monthlySalary);
        if (action === 'deduct') {
          updatedSalary -= selectedStaff.extraLeaves * perDaySalary;
        }
        return {
          ...staff,
          monthlySalary: updatedSalary.toFixed(2),
        };
      }
      return staff;
    });

    setStaffData(updatedStaffData);
    setAttendanceData(prevData =>
      prevData.map(attendance =>
        attendance.id === selectedStaff.id
          ? { 
              ...attendance, 
              salaryProcessed: true,
              deductionApplied: action === 'deduct',
              extraLeaves: selectedStaff.extraLeaves
            }
          : attendance
      )
    );
    setOpenDialog(false);
    setSelectedStaff(null);
  };

  const currentMonth = months.find(m => m.name === selectedMonth);

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Staff Salary Dashboard
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Select
          value={selectedMonth}
          onChange={handleMonthChange}
          sx={{ minWidth: 200 }}
        >
          {months.map((month) => (
            <MenuItem key={month.name} value={month.name}>
              {month.name} 2025
            </MenuItem>
          ))}
        </Select>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Staff Name</TableCell>
              <TableCell>Total Working Days</TableCell>
              <TableCell>Holidays</TableCell>
              <TableCell>Total Days (Present)</TableCell>
              <TableCell>Leaves</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffData.map((staff) => {
              const attendance = attendanceData.find(a => a.id === staff.id) || { 
                presentDays: 0, 
                salaryProcessed: false 
              };
              const leaves = calculateLeaves(attendance.presentDays, currentMonth.workingDays);
              const extraLeaves = calculateExtraLeaves(leaves, staff.leavesAllowed);
              const showActions = extraLeaves > 0 && !attendance.salaryProcessed;

              return (
                <TableRow key={staff.id}>
                  <TableCell>{staff.name}</TableCell>
                  <TableCell>{currentMonth.workingDays}</TableCell>
                  <TableCell>{currentMonth.holidays}</TableCell>
                  <TableCell>{attendance.presentDays}</TableCell>
                  <TableCell>
                    {leaves}
                    {extraLeaves > 0 && (
                      <Typography
                        component="span"
                        sx={{
                          display: 'block',
                          color: 'error.main',
                          fontSize: '0.75rem',
                          mt: 0.5
                        }}
                      >
                        ({extraLeaves} extra {extraLeaves === 1 ? 'leave' : 'leaves'})
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>{staff.monthlySalary}</TableCell>
                  <TableCell>
                    {showActions ? (
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDeductClick(staff, leaves, staff.leavesAllowed)}
                        >
                          Deduct
                        </Button>
                        <Button
                          variant="contained"
                          color="success"
                          size="small"
                          onClick={() => handleKeepClick(staff, leaves, staff.leavesAllowed)}
                        >
                          Keep
                        </Button>
                      </Box>
                    ) : (
                      attendance.salaryProcessed && (
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            color: attendance.deductionApplied ? 'error.main' : 'text.primary'
                          }}
                        >
                          {attendance.deductionApplied 
                            ? `Salary for ${attendance.extraLeaves} ${attendance.extraLeaves === 1 ? 'day' : 'days'} deducted`
                            : `Salary for ${attendance.extraLeaves} ${attendance.extraLeaves === 1 ? 'day' : 'days'} not deducted`
                          }
                        </Typography>
                      )
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          Deduct {selectedStaff?.name}'s Salary
        </DialogTitle>
        <DialogContent>
          <Typography>
            Deduct salary for {selectedStaff?.extraLeaves} extra {selectedStaff?.extraLeaves === 1 ? 'day' : 'days'}?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Amount to be deducted: ₹{selectedStaff ? 
              (calculatePerDaySalary(parseFloat(selectedStaff.monthlySalary)) * selectedStaff.extraLeaves).toFixed(2) 
              : 0
            }
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={() => handleSalaryAction('deduct')} color="error" variant="contained">
            Deduct
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default StaffSalary;