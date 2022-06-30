
import React,{ useRef } from 'react'
import './App.css';
import AddBankAccount from './page/createAccount/AddBankAccount'
import Withdrawal from './page/withrwalMoney/withrwal';
import DespositAmout from './page/depositMoney/depositAmount';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import NavBar from './Componet/Navbar';
import SearchBar from './Componet/SearchBar';
import Login  from  './page/login/Login'
import GetAccountDetails from './page/getAccountDetails/getAccountDetails'
import UserList from './page/AllBankUserLIst/userList';
import EditBankDeatils from './page/EditAccounts/EditBankDeatils';
import EditTansaction from './page/Editransaction/EditTransaction';


function App() {
  return (
    <BrowserRouter>
          <Routes>
               <Route path='/' element ={<Login/>}/>
               <Route path='/search/account' element={<SearchBar/>}/>
                <Route path ="/desposit/:id" element={<DespositAmout/>}/>
                <Route path ='/withdrawal/:id' element={<Withdrawal/>}/>
                <Route path ='/createAccount' element={<AddBankAccount/>} />
                <Route path='/statement/:id' element ={<GetAccountDetails />} />
                <Route path='/userlist' element ={<UserList />} />
                <Route path="/edit/account/:id" element={<EditBankDeatils />} />
                <Route path='/edit/transaction' element={<EditTansaction/>}/>
          </Routes>
    </BrowserRouter>
  )
}

export default App;
