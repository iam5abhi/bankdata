import React, { useState, useEffect, useRef } from "react";
import "./getAccountDetails.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useParams, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import configUrl from "../../config/BaseUrl";
import NavBar from "../../Componet/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const GetAccountDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bankdata, setbankdata] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const DespositAmount = (accountnumber) => {
    navigate(`/desposit/${accountnumber}`, { replace: true });
  };

  const withdrawalamount = (accountnumber) => {
    navigate(`/withdrawal/${accountnumber}`, { replace: true });
  };

  const EditAccout = (accountnumber) => {
    navigate(`/edit/account/${accountnumber}`, { replace: true });
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${configUrl.ApiUrl}/check/accountdeatils/${id * 1}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        setbankdata(data.account);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const EditTansaction = (transactionId, accountnumber) => {
    alert(accountnumber);
  };

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

  return (
    <>
    <NavBar/>
      <Button
        variant="contained"
        onClick={() => {
          DespositAmount(bankdata.AccountNumber);
        }}
      >
        Deposit amt.
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          withdrawalamount(bankdata.AccountNumber);
        }}
      >
        Withdrawal amt.
      </Button>

      <Button
        variant="contained"
        color="success"
        style={{ "margin-left": "1300px" }}
        onClick={handlePrint}
      >
        Print
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          EditAccout(bankdata.AccountNumber);
        }}
      >
        Edit
      </Button>
      <br />
      <br />
      <div ref={componentRef}>
        <div>
          <div className="container">
            <img
              src="https://akm-img-a-in.tosshub.com/businesstoday/images/story/202107/axis-.png?size=948:533"
              style={{ width: 200, position: "relative", left: 450 }}
            />
          </div>
          <div className="container-fluid">
            <div className="row" style={{ display: "flex" }}>
              <div className="column" style={{ float: "left", width: "100%" }}>
                <ul
                  style={{
                    listStyleType: "none",
                    textAlign: "left",
                    position: "relative",
                    right: 20,
                  }}
                >
                  <li>
                    <b>M/S AS SOOD</b>
                  </li>
                  <li>Joint holder:-</li>
                  <li>20,Kundrapura</li>
                  <li>Delhi</li>
                </ul>
              </div>
            </div>
            <div className="container-fluid">
              <div className="1" style={{ display: "flex" }}>
                <div className="1" style={{ float: "left", width: "50%" }}>
                  <ul
                    style={{
                      listStyleType: "none",
                      textAlign: "left",
                      position: "relative",
                      right: 30,
                    }}
                  >
                    <li>{bankdata.name}</li>
                    <li>{bankdata.Address}</li>
                    <li>
                      <b>IFSC:</b>
                      {bankdata.IFSC}
                    </li>
                    <li>
                      <b>AccountNumber:</b>
                      {bankdata.AccountNumber}
                    </li>
                  </ul>
                </div>
                <div className="1" style={{ float: "right", width: "50%" }}>
                  <ul
                    className="1"
                    style={{ listStyleType: "none", textAlign: "right" }}
                  >
                    <li>Customer no. :{bankdata.Customer_Number}</li>
                    <li>Scheme:*********</li>
                    <li>Pin:*********</li>
                  </ul>
                </div>
              </div>
            </div>
            <br />
            <div className="container-fluid">
              <div className="row" style={{ textAlign: "center" }}>
                <b>Statement of Account No :{bankdata.AccountNumber}</b>
              </div>
            </div>
          </div>
        </div>

        <br></br>
  
        <div class="container-fluid">
          <table className="table" style={{ border: "1px solid black" }}>
              <thead style={{ border: "1px solid black" }}>
                <tr style={{ border: "1px solid black" }} >
                  <th style={{ border: "1px solid black" }} scope="col">Tran Date</th>
                  <th style={{ border: "1px solid black" }} scope="col">Chq No.</th>
                  <th style={{ border: "1px solid black" }} scope="col">Particulars</th>
                  <th style={{ border: "1px solid black" }} scope="col">Debit</th>
                  <th  style={{ border: "1px solid black" }} scope="col">credit</th>
                  <th  style={{ border: "1px solid black" }} scope="col">Balance</th>
                  <th  style={{ border: "1px solid black" }} scope="col">Init. Br</th>
              </tr>
              <tr style={{ border: "1px solid black" }} >
                <th style={{ border: "1px solid black" }} colspan="2"></th>
                <th style={{ border: "1px solid black" }} colspan="3">Opening Balance</th>
                <th style={{ border: "1px solid black" }} scope="col">{bankdata.BankTransactionHistory.transctionHistory[0].DepositAmount}</th>
                <th  style={{ border: "1px solid black" }} scope="col"></th>
              </tr>
            </thead>
            <tbody>
                 {   
                    bankdata.BankTransactionHistory.transctionHistory.map((row) =>{
                         return(
                          <tr style={{ border: "1px solid black" }} key={row._id}>
            
                              <td style={{ border: "1px solid black" }}>{row.Date}</td>
                              <td style={{ border: "1px solid black" }}>{row.ChequeNumber}</td>
                              <td style={{ border: "1px solid black" }}>{row.Description}</td>
                              <td style={{ border: "1px solid black" }}>{row.DepositAmount}</td>
                              <td style={{ border: "1px solid black" }}>{row.WithdrawalAmoun}</td>
                              <td style={{ border: "1px solid black" }}>{row.Blance}</td>
                              <td style={{ border: "1px solid black" }}>4287</td>
                         
                        </tr>
                         )
                    })
                 }
            </tbody>
          </table>  
        </div>
      </div>
    </>
  );
};

export default GetAccountDetails;
