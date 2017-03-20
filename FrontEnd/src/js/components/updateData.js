import React from "react";
import Axios from "axios";
import Showdata from "./showdata"

export default class updateData extends React.Component {
    constructor() {
        super();
        this.state = {
            options: [],
            selectvalue: null,
            haettuData: {}
        }
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
    changeHandler(e) {
        this.setState({ selectvalue: e.target.value });
        Axios.post("http://localhost:3000/haevol2", {
            _id: e.target.value
        })
            .then((response) => {
                let data = response.data;
                this.setState({haettuData: data});
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        return (
            <div>
                <h4>Päivitä tietokannassa olevien oppilaiden tietoja</h4>
                <p>Kannassa olevat oppilaat:
                <select onChange={this.changeHandler.bind(this)}>
                        <option key="testi" value="" defaultValue></option>
                        {this.state.options}
                    </select></p>
                <Showdata data={this.state.haettuData} selectedId={this.state.selectvalue} />
            </div>
        );
    }

}