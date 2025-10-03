import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { 
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import store from './store/store.js'
import { Provider } from 'react-redux';
import LoginScreen from './screens/LoginScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import PrivateRouter from './components/PrivateRouter.jsx'
import UserHomePage from "./screens/userPage.jsx"
import ImageUpload from "./screens/uploadImage.jsx"
import AppointmentScreen from "./screens/AppointmentScreen.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/test' element={<div className="bg-gray-900 text-white p-6 text-2xl">
      Tailwind colors working?
    </div>} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRouter />} >
         <Route path='/profile' element={<ProfileScreen/>}/>
      </Route>
      <Route path='/userPage' element={<UserHomePage/>} />
      <Route path='/appointmentpage' element={<AppointmentScreen/>} />
      <Route path='/uploadimage' element={<ImageUpload/>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);