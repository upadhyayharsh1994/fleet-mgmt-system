import React from "react";
import { Redirect } from 'react-router-dom';
import { Form,FormGroup, FormControl, Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {getProperty,validateBusDetails} from '../util/Utils'

export class BusDetailForm extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            busDetails:getProperty(props.busObject),
            update:props.update,
            errors:[],
            redirect:false
        } 
    }


    componentWillReceiveProps(props)
    {
        console.log(props.busObject);
        this.setState({
            busDetails:props.busObject,
            update:props.update
        })
    }

    handleChange(e)
    {

        var busDetailLocal = this.state.busDetails;
        var elementName = e.target.name;
        busDetailLocal[elementName] = e.target.value;

        this.setState({
                busDetails: busDetailLocal,
        });

    }

    handleSubmit(e)
    {
        var redirect = true;
        var error = [];
        var busDetailsLocal = this.state.busDetails;
        var errors = validateBusDetails(busDetailsLocal);
        console.log(busDetailsLocal);
        if(errors.length > 0)
        {
            this.setState({
                errors:errors
            })
            e.preventDefault();
            return false;
        }
        else
        {
            if(this.state.update)
            {
                axios.post('http://localhost:8080/fleet/editBusDetail',this.state.busDetails).then((result)=>{
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
                axios.post('http://localhost:8080/fleet/insertBusDetails',this.state.busDetails).then((result)=>{
                    this.setState({
                        redirect:true,
                        errors:error
                    })
                    redirect = true;
                })
            }
            return redirect;
        }               
    }


    delete(e)
    {
        axios.post('http://localhost:8080/fleet/deleteBusDetails/'+this.state.busDetails.busId).then((result)=>{
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
                {
                    (!this.props.update ? <div><Form.Group>Make Year</Form.Group><Form.Control type="text" name="makeYear" value={this.state.busDetails.makeYear} onChange={this.handleChange.bind(this)}/> </div> : " ")  
                } 
               <Form.Group>No Of Wheels</Form.Group>
               <Form.Control type="text" name="numberOfWheels" value={this.state.busDetails.numberOfWheels} onChange={this.handleChange.bind(this)}/> 
               <Form.Group>Odometer Rating</Form.Group>
               <Form.Control type="text" name="odometerReading" value={this.state.busDetails.odometerReading} onChange={this.handleChange.bind(this)}/>  
               <Form.Group>Air Conditioned</Form.Group>
               <Form.Control type="text" name="airConditioner" value={this.state.busDetails.airConditioner} onChange={this.handleChange.bind(this)}/> 
               <Form.Group>Capacity</Form.Group>
               <Form.Control type="text" name="capacity" value={this.state.busDetails.capacity} onChange={this.handleChange.bind(this)}/> 
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
                    <option value="readyToUse">Ready To Use</option>
                </Form.Control><br/>
                <Form.Group>Garage Id</Form.Group>
                <Form.Control as="select"
        className="mr-sm-2"
        id="inlineFormCustomSelect" 
        onChange={this.handleChange.bind(this)}
        value={this.state.busDetails.garageId}
        name="garageId"
        custom><br/>
                    <option value="1">1</option>
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