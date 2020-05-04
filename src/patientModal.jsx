import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';

const axios = require('axios');

class PatientModal extends Component {
	state={
		patients: this.props.patients,
		bloodGroup: ['A+','A-','B+','B-','AB+','AB-','O+','O-'],
		openModal: true,
		patientInfo: {
			name: "",
			age: "",
			gender: {
				male: 'M',
				female: 'F'
			},
			bloodGroup: "",
			hasBp: {
				yes: true,
				no: false
			}
		},
		patientEdit: this.props.toBeEdited
	}

	labelStyles = {
		fontWeight: 'bold'
	}

	componentWillReceiveProps(prevProps) {
		this.setState({ openModal: true, patientEdit: this.props.toBeEdited })
	}

	handleClose = () => {
		this.setState({ openModal: false });
	}

	handleSubmit = async(event) => {
		let originalPatientsRecord = await axios.get("http://localhost:3000/patients"); // [...this.props.patients]
		event.preventDefault();
		const res = await axios.post("http://localhost:3000/patients", this.state.patientInfo);
		originalPatientsRecord.push(res.data);
		this.setState({ patients: originalPatientsRecord });
	}

	handleChange = (e) => {
		let patientInfo = { ...this.state.patientInfo }
		patientInfo[e.currentTarget.name] = e.currentTarget.value
		this.setState({ patientInfo })
	}

	render() {
		return(
			<>
			  {this.state.openModal && (
			  	<Modal show={this.props.modalShow} onHide={this.handleClose} animation={true}>
	        <Modal.Header closeButton>
	          <Modal.Title>Add Patient</Modal.Title>
	        </Modal.Header>
	        <Modal.Body>
	        	<Form onSubmit={this.handleSubmit}>
						  <Form.Group controlId="formBasicName">
						    <Form.Label style={this.labelStyles}>Name</Form.Label>
						    <Form.Control
						     type="name"
						     value={this.state.patientEdit.name}
						     name="name"
						     onChange={this.handleChange}
						     placeholder="Enter name" />
						  </Form.Group>

						  <Form.Group controlId="formBasicAge">
						    <Form.Label style={this.labelStyles}>Age</Form.Label>
						    <Form.Control
						     type="age"
						     value={this.state.patientEdit.age}
						     name="age"
						     onChange={this.handleChange}
						     placeholder="Enter age" />
						  </Form.Group>

						  <Form.Group controlId="formBasicRadio">
						    <Form.Label style={this.labelStyles}>Gender</Form.Label>
							    <Form.Check
							     type="radio"
							     label="Male"
							     name="gender"
							     value={this.state.patientInfo.gender.male}
							     onChange={this.handleChange}>
							    </Form.Check>

							    <Form.Check
							     type="radio"
							     label="Female"
							     name="gender"
							     value={this.state.patientInfo.gender.female}
							     onChange={this.handleChange}>
							    </Form.Check>
						  </Form.Group>

						  <Form.Group controlId="exampleForm.ControlSelect1">
						    <Form.Label style={this.labelStyles}>Blood Group</Form.Label>
						    <Form.Control as="select" name="bloodGroup" value={this.state.patientInfo.bloodGroup} onChange={this.handleChange}>
						      {this.state.bloodGroup.map(b => (<option>{b}</option>))}
						    </Form.Control>
						  </Form.Group>

						  <Form.Group controlId="formBasicRadio">
						    <Form.Label style={this.labelStyles}>Are you having BP?</Form.Label>
							    <Form.Check
							     type="radio"
							     label="Yes"
							     name="hasBp"
							     value={this.state.patientInfo.hasBp.yes}
							     onChange={this.handleChange}>
							    </Form.Check>

							    <Form.Check
							     type="radio"
							     label="No"
							     name="hasBp"
							     value={this.state.patientInfo.hasBp.no}
							     onChange={this.handleChange}></Form.Check>
						  </Form.Group>
						  <br/>
						  <Button variant="primary" type="submit">
						    Submit
						  </Button>
					  </Form>
		      </Modal.Body>
	      </Modal>
	    )}
			</>
		)
	}
}

export default PatientModal;
