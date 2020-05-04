import React, { Component } from 'react';
import { Modal, Button, Form, Glyphicon } from 'react-bootstrap';
import PatientModal from './patientModal';

const axios = require('axios');

class PatientDetails extends Component {
	state = {
		patients: [],
		patientAdded: false,
		patientsRecordSorted: true,
	  modalShow: false,
	  selectedPatient: []
	}

	async componentDidMount() {
		const receivedPatients = await axios.get("http://localhost:3000/patients");
		this.setState({ patients: receivedPatients.data })
	}

	addPatient = () => {
		this.setState({ modalShow: true });
	}

	deletePatient = async (patientId) => {
		let originalPatientsRecord = [...this.state.patients]
		const deletedPatient = await axios.delete("http://localhost:3000/patients"+ '/'+ patientId)
		originalPatientsRecord = originalPatientsRecord.filter(c => c._id !== deletedPatient.data._id)
		this.setState({ patients: originalPatientsRecord })
	}

	resetRecord = async () => {
	  const originalPatientsRecord = await axios.get("http://localhost:3000/patients");
	  this.setState({ patients: originalPatientsRecord.data, modalShow: false })
	}

	toggleSortedPatientsRecord = () => {
		this.setState({ patientsRecordSorted: !this.state.patientsRecordSorted })
	}

	editPatientInfo = (patient) => {
		this.setState({ modalShow: true, selectedPatient: patient });
	}

	sortByName = () => {
		let patientsName = [];
		let sortedPatientsRecord = [];

		this.toggleSortedPatientsRecord();

		if(this.state.patientsRecordSorted && this.state.patients.length > 1) {
			this.state.patients.map((patient, key) => {
			  patientsName.push(patient.name)
			  patientsName = patientsName.sort();
		  });

			patientsName.map(p => {
				this.state.patients.map(patient => {
					if(p === patient.name)
						sortedPatientsRecord.push(patient);
				});
			});

		  this.setState({ patients: sortedPatientsRecord })
		}

		else
			this.resetRecord();
	}

	sortByAge = () => {
		let patientsAge = [];
		let sortedPatientsRecord = [];

		this.toggleSortedPatientsRecord();

		if(this.state.patientsRecordSorted && this.state.patients.length > 1) {
			this.state.patients.map((patient, key) => {
			  patientsAge.push(patient.age)
			  patientsAge = patientsAge.sort();
		  });

			patientsAge.map(p => {
				this.state.patients.map(patient => {
					if(p === patient.age)
						sortedPatientsRecord.push(patient);
				});
			});
			const uniqueSortedPatientsRecord = [...new Set(sortedPatientsRecord)];

		  this.setState({ patients: uniqueSortedPatientsRecord })
		}

		else
			this.resetRecord();
	}

	sortByBloodGroup = () => {
		let patientsBloodGroup = [];
		let sortedPatientsRecord = [];

		this.toggleSortedPatientsRecord();

		if(this.state.patientsRecordSorted && this.state.patients.length > 1) {
			this.state.patients.map((patient, key) => {
			  patientsBloodGroup.push(patient.bloodGroup)
			  patientsBloodGroup = patientsBloodGroup.sort();
		  });

			patientsBloodGroup.map(p => {
				this.state.patients.map(patient => {
					if(p === patient.bloodGroup)
						sortedPatientsRecord.push(patient);
				});
			});
			const uniqueSortedPatientsRecord = [...new Set(sortedPatientsRecord)];

		  this.setState({ patients: uniqueSortedPatientsRecord })
		}

		else
			this.resetRecord();
	}

	render() {
		return (
			<React.Fragment>
			 <PatientModal
			  modalShow={this.state.modalShow}
			  patients={this.state.patients}
			  toBeEdited={this.state.selectedPatient} />
			 <h3 style={{ textAlign: "center", padding: 10 }}>Patient's Records</h3>
			 <table className="table table-striped">
			   <thead>
			    <tr>
			      <th>Name
			        <button onClick={this.sortByName} className="btn btn-sm dropdown-toggle"></button>
			      </th>
			      <th>Age
			        <button onClick={this.sortByAge} className="btn btn-sm dropdown-toggle"></button>
			      </th>
			      <th>Gender</th>
			      <th>Blood Group
			        <button onClick={this.sortByBloodGroup} className="btn btn-sm dropdown-toggle"></button>
			      </th>
			      <th>Has BP?</th>
			      <th></th>
			      <th></th>
			    </tr>
			   </thead>
			   <tbody>
			     {this.state.patients.map(patient => (
			     	 <tr key={patient.id}>
				     	 <td>{patient.name}</td>
				     	 <td>{patient.age}</td>
				     	 <td>{patient.gender}</td>
				     	 <td>{patient.bloodGroup}</td>
				     	 <td>{patient.hasBp ? 'Yes' : 'No'}</td>
				     	 <td><button onClick={() => this.deletePatient(patient._id)} className="btn btn-danger btn-sm">Delete</button></td>
				     	 <td><button onClick={() => this.editPatientInfo(patient)} className="btn btn-sm btn-primary">Edit</button></td>
			       </tr>
			     ))}
			   </tbody>
			 </table>
			 <button className="btn btn-warning btn-sm"
			 	onClick={this.resetRecord}
			  style={{ float: "right", marginRight: "150px" }}>
			  Reset
			 </button>
			 <button className="btn btn-success btn-sm"
			 	onClick={this.addPatient}
			  style={{ float: "right", marginRight: "15px" }}>
			  + Add Patient
			 </button>
			</React.Fragment>
		)
	}
}

export default PatientDetails;
