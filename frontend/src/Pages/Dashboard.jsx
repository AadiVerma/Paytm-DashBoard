import { useEffect ,useState} from "react";
import Users from "./Users"
import axios from 'axios';
export default function Dashboard(){
    // const user=lo
    const [users, setUsers]=useState([]);
    const [filter,setFilter]=useState("");
    useEffect(()=>{
        const fetchData=async()=>{
            const response=await axios.get('http://localhost:3000/api/v1/user/bulk?filter='+filter);
            setUsers(response.data.user);
        }
        fetchData();    
    },[filter])
    return(
        <div>
            <div className="flex justify-between p-6 border-b-2">
                <h2 className="font-bold text-2xl">Payments App</h2>
                <div className="flex gap-3">
                    <h4 className="font-semibold text-lg mt-2">Hello, Aditya</h4>
                    <h2 className="font-semibold text-lg  rounded-full bg-green-500 h-6 w-6 justify-center flex items-center p-6 text-white">A</h2>
                </div>
            </div>
            <div>
                <div className="flex p-6 gap-3">
                    <h2 className="font-bold text-xl">Your Balance </h2>
                    <h2 className="font-bold text-lg">$5000</h2>
                </div>
                <div className="pl-6 pr-6">
                    <h2 className="font-bold text-xl">Users</h2>
                    <input onChange={(e)=>setFilter(e.target.value)} type="text" placeholder="Search users..." className="p-2 w-full border-2 mt-4 rounded-lg mb-6"/>
                   {users.map(user=><Users user={user}/>)}
                </div>
            </div>
        </div>
    )
}