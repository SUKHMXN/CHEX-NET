import { useState , useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { useRegisterUserMutation,useRegisterDoctorMutation } from "../slices/userApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import {toast} from 'react-toastify';
import { Form, Button, Row, Col ,InputGroup} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

const RegisterScreen = ()=>{
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [city,setCity]=useState('')
    const [role,setRole]=useState('user')
    const [specialization,setSpecialization]=useState('')
    const [licenseNumber,setLicenseNumber]=useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [experience, setExperience] = useState(0);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [registerUser,{isLoading:isUserLoading}] = useRegisterUserMutation();
    const [registerDoctor,{isLoading:isDoctorLoading}] = useRegisterDoctorMutation();

    const {userInfo}=useSelector((state)=>state.auth)

    useEffect(()=>{
        if(userInfo ){
            navigate('/userPage')
        }
        
    },[navigate,userInfo])

    const SubmitHandler = async(e)=>{
        e.preventDefault();
        
            try {
                if (role==='user'){
                    const res = await registerUser({email,name,password,city,role}).unwrap()
                    dispatch(setCredentials({ ...res })),
                    navigate('/')
                }
                else{
                    const res = await registerDoctor({email,name,password,city,role,specialization,licenseNumber,experience}).unwrap()
                    dispatch(setCredentials({ ...res })),
                    navigate('/')
                }
        
            } catch (error) {
              toast.error(error?.data?.message || error.message)
            }
        
    };

    return(
        <div className="min-h-screen bg-[#0A0F2C] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-[#1D263B] text-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-300">
          Register
        </h1>

        <form onSubmit={SubmitHandler}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 text-sm text-gray-300">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm text-gray-300"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded-lg"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* City */}
          <div className="mb-4">
            <label htmlFor="city" className="block mb-1 text-sm text-gray-300">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label htmlFor="role" className="block mb-1 text-sm text-gray-300">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="user">User</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {role === "doctor" && (
            <>
              {/* Specialization */}
              <div className="mb-4">
                <label
                  htmlFor="specialization"
                  className="block mb-1 text-sm text-gray-300"
                >
                  Specialization
                </label>
                <input
                  id="specialization"
                  type="text"
                  placeholder="Enter specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* License Number */}
              <div className="mb-4">
                <label
                  htmlFor="licenseNumber"
                  className="block mb-1 text-sm text-gray-300"
                >
                  License&nbsp;No
                </label>
                <input
                  id="licenseNumber"
                  type="text"
                  placeholder="Enter license number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Experience */}
              <div className="mb-6">
                <label
                  htmlFor="experience"
                  className="block mb-1 text-sm text-gray-300"
                >
                  Experience&nbsp;(years)
                </label>
                <input
                  id="experience"
                  type="number"
                  placeholder="Enter years of experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUserLoading || isDoctorLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition-colors duration-200"
          >
            {isUserLoading || isDoctorLoading ? "Loading..." : "Register"}
          </button>
        </form>

        {/* Link to Login */}
        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
              

        
    );
};

export default RegisterScreen;