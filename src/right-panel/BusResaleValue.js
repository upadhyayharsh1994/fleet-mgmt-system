import React from "react";
import axios from 'axios';
import {Jumbotron} from 'react-bootstrap'

export class BusResaleValue extends React.Component{
    constructor(props)
    {
        super(props);
        this.state={
            busId:props.id,
            display:false,
            resaleValue:0
        }
    }

    componentWillMount()
    {
        axios.get('http://localhost:8080/fleet/resaleValue/'+this.state.busId).then((response) => {
            this.setState({
                resaleValue:response.data,
                display:true
            })

        });
    }


    componentWillReceiveProps(props)
    {
        axios.get('http://localhost:8080/fleet/resaleValue/'+props.id).then((response) => {
            this.setState({
                resaleValue:response.data,
                display:true
            })

        });
    }


    render(){

        return(
            <div>
                {
                    (this.state.display ? <Jumbotron style={{color: "#007bff",border:"2px solid #007bff"}}><h6> The Resale value of Bus is :</h6><br/><p>{this.state.resaleValue}</p></Jumbotron> : "" )
                }
            </div>

        );
    }

}