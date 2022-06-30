import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import configUrl from "../../config/BaseUrl";
import NavBar from "../../Componet/Navbar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UserList() {
  const navigate = useNavigate();
  const [accontdetails, setAccountDetails] = useState()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchUser = async () => {
    try {
      const response = await fetch(`${configUrl.ApiUrl}/getAllBankUser`, {
        credentials: "include",
      });
      const data = await response.json();
      setAccountDetails(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  },[]);


  if (loading) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  if (error) {
    return <p>There was an error loading your data!</p>;
  }
  const getAccountDetails = (accountnumber) => {
    navigate(`/statement/${accountnumber}`);
  };

  const copyAccountdetail = (accountnumber) => {
    axios.get(
      `${configUrl.ApiUrl}/copy/accountnumber/alldata/${accountnumber}`
    );
  };

  return (
    <>
      <NavBar/>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sr.no.</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Account number</StyledTableCell>
              <StyledTableCell align="right">Show</StyledTableCell>
              <StyledTableCell align="right">copydata</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accontdetails.map((row, id) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {id + 1}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.AccountNumber}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => getAccountDetails(row.AccountNumber)}
                  >
                    <i className="far fa-eye" />
                  </button>
                </StyledTableCell>

                <StyledTableCell align="right">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => copyAccountdetail(row.AccountNumber)}
                  >
                    <i className="far fa-copy" />
                  </button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
