import React from "react";
import { Redirect } from 'react-router-dom';
import { Form, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {getProperty,validateBusDetails,getFormData} from '../util/Utils'

const serverUrl = 'http://localhost:8080/fleet';
export class BusDetailForm extends React.Component{
    //Initializing all the props received with redirect false to control redirecting to BusDetails component
    constructor(props){
        super(props);
        this.state={
            busDetails:getProperty(props.busObject),
            update:props.update,
            errors:[],
            redirect:false,
            busImage:null
        } 

    }

    // Whenever bus details is sent from BussDetails component, form should be updated
    componentWillReceiveProps(props){
        this.setState({
            busDetails:props.busObject,
            update:props.update
        })
    }

    //Handling function when form details is edited and updated in state
    handleChange(e){

        let busDetailLocal = this.state.busDetails;
        let elementName = e.target.name;
        busDetailLocal[elementName] = e.target.value;
        this.setState({
                busDetails: busDetailLocal,
        });
    }

    //Handling whenever image is updated
    handleImage(e){
        this.setState({
                busImage: e.target.files[0]
        });
    }

    //Submit function handling for both Update and Insert Bus details using validation in Utils.js and API call
    handleSubmit(e){
        let redirect = true;
        let error = [];
        let busDetailsLocal = this.state.busDetails;
        let errors = validateBusDetails(busDetailsLocal);
        if(errors.length > 0){
            this.setState({
                errors:errors
            })
            e.preventDefault();
            return false;
        }
        else{
            let formData = getFormData(this.state.busImage,this.state.busDetails);
            if(this.state.update)
            {
                axios.post(serverUrl+'/editBusDetail',formData, 
                {   
                    headers: {
                    'Content-Type':'multipart/form-data'
                    } }).then((result)=>{
                    console.log(result.status);
                        this.setState({
                            redirect:true,
                            errors:error
                        })
                })

                redirect =  true;
            }
            else
            {
                let formData = getFormData(this.state.busImage,this.state.busDetails);
                axios.post(serverUrl+'/fleet/insertBusDetails',formData, 
                {   
                    headers: {
                    'Content-Type':'multipart/form-data'
                    } }).then((result)=>{
                    console.log(result.status);
                        this.setState({
                            redirect:true,
                            errors:error
                        })
                })

            }
            return redirect;
        }               
    }



    //Handling of delete functionaity when button is clicked through API call
    delete(e)
    {
        axios.post(serverUrl+'/deleteBusDetails/'+this.state.busDetails.busId).then((result)=>{
            this.setState({
                redirect:true,
            })
            this.forceUpdate();
            return true;
        })
    }

    render()
    {
       return (
           //When redirect is true it redirects to BusDetails. This is done whenever update,delete or addition is done
        this.state.redirect ? <Redirect push to="/"/> :  
           <div>
               {
               ( 
                   this.props.update ? 
                   <h3> Fleet Update Details</h3>   :<h3>  Fleet Registration </h3>)
                }
                <br/>
               <form onSubmit  ={this.handleSubmit.bind(this)}>
               <Form.Group>Fleet Name</Form.Group>
               <Form.Control type="text" name="busName" value={this.state.busDetails.busName} onChange={this.handleChange.bind(this)}/>
               <Form.Group>Make Year</Form.Group><Form.Control type="text" name="makeYear" value={this.state.busDetails.makeYear} onChange={this.handleChange.bind(this)}/>
               <Form.Group>No Of Wheels</Form.Group>
               <Form.Control as="select"
                    className="mr-sm-2"
                    id="inlineFormCustomSelect" 
                    onChange={this.handleChange.bind(this)}
                    value={this.state.busDetails.numberOfWheels}
                    name="numberOfWheels"
                    custom><br/>
                    <option value="2">2</option>
                    <option value="4">4</option>
                </Form.Control><br/>
               <Form.Group>Odometer Rating</Form.Group>
               <Form.Control type="text" name="odometerReading" value={this.state.busDetails.odometerReading} onChange={this.handleChange.bind(this)}/>  
               <Form.Group>Air Conditioned</Form.Group>
               <Form.Control as="select"
                    className="mr-sm-2"
                    id="inlineFormCustomSelect" 
                    onChange={this.handleChange.bind(this)}
                    value={this.state.busDetails.airConditioner}
                    name="airConditioner"
                    custom><br/>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Form.Control><br/>
               <Form.Group>Capacity</Form.Group>
               <Form.Control as="select"
                    className="mr-sm-2"
                    id="inlineFormCustomSelect" 
                    onChange={this.handleChange.bind(this)}
                    value={this.state.busDetails.capacity}
                    name="capacity"
                    custom><br/>
                    <option value="24">24</option>
                    <option value="36">36</option>
               </Form.Control><br/>
               <Form.Group>Bus Image</Form.Group>
               <Form.File type="file" name="image" accept="image/png, image/jpeg"  onChange={this.handleImage.bind(this)}/> 
               <Form.Group>Status</Form.Group>
                <Form.Control as="select"
                    className="mr-sm-2"
                    id="inlineFormCustomSelect" 
                    onChange={this.handleChange.bind(this)}
                    value={this.state.busDetails.status}
                    name="status"
                    custom><br/>
                    <option value="maintainance">Scheduled For Maintainance</option>
                    <option value="undergoingRepairs">Undergoing Repairs</option>
                    <option value="readyToUse" selected>Ready To Use</option>
                </Form.Control><br/>
                <Form.Group>Garage Id</Form.Group>
                <Form.Control as="select"
                    className="mr-sm-2"
                    id="inlineFormCustomSelect" 
                    onChange={this.handleChange.bind(this)}
                    value={this.state.busDetails.garageId}
                    name="garageId"
                    custom><br/>
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </Form.Control><br/>
               <Form.Group>Scheduled Service Date</Form.Group>
               <Form.Control type="text" name="scheduledDate" value={this.state.busDetails.scheduledDate} onChange={this.handleChange.bind(this)}/> <br/>
               {
                   (!this.state.update ? <Button type="submit">Add Fleet</Button> : <div><Button type="submit">Update Fleet</Button> <Button onClick={this.delete.bind(this)}>Delete Fleet</Button> </div> )
               }
               </form>
               {
                   (this.state.errors.length > 0 ? this.state.errors.map((error) => <div>{error}<br/></div>): "")
               }
               <br/>
           </div>
       );
    }





}