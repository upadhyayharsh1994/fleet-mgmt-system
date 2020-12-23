import React from "react";
import {SpecificBusDetail} from './right-panel/SpecificBusDetail';
import {AddBusDetails} from './form-component/AddBusDetails';
import './box.css';
import { BusResaleValue } from './right-panel/BusResaleValue';
import {Card} from "react-bootstrap";
import axios from 'axios';

export class BusDetails extends React.Component
{

    constructor(props)
    {
        super(props);
        this.state={
            isBusDetails:false,
            busData:[]
        }
    }

    //Whenever Redirect is called from Other Compoenent to BusDetails, Bus Data should be refreshed from REST API call
    componentWillReceiveProps(props){
        let busData = [];
         axios.get('/fleet/getAllDetails').then((response) => {
            if(response)
            {
                for(const busDetails of response.data)
                {
                    busData.push(busDetails);
                }
            }

            this.setState({
                busData:busData,
                isBusDetails:false
            })

        });
    }


    //Before Component is mounted, API call to retrieve bus information
    componentWillMount()
    {

        let busData = [];
        axios.get('http://localhost:8080/fleet/getAllDetails').then((response) => {
            if(response)
            {
                for(var busDetails of response.data)
                {
                    busData.push(busDetails);
                }
            }

            this.setState({
                busData:busData,
                isBusDetails:false
            })

        });


    }

    //Event Handling whever bus image is clicked so that SpecificDetails is rendered on the right
    busDetailsClicked(busId) {

        this.setState({
            busId:busId,
            isBusDetails:true
        });

    }
   


    render(){
        return(
            <div className="float-container"> 
                <div className="grid">
                    {this.state.busData.map((bus) => {
                       return(<Card style={{ width: '5rem' }} className="box" onClick={() => this.busDetailsClicked(bus.busId)}>
                       <Card.Img variant="top" src={`data:image/jpeg;base64,${bus.image}`} className="img"/>
                           <Card.Body>
                               <Card.Title className="title">{bus.busName} </Card.Title>
                           </Card.Body>
                       </Card>)
                    })}
                </div>
                <div className="float-child">
                    <div>
                    {
                    //  Check if the details is clicked so that SpecificDetails is displayed
                     (this.state.isBusDetails ?  <SpecificBusDetail id={this.state.busId}></SpecificBusDetail> :<AddBusDetails/>)
                    }   
                    </div>
                    <div>
                        {
                        //  Check if the details is clicked so that Resale value  is displayed
                        (this.state.isBusDetails ?  <BusResaleValue id={this.state.busId}></BusResaleValue> : "")
                        }
                    </div>
                </div>
            </div>
        );
    }
}
