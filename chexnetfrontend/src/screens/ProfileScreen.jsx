import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux"
import { useUpdateUserMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify"
import { setCredentials} from "../slices/authSlice.js"
import Loader from "../components/Loader.jsx"
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const ProfileScreen = ()=>{
    const [email,setEmail] = useState('');
    const [name,setName] = useState('')
    const [password,setPassword] = useState('');
    const [city,setCity] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const dispatch=useDispatch();

    const {userInfo} = useSelector((state)=>state.auth)

    const [updateProfile,{isLoading}] = useUpdateUserMutation();

    useEffect(()=>{
        setEmail(userInfo.email)
        setCity(userInfo.city)
        setName(userInfo.name)
    },[userInfo.email,userInfo.city,userInfo.name])

    const submitHandler =async (e)=>{
        e.preventDefault();
        if(password!=confirmPassword){
            toast.error("Passwords do not match")
        }else{
            try {
                const res=await updateProfile({
                    _id:userInfo._id,
                    name,
                    email,
                    password,
                    city
                }).unwrap();
                dispatch(setCredentials(res));
                toast.success('Profile updated successfully');
            } catch (err) {
                toast.error(err?.data?.message || err.message)
            }
        }
    };

    return(
        <div className="background">
<FormContainer>
            <h1>Update Profile</h1>
            <Form onSubmit={submitHandler}>

            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                type='text'
                placeholder="Enter name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                type='email'
                placeholder="Enter email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                type='password'
                placeholder="Enter password"
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>City</Form.Label>
                <Form.Control
                type='text'
                placeholder="Enter city"
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button
            type='submit'
            variant='primary'
            className="mt-3"
            >
            Update
            </Button>

            {isLoading && <Loader/>}
            </Form>
        </FormContainer>
        </div>
        
    );
};

export default ProfileScreen;