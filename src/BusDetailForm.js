import React from "react";
import { Redirect } from 'react-router-dom';

export class BusDetailForm extends React.Component{

    constructor(props)
    {
        super(props);
        this.state={
            busDetails:props.busObject,
            update:props.update,
            errors:[],
            redirect:false
        } 
    }

    componentWillReceiveProps(props)
    {
        this.setState({
            busDetails:props.busObject,
            update:props.update
        })
    }

    handleChange(e)
    {

        var busDetailLocal = this.state.busDetails;
        var elementName = e.target.name;
        console.log(elementName);
        busDetailLocal[elementName] = e.target.value;

        this.setState({
                busDetails: busDetailLocal,
        });

    }

    handleSubmit(e)
    {
        var busDetailsLocal = this.state.busDetails;
        var errors = this.validateBusDetails(busDetailsLocal);
        console.log(busDetailsLocal);
        if(errors.length > 0)
        {
            console.log(errors);
            this.setState({
                errors:errors
            })
            e.preventDefault();
            return false;
        }
        else
        {
            console.log(errors);
            this.setState({
                redirect:true
            })
            return true;
        }               
    }

    validateBusDetails(busDetails)
    {
        let errors = [];
        var isAirConditioned = busDetails['airConditioned'];
        if(!(isAirConditioned === "true" || isAirConditioned === "false"))
        {
            errors.push("Air Condition value must be either true or false");
        }
        var scheduledDate = Date.parse(busDetails['scheduledDate']);
        if(!scheduledDate)
        {
            errors.push("Date is invalid");
        }
        return errors;
    }


    render()
    {
       return (
           <div>
               <p> Fleet Registration </p><br/>
               <form onSubmit  ={this.handleSubmit.bind(this)}>
               <label>Fleet Name</label><br/>
               <input type="text" name="busName" value={this.state.busDetails.busName} onChange={this.handleChange.bind(this)}/>  <br/>
               <label>Make Year</label><br/>
               <input type="text" name="makeYear" value={this.state.busDetails.makeYear} onChange={this.handleChange.bind(this)}/>  <br/>
               <label>No Of Wheels</label><br/>
               <input type="text" name="noOfWheels" value={this.state.busDetails.noOfWheels} onChange={this.handleChange.bind(this)}/>  <br/>
               <label>Odometer Rating</label><br/>
               <input type="text" name="odometerReading" value={this.state.busDetails.odometerReading} onChange={this.handleChange.bind(this)}/>  <br/>
               <label>Air Conditioned</label><br/>
               <input type="text" name="airConditioned" value={this.state.busDetails.airConditioned} onChange={this.handleChange.bind(this)}/>  <br/>
               <label>Capacity</label><br/>
               <input type="text" name="capacity" value={this.state.busDetails.capacity} onChange={this.handleChange.bind(this)}/> <br/>
               <label>Status</label><br/> 
               <select name="busStatus" value={this.state.busDetails.busStatus} onChange={this.handleChange.bind(this)}><br/>
                    <option value="maintainance">Scheduled For Maintainance</option>
                    <option value="undergoingRepairs">Undergoing Repairs</option>
                    <option value="readyToUse">Ready To Use</option>
                </select><br/>
                <label>Garage Id</label><br/>
               <input type="text" name="garageId" value={this.state.busDetails.garageId} onChange={this.handleChange.bind(this)}/> <br/>
               <label>Scheduled Service Date</label><br/>
               <input type="text" name="scheduledDate" value={this.state.busDetails.scheduledDate} onChange={this.handleChange.bind(this)}/> <br/>
               <input type="submit" value="Add Fleet"/>
               </form>
               {
                   (this.state.errors.length > 0 ? this.state.errors.map((error) => <div>{error}<br/></div>): "")
               }
               <br/>
           </div>
       );
    }





}