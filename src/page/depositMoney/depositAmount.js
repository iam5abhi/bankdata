import React,{useState,useEffect} from "react";
import '../createAccount/add.css'
import Button from '@mui/material/Button';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate,useParams} from 'react-router-dom'
import configUrl from '../../config/BaseUrl';
import NavBar from "../../Componet/Navbar";


const DespositAmout =()=>{
  const { id } = useParams();
  let navigate = useNavigate();
  const[dipositAmount,setDipositAmount] =useState({Date:'',Branch:'',Description:'',DepositAmount:''})
  const [userdata,setUserdata] =useState({name:'',AccountNumber:''})



   const DataHandler =(event)=>{
       setDipositAmount((preState)=>({
         ...preState,
         [event.target.name]:event.target.value
       }))
   }

   useEffect(() => {
         axios.get(`${configUrl.ApiUrl}/check/accountdeatils/${id*1}`)
         .then((res)=>{
             console.warn(res.data.account)
             setUserdata({name:res.data.account.name,AccountNumber:res.data.account.AccountNumber})
         })
         .catch((err)=>{
            alert(err.message)
         })
   }, [id]);

  
const submitHandler =async(event)=>{
     event.preventDefault();
     axios.patch(`${configUrl.ApiUrl}/deposit/?AccountNumber=${id*1}`,dipositAmount)
     .then((res)=>{
         toast.success('desposit Sucessfully')
           navigate("/statement")
     })
     .catch((err)=>{
         toast.error(err.message)
     })
}
console.log(dipositAmount)
    return(
      <>
         <NavBar/>
            <div class="row">
              <div class="container">
                <form onSubmit={submitHandler}>
                  
                  
                    <label for="date">Date</label>
                      <input type="date" id="date" name="Date"  onChange={DataHandler} placeholder="Choose date" required/><br/><br/>
                      <label for="accno"> AccountNumber</label>
                      <input type="text" id="accno" name="AccountNumber"  value={userdata.name}  placeholder="Enter account number"  disabled='true'/>

                      <label for="name">Name</label>
                      <input type="text" id="name" name="name" value={userdata.AccountNumber}   placeholder="Enter account name"  disabled='true'/>
                      <label for="branch"> Branch</label>
                      <input type="text" id="branch" name="Branch" onChange={DataHandler} placeholder="Enter Branch"/>
        
                      <label for="description"> Description</label>
                      <input type="text" id="description" name="Description" onChange={DataHandler} placeholder="Add description"/>
        
                      <label for="dammount">Deposite Ammount</label>
                      <input type="text" id="dammount" name="DepositAmount" onChange={DataHandler} placeholder="Enter Despositing Ammount"/>
        
        
                      <Button type ='submit' variant="contained">Deposit</Button>
                
                </form>
              </div>
              <ToastContainer />
            </div>
           
      </>
    )
 }

export default DespositAmout