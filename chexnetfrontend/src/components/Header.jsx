import { Navbar,Nav,Container,NavDropdown,Button } from "react-bootstrap";
import {FaSignInAlt,FaSignOutAlt,FaArrowLeft} from 'react-icons/fa';
import { LinkContainer } from "react-router-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/userApiSlice.js";
import { logout } from "../slices/authSlice.js";

const Header = ()=>{
    const {userInfo} = useSelector((state)=>state.auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleBackClick = () => {
      navigate(-1); 
    };
    
    const [logoutApicall] = useLogoutMutation();

    const logoutHandler =async ()=>{
        try {
            await logoutApicall().unwrap();
            dispatch(logout());
            navigate('/login')
        } catch (error) {
            console.log(error)
        }  
    };

    return (
        <Navbar className='translucent-navbar sticky-top' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>CheXNet</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto mx-3 gap-3'>
                {userInfo ? (
                  <>
                     <Button onClick={handleBackClick} variant="secondary" className=" d-flex align-items-center">
                        <FaArrowLeft className="mr-2" /> Back
                     </Button>
                      
                    <NavDropdown title={userInfo.name} id='username'>
                      <LinkContainer to='/profile'>
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <LinkContainer to='/login'>
                      <Nav.Link>
                        <FaSignInAlt /> Sign In
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/register'>
                      <Nav.Link>
                        <FaSignOutAlt /> Sign Up
                      </Nav.Link>
                    </LinkContainer>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      

    )
}

export default Header;