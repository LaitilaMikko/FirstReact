import React from "react";
import Axios from "axios";
import serialize from "form-serialize";

export default class Showdata extends React.Component {
    constructor() {
        super();
        this.state = {
            data: null,
            success: false
        }
    }
    handleClick(e) {
        let form = document.getElementById("updateForm");
        let data = serialize(form, { hash: true });
        this.updateToDb(data);
    }
    updateToDb(data) {
        Axios.post("http://localhost:3000/update", {
            id: this.props.selectedId,
            nimi: data.nimi,
            ikä: data.ikä,
            ryhmä: data.ryhmä,
            opintopisteitä: data.opintopisteitä,
            valmistuu: data.valmistuu
        })
            .catch((error) => {
                console.log(error);
            });
        this.forceUpdate();
    }

    componentDidUpdate() {
        var oppilas = this.props.data[0];
        document.getElementById("nimi").value = oppilas.nimi;
        document.getElementById("ika").value = oppilas.ikä;
        document.getElementById("ryhma").value = oppilas.ryhmä;
        document.getElementById("opintopisteita").value = oppilas.opintopisteitä;
        document.getElementById("valmistuu").value = oppilas.valmistuu;
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.data == nextProps.data) {
            return false;
        } else { return true; }
    }
    render() {
        return (
            <div>
                <ul>
                    <form id="updateForm">
                        <p><input id="nimi" placeholder="Nimi" name="nimi"></input></p>
                        <p><input id="ika" placeholder="Ikä" name="ikä"></input></p>
                        <p><input id="ryhma" placeholder="Ryhmä" name="ryhmä"></input></p>
                        <p><input id="opintopisteita" placeholder="Opintopisteitä" name="opintopisteitä"></input></p>
                        <p><input id="valmistuu" placeholder="Valmistuu" name="valmistuu"></input></p>
                        <input class="btn btn-success" type="submit" defaultValue="SAVE" onClick={this.handleClick.bind(this)}></input>
                    </form>
                </ul>
            </div>
        );

    }
}