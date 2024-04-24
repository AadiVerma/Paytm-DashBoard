import { Link } from "react-router-dom";

export default function SignIn(){
   return(
    <div className="bg-[#7F7F7F] h-[100vh] flex justify-center items-center">
        <div className="bg-white w-fit p-8 rounded-2xl ">
        <h1 className="font-bold text-3xl flex justify-center mb-2">Sign In</h1>
        <h3 className="text-lg font-semibold text-slate-600 flex justify-center mb-4">Enter your credentials to access your account</h3>
        <label for="email" className="text-black font-bold block  mb-2">Email</label>
        <input type="email" id="email" name="email" placeholder="abc@gmail.com" className="block w-full border-2 border-gray-300 p-2 rounded-lg mb-2"/>
        <label for="password" className="text-black font-bold block  mb-2">Password</label>
        <input type="password" id="password" name="password" placeholder="******" className="block w-full border-2 border-gray-300 p-2 rounded-lg mb-4"/>
        <button type="submit" className="bg-black text-white block w-full p-2 rounded-lg  mb-2">Sign In</button>
        <h5 className="flex justify-center gap-1 font-medium">Don't have an account?<Link to={"/signup"} className="underline">Sign Up</Link></h5>
        </div>
    </div>
   )
}