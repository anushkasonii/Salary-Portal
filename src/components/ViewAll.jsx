import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from "@mui/material";
  import { useState } from "react";
  
  const months = [
    { name: "January", workingDays: 23, holidays: 4, weekend: 4 },
    { name: "February", workingDays: 21, holidays: 3, weekend: 4 },
    { name: "March", workingDays: 22, holidays: 4, weekend: 5 },
    { name: "April", workingDays: 24, holidays: 2, weekend: 4 },
    { name: "May", workingDays: 23, holidays: 4, weekend: 4 },
    { name: "June", workingDays: 22, holidays: 3, weekend: 5 },
    { name: "July", workingDays: 23, holidays: 4, weekend: 4 },
    { name: "August", workingDays: 23, holidays: 4, weekend: 4 },
    { name: "September", workingDays: 22, holidays: 3, weekend: 5 },
    { name: "October", workingDays: 23, holidays: 4, weekend: 4 },
    { name: "November", workingDays: 22, holidays: 3, weekend: 5 },
    { name: "December", workingDays: 23, holidays: 4, weekend: 4 },
  ];
  
  function ViewAll() {
    const [attendanceData] = useState(
      months.map((month) => ({
        month: month.name,
        presentDays: Math.floor(Math.random() * (month.workingDays - 20 + 1)) + 20,
        salaryProcessed: true,
      }))
    );
  
    const calculateLeaves = (presentDays, workingDays) => {
      return workingDays - presentDays;
    };
  
    const calculateExtraLeaves = (leaves, leavesAllowed) => {
      return Math.max(0, leaves - leavesAllowed);
    };
  
    const calculatePerDaySalary = (monthlySalary) => {
      return monthlySalary / 30;
    };
  
    const monthlySalary = 50000;
    const leavesAllowed = 2;
  
    return (
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: "#53389E" }}>
          View All Salaries
        </Typography>
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#1FB892" }}>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
                >
                  Month
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
                >
                  Total Working Days
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
                >
                  Weekend
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
                >
                  Holidays
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
                >
                  Total Days (Present)
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
                >
                  Leaves
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ color: "white", fontSize: "16px", fontWeight: "bold" }}
                >
                  Salary Credited
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendanceData.map((attendance, index) => {
                const month = months[index];
                const leaves = calculateLeaves(
                  attendance.presentDays,
                  month.workingDays
                );
                const extraLeaves = calculateExtraLeaves(leaves, leavesAllowed);
                const perDaySalary = calculatePerDaySalary(monthlySalary);
                const salaryCredited =
                  monthlySalary - extraLeaves * perDaySalary;
  
                return (
                  <TableRow key={attendance.month}>
                    <TableCell align="center">{attendance.month}</TableCell>
                    <TableCell align="center">{month.workingDays}</TableCell>
                    <TableCell align="center">{month.weekend}</TableCell>
                    <TableCell align="center">{month.holidays}</TableCell>
                    <TableCell align="center">{attendance.presentDays}</TableCell>
                    <TableCell align="center">
                      {leaves}
                      {extraLeaves > 0 && (
                        <Typography
                          component="span"
                          sx={{
                            display: "block",
                            color: "error.main",
                            fontSize: "0.75rem",
                            mt: 0.5,
                          }}
                        >
                          ({extraLeaves} extra{" "}
                          {extraLeaves === 1 ? "leave" : "leaves"})
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell align="center">{salaryCredited.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
  
  export default ViewAll;