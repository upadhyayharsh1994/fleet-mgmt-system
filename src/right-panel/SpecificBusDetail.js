import React from "react";
import { BusDetailForm } from '../form/BusDetailForm';
import  axios  from 'axios';
export class SpecificBusDetail extends React.Component{

    constructor(props)
    {
        super(props);

        this.state={
            busId : props.id,
            busDetails:{}
        }
    }

    //Function handles REST API call to get specific details whevever this component receives object
    componentWillReceiveProps(props)
    {
        var id = props.id;
        axios.get('http://localhost:8080/fleet/getDetails/'+id).then((bus) => {

            this.setState({
                busId:props.id,
                busDetails:bus.data
            })     
        })

    }

    //Before mounting the component, Retrieving bus details from REST API
    componentWillMount()
    {
        var id = this.state.busId;

        axios.get('http://localhost:8080/fleet/getDetails/'+id).then((bus) => {

            this.setState({
                busDetails:bus.data
            })
        })
    }


    render()
    {
       return (
           <div>
                <BusDetailForm busObject={this.state.busDetails} update={true}></BusDetailForm>
            </div>

       );
    }
}