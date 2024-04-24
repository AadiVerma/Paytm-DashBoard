import { useNavigate } from "react-router-dom"
export default function Users({user}){
    const Initial=user.firstName[0].toUpperCase()
    const navigate =useNavigate();
    return (
        <div className="flex justify-between mt-2">
            <div className="flex gap-4">
                <h1 className="text-xl font-semibold  rounded-full bg-green-500 h-6 w-6 justify-center flex items-center p-6 text-white">{Initial}</h1>
                <h2 className="text-xl font-bold mt-2">{user.firstName} {user.lastName}</h2>
            </div>
            <button className="p-3 bg-slate-950 text-white rounded-lg" onClick={()=>navigate("/send?id="+user._id+"&name="+user.firstName)}>Send Money</button>
        </div>
    )
}