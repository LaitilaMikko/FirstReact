import React from "react";
import serialize from "form-serialize";
import Axios from "axios";



export default class Uploader extends React.Component {
    constructor(){
        super();
        this.state = {
            invalidData: true
        }
    }
    handleClick(e) {
        e.preventDefault();
        let form = document.getElementById("uploadForm");
        let data = serialize(form, { hash: true });
        this.postToDb(data);
        form.reset();
    }

    componentWillUpdate(nextProps,nextState) {
        nextState.invalidData = !(nextState.name && nextState.ika && nextState.ryhma && nextState.op && nextState.valmistuu);
    }

    postToDb(data) {
        Axios.post("http://localhost:3000/addStudent", {
            nimi: data.nimi,
            sukupuoli: data.sukupuoli,
            ikä: data.ika,
            ryhmä: data.ryhma,
            opintopisteitä: data.opintopisteita,
            valmistuu: data.valmistuu
        })
            .catch((error) => {
                console.log(error);
            });
    }
    nameChange(e){
        this.setState({name: e.target.value});
    }
    ikaChange(e){
        this.setState({ika: e.target.value});
    }
    ryhmaChange(e){
        this.setState({ryhma: e.target.value});
    }
    OPChange(e){
        this.setState({op: e.target.value});
    }
    valmistuuChange(e){
        this.setState({valmistuu: e.target.value});
    }


    render() {
        return (
            <div className="component">
                <br />
                <h4>Lisää oppilaita tietokantaan</h4>
                <br></br>
                <form id="uploadForm">
                    <p><input onChange={this.nameChange.bind(this)} placeholder="Nimi" name="nimi"></input></p>
                    <p><input onChange={this.ikaChange.bind(this)} placeholder="Ikä" name="ika"></input></p>
                    <p><input onChange={this.ryhmaChange.bind(this)} placeholder="Ryhmä" name="ryhma"></input></p>
                    <p><input onChange={this.OPChange.bind(this)} placeholder="Opintopisteitä" name="opintopisteita"></input></p>
                    <p><input onChange={this.valmistuuChange.bind(this)} placeholder="Valmistuu" name="valmistuu"></input></p>
                    <p><button disabled={this.state.invalidData} class="btn btn-success" type="submit" onClick={this.handleClick.bind(this)}>LISÄÄ TIETOKANTAAN</button></p>
                </form>
            </div>
        );
    }

}


