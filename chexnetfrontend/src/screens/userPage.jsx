import {useSelector} from "react-redux"
import {useLocation} from 'react-router-dom'
import MainContent from "../components/mainComponent.jsx"


const UserHomePage= ()=>{ 
    const {userInfo} = useSelector((state)=>state.auth)
    const location=useLocation()

    if(!userInfo){
        return <div>loading...</div>
    }
    
    return(
            <MainContent />
    )

}
export default UserHomePage;