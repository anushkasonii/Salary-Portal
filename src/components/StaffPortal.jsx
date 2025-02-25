import * as React from "react";
import { useState } from "react";
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
  TextField,
} from "@mui/material";

function StaffPortal() {
  const [formData, setFormData] = useState({
    month: "January",
    presentDays: 23,
    leaves: 1,
    salary: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Box sx={{ py: 4 }}>
      <div
        className="upper_left_box"
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "25px",
        }}
      >
        <div
          className="school-info"
          style={{
            width: "50%",
            border: "2px solid #cac7c7",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div style={{ backgroundColor: "#d0c8d4", borderRadius: "10px" }}>
            <h3
              style={{
                color: "#656565",
                padding: "10px",
                backgroundColor: "#d0c8d4",
                width: "96.5%",
                borderTopLeftRadius: 2,
                borderTopRightRadius: 4,
                marginTop: "0px",
                fontSize: "17px",
                fontWeight: "bold",
                font: "Poppins",
              }}
            >
              Staff Information
            </h3>
          </div>
          <div style={{ marginBottom: "15px" }}> </div>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "61.5ch",
                marginLeft: 3.5,
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Month"
                value={formData.month}
                InputProps={{
                  sx: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1FB892", // Border color when focused
                    },
                    "& .MuiInputBase-input": {
                      color: "#000000", // Default text color
                    },
                    "&.Mui-focused .MuiInputBase-input": {
                      color: "#000000", // Text color when focused
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#1FB892", // Label color when focused
                    },
                  },
                }}
                disabled
              />
            </div>
          </Box>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "61.5ch",
                marginLeft: 3.5,
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Total Days (Present)"
                value={formData.presentDays}
                InputProps={{
                  sx: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1FB892", // Border color when focused
                    },
                    "& .MuiInputBase-input": {
                      color: "#000000", // Default text color
                    },
                    "&.Mui-focused .MuiInputBase-input": {
                      color: "#000000", // Text color when focused
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#1FB892", // Label color when focused
                    },
                  },
                }}
                disabled
              />
            </div>
          </Box>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "61.5ch",
                marginLeft: 3.5,
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Leaves"
                value={formData.leaves}
                InputProps={{
                  sx: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1FB892", // Border color when focused
                    },
                    "& .MuiInputBase-input": {
                      color: "#000000", // Default text color
                    },
                    "&.Mui-focused .MuiInputBase-input": {
                      color: "#000000", // Text color when focused
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#1FB892", // Label color when focused
                    },
                  },
                }}
                disabled
              />
            </div>
          </Box>

          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                m: 1,
                width: "61.5ch",
                marginLeft: 3.5,
                marginBottom:3.5
              },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                InputProps={{
                  sx: {
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#1FB892", // Border color when focused
                    },
                    "& .MuiInputBase-input": {
                      color: "#000000", // Default text color
                    },
                    "&.Mui-focused .MuiInputBase-input": {
                      color: "#000000", // Text color when focused
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    "&.Mui-focused": {
                      color: "#1FB892", // Label color when focused
                    },
                  },
                }}
              />
            </div>
          </Box>
        </div>
      </div>
    </Box>
  );
}

export default StaffPortal;
