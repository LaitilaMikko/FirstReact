import React from "react";
import Axios from "axios";

export default class GetData extends React.Component {
    constructor() {
        super();
        this.state = {
            invalidData: true,
            haettu: false
        }
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.invalidData = !(nextState.name);
    }

    handleClick() {
        let hakuSana = document.getElementById("haku").value;
        this.getByName(hakuSana);
    }

    getByName(name) {
        Axios.post("http://localhost:3000/hae", {
            nimi: name
        })
            .then((response) => {
                if (response.data.length > 0) {
                    this.setState(response.data[0]);
                    this.setState({ haettu: true });
                }else {
                    this.setState({haettu: false});
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    nameChange(e) {
        this.setState({ name: e.target.value });
    }
    render() {
        return (
            <div>
                <br></br>
                <h3>Hae tietokannasta nimellä</h3>
                <input onChange={this.nameChange.bind(this)} type="text" id="haku"></input>
                <button class="btn btn-success" disabled={this.state.invalidData} onClick={this.handleClick.bind(this)}>Hae Nimellä</button>
                {this.state.haettu &&
                    <ul>
                        <br></br>
                        <h5>Result: </h5>
                        <p>Nimi: {this.state.nimi}</p>
                        <p>Ikä: {this.state.ikä}</p>
                        <p>Opintopisteitä: {this.state.opintopisteitä}</p>
                        <p>Ryhmä: {this.state.ryhmä}</p>
                        <p>Valmistuu: {this.state.valmistuu}</p>
                    </ul>
                }
            </div>
        );
    }
}