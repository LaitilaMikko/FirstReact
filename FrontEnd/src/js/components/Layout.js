import React from "react";
import _ from "lodash";
import Axios from "axios";
import {Link} from "react-router";
import Header from "./header";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "ReactiSivu !",
            data: null
        };
    }

    render() {
        return (
            <div>
                <Header title="React Sivu !"/>
                <div>
                    <ul class="nav nav-tabs">
                        <li><Link to="Frontpage">Etusivu</Link></li>
                        <li><Link to="GetData">Hae kannasta</Link></li>
                        <li><Link to="Uploader">Lisää kantaan</Link></li>
                        <li><Link to="GetDataV2">Hae kannasta v.2</Link></li>
                        <li><Link to="UpdateData">Päivitä kantaa</Link></li>
                        <li><Link to="Delete">Poista kannasta</Link></li>
                    </ul>
                </div>
                {this.props.children}
            </div>
        );
    }
}
