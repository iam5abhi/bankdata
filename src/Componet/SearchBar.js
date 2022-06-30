import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./searchbar.css";
import NavBar from "./Navbar";

import configUrl from "../config/BaseUrl";

const SearchBar = () => {
  const navigate = useNavigate();
  const [AccountNumber, setAccountNumber] = useState("");
  const [accontdetails, setAccountDetails] = useState("");
  const [Viewform, setViewform] = useState(false);

  const SearchHandler = (event) => {
    event.preventDefault();
    axios
      .get(`${configUrl.ApiUrl}/check/accountdeatils/${AccountNumber}`)
      .then(async (res) => {
        setAccountDetails(res.data.account);
        setViewform(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getAccountDetails = (accountnumber) => {
    navigate(`/statement/${accountnumber}`);
  };

  console.log(accontdetails);
  return (
    <>
     <NavBar/>
      <div>
        {!Viewform ? (
          <form onSubmit={SearchHandler}>
            <div className="container">
              <div className="input-group">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search"
                  name="AccountNumber"
                  onChange={(event) => setAccountNumber(event.target.value)}
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
                <button
                  type="submit"
                  className="btn btn-outline-primary bg-dark"
                >
                  search
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-12">
                <table className="table table-bordered text-center bg-light">
                  <thead className="thead bg-dark text-white">
                    <tr>
                      <th scope="col">Sr.no.</th>
                      <th scope="col">name</th>
                      <th scope="col">Account number</th>
                      <th scope="col">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td scope="row">1</td>
                      <td scope="row">{accontdetails.name}</td>
                      <td scope="row">{accontdetails.AccountNumber}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() =>
                            getAccountDetails(accontdetails.AccountNumber)
                          }
                          className="btn btn-primary"
                        >
                          <i className="far fa-eye" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
