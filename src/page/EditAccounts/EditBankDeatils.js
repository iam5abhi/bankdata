import React,{ useState, useEffect } from "react";
import { useParams,useNavigate} from "react-router-dom";
import axios from "axios";
import configUrl from "../../config/BaseUrl";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../../Componet/Navbar";


const EditBankDeatils =()=>{
    const {id} =useParams()
    const navigate = useNavigate();
    const [updatedBankData, setupdatedBankData] = useState({
        name: "",
        Address: "",
        AccountNumber: "",
        IFSC: "",
        Branch_MICR_Code: "",
        Branch_GSTIN: "",
        Customer_Number: "",
        ProductType:""
      });

   

      const inputHandler =(event)=>{
        setupdatedBankData((preState)=>({
             ...preState,
             [event.target.name]:event.target.value
        }))
      }


      const submitdata =(event)=>{
                event.preventDefault();
                console.warn(updatedBankData);
                axios
                .patch(`${configUrl.ApiUrl}/edit/accountnumber/${id}`, updatedBankData)
                .then((res) => {
                    toast.success("account added sucssfully");
                    navigate("/userlist");
                })
                .catch((err) => {
                    toast.error("not added  fails");
                });
      }
    
    useEffect(() => {
        axios
          .get(`${configUrl.ApiUrl}/check/accountdeatils/${id}`)
          .then((res) => {
            console.log(res.data.account);
            setupdatedBankData({
                name: res.data.account.name,
                Address: res.data.account.Address,
                AccountNumber: res.data.account.AccountNumber,
                IFSC: res.data.account.IFSC,
                Branch_MICR_Code: res.data.account.Branch_MICR_Code,
                Branch_GSTIN: res.data.account.Branch_MICR_Code,
                Customer_Number: res.data.account.Customer_Number,
                ProductType:res.data.account.ProductType
            })
          })
          .catch((error) => {
            alert(error.message);
          });
      }, [id]);

      console.log("iam ",updatedBankData)

    return(
        <>
         <NavBar/>
     
        <div className="row">
      <div className="container">
        <form onSubmit={submitdata}>
          <label for="fname"> Name</label>
          <input
            type="text"
            id="fname"
            name="name"
            defaultValue={updatedBankData.name}
            onChange={(event) => {
              inputHandler(event);
            }}
            placeholder="Enter your name"
          />

          <label for="adr"> Address</label>
          <input
            type="text"
            id="adr"
            name="Address"
            defaultValue={updatedBankData.Address}
            onChange={(event) => {
              inputHandler(event);
            }}
            placeholder="Enter your address"
          />

          <label for="accnum">Account number</label>
          <input
            type="text"
            id="accnum"
            name="AccountNumber"
            defaultValue={updatedBankData.AccountNumber}
            readOnly
            onChange={(event) => {
              inputHandler(event);
            }}
            placeholder="1111-2222-3333-4444"
          />

          <label for="ifsc">IFSC code</label>
          <input
            type="text"
            id="ifsc"
            name="IFSC"
            defaultValue={updatedBankData.IFSC}
            onChange={(event) => {
              inputHandler(event);
            }}
            placeholder="Enter IFSC"
          />

          <label for="bmicr">Branch MICR code</label>
          <input
            type="text"
            id="bmicr"
            name="Branch_MICR_Code"
            defaultValue={updatedBankData.Branch_MICR_Code}
            onChange={(event) => {
              inputHandler(event);
            }}
            placeholder="Enter Branch MICR"
          />

          <label for="bgstin">Branch GSTIN</label>
          <input
            type="text"
            id="bgstin"
            name="Branch_GSTIN"
            defaultValue={updatedBankData.Branch_GSTIN}
            onChange={(event) => {
              inputHandler(event);
            }}
            placeholder="Enter Branch GSTIN"
          />

          <label for="customernum">Customer number</label>
          <input
            type="text"
            id="customernum"
            name="Customer_Number"
            defaultValue={updatedBankData.Customer_Number}
            onChange={(event) => {
              inputHandler(event);
            }}
            placeholder="Enter customer number"
          />

          <label for="ptype"> Product Type</label>
          <input
            type="text"
            id="ptype"
            name="ProductType"
            value={updatedBankData.ProductType}
            onChange={(event) => {
              inputHandler(event);
            }}
            placeholder="Product Type"
          />

          <Button type="submit" variant="contained">
              update Account
          </Button>
        </form>
      </div>
      <ToastContainer />
    </div>
    </>
    )
}



export default EditBankDeatils