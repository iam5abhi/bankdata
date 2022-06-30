import React,{useState,useEffect} from "react";
import '../createAccount/add.css'
import Button from '@mui/material/Button';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate,useParams} from 'react-router-dom'
import configUrl from '../../config/BaseUrl';
import NavBar from "../../Componet/Navbar";


const Withdrawal =()=>{
    const { id } = useParams();
    let navigate = useNavigate();
     const [withdrawalamonut,setwithdrawalamonut] =useState({Date:'',Branch:'',ChequeNumber:'',Description:'',WithdrawalAmount:''})
     const [userdata,setUserdata] =useState({name:'',AccountNumber:''})
    const inputHandler =(event)=>{
      setwithdrawalamonut((preState)=>({
        ...preState,
        [event.target.name]:event.target.value
      }))
    }

     const withdrwalAmount =(event)=>{
          event.preventDefault();
          axios.patch(`${configUrl.ApiUrl}/withdrawal/?AccountNumber=${id*1}`,withdrawalamonut)
          .then((res)=>{
              toast.success('desposit Sucessfully')
              navigate(`/statement/${id}`)
          })
          .catch((err)=>{
               toast.error(err.message)
          })
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


    return(
      <>
        <NavBar/>
     
        <div class="row">
        <div class="container">
          <form  onSubmit={withdrwalAmount} >    
               
              <label for="date">Date</label>
                <input type="date" id="date" name="Date" onChange={inputHandler}  placeholder="Choose date"/><br/><br/>
                
                <label for="accno"> AccountNumber</label>
                <input type="text" id="accno" name="AccountNumber"    placeholder="Enter account number" value={userdata.AccountNumber} disabled='true'/>

                <label for="name">Name</label>
                <input type="text" id="name" name="name"    placeholder="Enter account name" value={userdata.name} disabled='true'/>

                <label for="branch"> Branch</label>
                <input type="text" id="branch" name="Branch" onChange={inputHandler} placeholder="Enter Branch"/>
    
               <label for="chequenum"> Cheque number</label>
                <input type="text" id="chequenum" name="ChequeNumber" onChange={inputHandler} placeholder="Cheque number"/>
    
                <label for="description"> Description</label>
                <input type="text" id="description" name="Description" onChange={inputHandler} placeholder="Add description"/>
    
                <label for="wammount">Withdrawal Ammount</label>
                <input type="text" id="wammount" name="WithdrawalAmount" onChange={inputHandler} placeholder="Withdrawal Ammount"/>
                <Button type="submit" variant="contained">withdrwal</Button>  
            
          </form>
        </div>
        <ToastContainer />
        </div>
        </>
    )
}



export default Withdrawal