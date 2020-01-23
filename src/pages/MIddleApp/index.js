import React, { Component } from 'react';
import api from "../../services/api";


import Title from "../../components/Title";
import EndPage from "../../components/EndPage";
import "./styles.css";


// import { Container } from './styles';

export default class MIddleApp extends Component {
    
    state = {
        power: "",
        pcKey: "",
        colorPower: "",
        dateNow: "",
        processList: [],
    };
    
    componentDidMount() {
        this.getInfos();
        this.interval = setInterval(() => {
            this.getInfos();
        }, 2000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getInfos = async (e) => {
        //e.preventDefault();
        //console.log(this.refs.newItem.value);
        
        // Get the input text
        const pcKeyTemp = this.refs.newItem.value;

        // If the input text is empty, dont get response
        if (pcKeyTemp === ""){
            //console.log("A");
        } else {

            // Variable to request api
            const response = await api.get(`/findKey/${pcKeyTemp}`);
            //console.log(response);
            // If is empty our response means the item requested
            // Doesnt exists, so only get the infos if exists
            if (response.data.length !== 0){
                const power = response.data[0].power; // Picking power
            
                const pcKeySender = response.data[0].pcKey; // Picking pcKey
                const processes = response.data[0].processes;
                //console.log(processes);
                const created = response.data[0].createdAt;
    
                let colorPower = "";
    
                let powerSender = "";
                if (power === "true"){
                    powerSender = "on";
                    colorPower = "green";
                } else {
                    powerSender = "off";
                    colorPower = "red";
                } 
    
                this.setState({ 
                    power: powerSender, 
                    pcKey: pcKeySender, 
                    colorPower: colorPower,
                    dateNow: created,
                    processList: processes
                });
            
            } else {              
                this.setState({
                    power: 'Off or out of service', 
                    colorPower: "red"    
                });
    
            } 
    
        }
        
    }

  render() {
    return (
        <div className="middle">
            
            <Title />

            <form onSubmit={this.getInfos}>
                <input type="text" ref="newItem" className="inputKey"></input>
            </form>
            
            <p className="keyNumber">PC KEY: {this.state.pcKey}</p>
            <h1 className="showPower">Machine state is: <span style={{color: this.state.colorPower}}>{this.state.power}</span></h1>
            
            
            <div className="process-list">  
                <table>
                    <thead>
                        <tr>
                            <th>Process name</th>
                            <th>Memory Usage</th>
                        </tr>
                    </thead>

                    <tbody>
                {this.state.processList.map(process => {
                    return (
                        <tr key={process._id}>
                            <th>{process.name}</th>
                            <th>{process.memory_usage} %</th>
                        </tr>

                    );
                })}
                    </tbody>
                </table>
            </div>
            
            <EndPage />

        </div>
    );
  }
}

