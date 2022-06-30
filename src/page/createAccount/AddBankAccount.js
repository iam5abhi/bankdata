import React,{useState,useEffect} from 'react'
import './add.css'
import Button from '@mui/material/Button';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configUrl from '../../config/BaseUrl';
import NavBar from '../../Componet/Navbar';
const AddBankAccount =()=>{
   const [addToBank, setAddToBank] = useState({name:'',Address:'',AccountNumber:'',IFSC:'',Branch_MICR_Code:'',Branch_GSTIN:'',Customer_Number:'',AccountOpenBlance:'',Date:'',EffectiveDate:'',Branch:'Branch',Description:'',DepositAmount:''})
   const inputHandler =(event)=>{
       const {name,value} =event.target
       setAddToBank((preSate)=>({
            ...preSate,
            [name]:value
       }))
    
   }

        const submitdata =(event)=>{
            event.preventDefault();
            axios.post(`${configUrl.ApiUrl}/`,addToBank)
            .then((res)=>{
                toast.success('account added sucssfully')
            }).catch(err=>{
                toast.error('not added  fails')
            })
        }
  console.log(addToBank)
    
   
    return(
        <>
       <NavBar/>
        <div className="row">
     <div className="container">
      <form onSubmit={submitdata}>    
            <label for="fname"> Name</label>
            <input type="text" id="fname" name="name" onChange={inputHandler} placeholder="Enter your name"/>

            <label for="adr"> Address</label>
            <input type="text" id="adr" name="Address" onChange={inputHandler} placeholder="Enter your address"/>

            <label for="accnum">Account number</label>
            <input type="text" id="accnum" name="AccountNumber" onChange={inputHandler} placeholder="1111-2222-3333-4444"/>

            <label for="ifsc">IFSC code</label>
            <input type="text" id="ifsc" name="IFSC" onChange={inputHandler} placeholder="Enter IFSC"/>

            <label for="bmicr">Branch MICR code</label>
            <input type="text" id="bmicr" name="Branch_MICR_Code" onChange={inputHandler} placeholder="Enter Branch MICR"/>

            <label for="bgstin">Branch GSTIN</label>
            <input type="text" id="bgstin" name="Branch_GSTIN" onChange={inputHandler} placeholder="Enter Branch GSTIN"/>

            <label for="customernum">Customer number</label>
            <input type="text" id="customernum" name="Customer_Number" onChange={inputHandler} placeholder="Enter customer number"/>

            <label for="ptype"> Product Type</label>
            <input type="text" id="ptype" name="ProductType" onChange={inputHandler} placeholder="Product Type"/>

            
            <label for="aobalance"> Account Opening Balance</label>
            <input type="text" id="aobalance" name="AccountOpenBlance" onChange={inputHandler} placeholder="Account Opening Balance"/>


            <label for="date">Date</label>
            <input type="date" id="date" name="Date"  onChange={inputHandler} placeholder="Choose date"/><br/><br/>

            <label for="edate">Effective Date</label>
            <input type="date" id="edate" name="EffectiveDate"  onChange={inputHandler} placeholder="Choose effective date"/><br/><br/>

            <label for="branch"> Branch</label>
            <input type="text" id="branch" name="Branch" onChange={inputHandler} placeholder="Enter Branch"/>

            <label for="description"> Description</label>
            <input type="text" id="description" name="Description" onChange={inputHandler} placeholder="Add description"/>

            <label for="dammount">Deposite Ammount</label>
            <input type="text" id="dammount" name="DepositAmount" onChange={inputHandler} placeholder="Enter Despositing Ammount"/>
            <Button type='submit' variant="contained">Add Account </Button>
      </form>
      </div>
      <ToastContainer />
    </div>
    </>
    )
}


export default AddBankAccount