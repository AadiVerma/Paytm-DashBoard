import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
export default function Send(){
    const [searchParams] = useSearchParams();
    const id=searchParams.get('id');
    const name=searchParams.get('name');
    const [amount,setAmount]=useState();
    const handleTransfer=()=>{
     const sendData=async ()=>{
     try{
        await axios.post("http://localhost:3000/api/v1/account/transfer",{
            to:id,
            amount
        },{
            headers:{
                Authorization: "Bearer " + localStorage.getItem("token"),
            }
        })
        toast.success('Transfer Successfull', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
     }catch(e){
        toast.error('Failed to transfer', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
     }
     }
     sendData();
    }
    return (
    <div className="bg-[#4c4b4b] h-[100vh] flex justify-center items-center">
        <div className="bg-white p-10 rounded-lg w-[28%] shadow-md">
        <ToastContainer/>
            <h1 className="font-bold text-2xl flex justify-center mb-8">Send Money</h1>
            <div className="flex gap-4 mb-1">
                <h2 className="font-semibold text-2xl rounded-full bg-green-500 h-6 w-6 justify-center flex items-center p-6 text-white">{name[0].toUpperCase()}</h2>
                <h2 className="font-bold text-2xl mt-1">{name}</h2>
            </div>
            <h2 className="font-semibold text-sm mb-4 mt-1">Amount (in Rs)</h2>
            <input type="text" placeholder="Enter Amount" onChange={(e)=>setAmount(e.target.value)}  className="block p-4 w-full mt-2 border-2 border-slate-600 rounded-lg outline-none"/>
            <button onClick={handleTransfer} className="mt-4 w-full p-3 rounded-md bg-green-500 hover:bg-green-600 text-white">Initiate Transfer</button>
        </div>
    </div>
   )
}