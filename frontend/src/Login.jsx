import React from 'react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import {useNavigate , Link} from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import { increment , decrement } from './features/counter/couterSlice'

const Login = () => {
    const navigate = useNavigate();
    const [LoginData, setLoginData] = useState({
        email:"",
        password:""
    })
    // const count = useSelector((state)=>state.counter.value);
    // // const naviagate = useNavigate();
    // const dispatch = useDispatch();

    // const hanleIncremenet = () =>{
    //     dispatch(increment());
    // }
    // const hanleDecremenet = ()=>{
    //     dispatch(decrement());
    // }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {email , password} = LoginData;
        if(email ==="" || password===""){
            toast.error("fill all the inputs")
            return;
        }
        try {
            const url = "http://localhost:8000/api/auth/login";
            const response = await fetch(url , {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(LoginData)
            })
            const data = await response.json();
            if(data.success){
                toast.success("logged in successfully!");
                localStorage.setItem("token",data.token);
                setTimeout(() => {
                    navigate("/home")
                }, 3000);
            }
            else{
                toast.error(data.message);
                return;
            }

        } catch (error) {
            toast.error(error);
        }
    }

    const handlechange = (e)=>{
        const {name,value} = e.target;
        setLoginData({...LoginData, [name]:value})
    }
    console.log(LoginData)

    return (
        <>
            <div className="w-full h-screen flex items-center justify-center bg-gray-100">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="email"
                            type="email"
                            value={LoginData.email}
                            onChange={handlechange}
                            placeholder="email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            name="password" 
                            value={LoginData.password}
                            onChange={handlechange}
                            type="password"
                            placeholder="******************"
                        />
                        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                    </div>
                    <div className="flex items-center justify-center flex-col">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                        <p>Don't have account? <Link to={"/register"}>Register</Link></p>
                    </div>
                </form>
                <ToastContainer/>
            </div>
        </>
    )
}

export default Login
