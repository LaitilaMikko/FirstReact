import React from "react";
import Axios from "axios";

export default class Delete extends React.Component {
    constructor() {
        super();
        this.state = {
            options: [],
            selectvalue: null
        }
    }

    changeHandler(e) {
        this.setState({ selectvalue: e.target.value });
        Axios.post("http://localhost:3000/haevol2", {
            _id: e.target.value
        })
            .then((response) => {
                let data = response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleClick() {
        Axios.post("http://localhost:3000/delete",{
            id: this.state.selectvalue
        })
        .catch((error)=>{
            console.log(error);
        });
        window.location.reload();
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
            <div className="component">
                <h4>Poista oppilas tietokannasta</h4>
                <p>Kannassa olevat oppilaat:
                    <select onChange={this.changeHandler.bind(this)}>
                        <option key="testi" value="" defaultValue></option>
                        {this.state.options}
                    </select>
                    <input class="btn btn-danger" type="submit" defaultValue="poista" onClick={this.handleClick.bind(this)}></input>
                </p>
            </div>
        );
    }


}