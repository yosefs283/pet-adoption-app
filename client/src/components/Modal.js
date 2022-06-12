import { useState } from 'react';
import {Button,Modal} from 'react-bootstrap'
import React from 'react';




function PetModal({ petName, petType, hypoallergenic,bio, adoptionStatus, color, height, weight, dieteryRestrictions, breed }) {
    const [show, setShow] = useState(false);

  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary"  onClick={handleShow}>
          Info
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>Name: {petName}</Modal.Body>
          <Modal.Body>Type: {petType}</Modal.Body>
          <Modal.Body>Color: {color}</Modal.Body>
          <Modal.Body>Adoption status: {adoptionStatus}</Modal.Body>
          <Modal.Body>Height: {height}</Modal.Body>
          <Modal.Body>Weight: {weight}</Modal.Body>
          <Modal.Body>Dietery restrictions: {dieteryRestrictions}</Modal.Body>
          <Modal.Body>Breed: {breed}</Modal.Body>
          <Modal.Body>Bio: {bio}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
export default PetModal