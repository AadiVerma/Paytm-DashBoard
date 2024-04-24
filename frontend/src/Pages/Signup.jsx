import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
export default function Signup(){
    const [firstName,setfirstName]=useState("");
    const [lastName,setlastName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
   return(
    <div className="bg-[#7F7F7F] h-[100vh] flex justify-center items-center">
        <div className="bg-white w-fit p-8 rounded-2xl ">
        <h1 className="font-bold text-3xl flex justify-center mb-2">Sign Up</h1>
        <h3 className="text-lg font-semibold text-slate-600 flex justify-center mb-4">Enter your information to create an account</h3>
        <label for="firstName" className="text-black font-bold block mb-2">First Name</label>
        <input type="text" id="firstName" name="firstName" onChange={(e)=>setfirstName(e.target.value)} placeholder="Aditya" className="block w-full border-2 border-gray-300 p-2 rounded-lg mb-2"/>
        <label for="lastName"  className="text-black font-bold block mb-2">Last Name</label>
        <input type="text" id="lastName" onChange={(e)=>setlastName(e.target.value)} name="lastName" placeholder="Verma" className="block w-full border-2 border-gray-300 p-2 rounded-lg mb-2"/>
        <label for="email" className="text-black font-bold block  mb-2">Email</label>
        <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} name="email" placeholder="abc@gmail.com" className="block w-full border-2 border-gray-300 p-2 rounded-lg mb-2"/>
        <label for="password" className="text-black font-bold block  mb-2">Password</label>
        <input type="password" id="password" name="password" onChange={(e)=>setPassword(e.target.value)} placeholder="******" className="block w-full border-2 border-gray-300 p-2 rounded-lg mb-4"/>
        <button type="submit"  onClick={async ()=>{
            const response = await axios.post('http://localhost:3000/api/v1/user/signup',{
                username:email,
                firstName,
                lastName,
                password
            })
            localStorage.setItem('token',response.data.token);
        
        }}className="bg-black text-white block w-full p-2 rounded-lg  mb-2">Sign Up</button>
        <h5 className="flex justify-center gap-1 font-medium">Already have an account?<Link to={"/signin"} className="underline"> Login</Link></h5>
        </div>
    </div>
   )
}