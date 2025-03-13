import React, { useContext, useState } from "react";
import { ProfileName } from "../../routes/AppRoutes";
import { Button, Modal } from "react-bootstrap";

const Loggedin = () => {
  const [show, setShow] = useState(false);
  const { userName, setUsername } = useContext(ProfileName);

  const logout = () => {
    localStorage.clear("User");
    setUsername(null);
  };

  return (<div>
    <div className="history d-flex  flex-column w-100 h-100">
      <Modal show={show}>
        <Modal.Header>
          <div className="logout-header h3">Log Out</div>
        </Modal.Header>
        <Modal.Body>
          <div className="logout-body h4">Are you sure want to logout!</div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="h4" onClick={() => setShow(false)}>
            CANCEL
          </Button>
          <Button variant="danger" onClick={() => logout()}>
            LOG OUT
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="header d-flex justify-content-between w-100">
        <div className="history h2 align-self-center ms-3">Profile</div>
        <div className="nav align-self-end m-3 ">
          <button
            className="px-3 py-2 rounded-1 h5 text-white bg-primary"
            onClick={() => setShow(true)}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
    <div className="container">
        <div className="profile-box">
            <img src="" alt="" />
            <p></p>
        </div>
    </div>
    </div>
  );
};

export default Loggedin;
