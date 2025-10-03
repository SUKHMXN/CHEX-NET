import react,{useState} from "react"
import {Link} from "react-router-dom"
import UploadModal from "../components/Modal.jsx"

const SideBar = ()=>{
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);



      return (
        <div className="sidebar">
          <h2 className="sidebar-title ">Menu</h2>
      <ul className="sidebar-menu">
        <li>
          <Link to="#" className="sidebar-link" onClick={openModal}>
            Upload
            {showModal && <UploadModal closeModal={closeModal} />}
          </Link>
        </li>
        <li>
          <Link to="/appointmentpage" className="sidebar-link">
            Appointments
          </Link>
        </li>
      </ul>
        </div>
        
      );
}

export default SideBar;