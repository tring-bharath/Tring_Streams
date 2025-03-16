import React, { useContext, useState } from "react";
import { ProfileName } from "../../routes/AppRoutes";
import { Button, Modal, Form } from "react-bootstrap";
import image from '../../assets/front_image.jpg';

const Loggedin = () => {
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    bio: "",
    location: "",
  });
  const { userName, setUsername } = useContext(ProfileName);

  const logout = () => {
    localStorage.clear("User");
    setUsername(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditSubmit = () => {
    console.log("Updated Profile Data:", formData);
    setEditShow(false);
  };

  return (
    <div className="w-100">
      <div className="history d-flex  flex-column w-100 h-100">
        <Modal show={show} centered>
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

        <Modal show={editShow} centered onHide={() => setEditShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  name="bio"
                  value={formData.bio}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditShow(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleEditSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="profile-container">
          <div className="header d-flex justify-content-between w-100">
            <div className="history h2 align-self-center ms-3">Profile</div>
            <div className="nav align-self-end m-3 ">
              <button className="px-3 py-2 rounded-1 h5 text-white bg-primary" onClick={() => setShow(true)}>Logout</button>
            </div>
          </div>
          <div className="profile-body ps-4 d-flex flex-column w-100">
            <div className="card shadow-lg p-4 text-center" style={{ width: "350px" }}>
              <img
                src={image}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h3>{userName}</h3>
              <p className="text-muted">Your email or other info</p>
              <button className="btn btn-primary w-100" onClick={() => setEditShow(true)}>Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loggedin;
