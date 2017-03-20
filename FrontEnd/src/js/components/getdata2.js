import React from "react";
import Axios from "axios";
import Showdata from "./showdata";

export default class MyParent extends React.Component {
    constructor() {
        super();
        this.state = {
            options: [],
            selectvalue: null,
            data: {},
            oppilas: null,
            haettu: false
        }
    }
    changeHandler(e) {
        this.setState({ selectvalue: e.target.value });
        Axios.post("http://localhost:3000/haevol2", {
            _id: e.target.value
        })
            .then((response) => {
                let data = response.data[0];
                this.setState({ oppilas: data });
                this.setState({haettu: true});

            })
            .catch((error) => {
                console.log(error);
            });
    }
    componentDidMount() {
        Axios.get("http://localhost:3000/haeKaikki", {
        })
            .then((response) => {
                let data = (response.data);
                this.successHandler(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    successHandler(data) {
        for (let i = 0; i < data.length; i++) {
            let option = data[i];
            this.state.options.push(
                <option key={i} value={option._id}>{option.nimi}</option>
            );
        }
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <h4>Valitse oppilas nähdäksesi hänen tietonsa</h4>
                <br></br>
                <p>Kannassa olevat oppilaat:
                        <select onChange={this.changeHandler.bind(this)}>
                        <option key="testi" value="" defaultValue></option>
                        {this.state.options}
                    </select>
                </p>
                <br />
                {this.state.haettu &&
                    <div>
                        <p>Nimi: {this.state.oppilas.nimi}</p>
                        <p>Ikä: {this.state.oppilas.ikä}</p>
                        <p>Ryhmä: {this.state.oppilas.ryhmä}</p>
                        <p>Opintopisteitä: {this.state.oppilas.opintopisteitä}</p>
                        <p>Valmistuu: {this.state.oppilas.valmistuu}</p>
                    </div>
                }
            </div>
        );
    }
}

