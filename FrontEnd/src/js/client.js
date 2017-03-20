import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute, browserHistory} from "react-router";


import Layout from "./components/Layout";
import Header from "./components/header";
import Frontpage from "./components/frontpage";
import GetData from "./components/getdata";
import Uploader from "./components/uploader";
import MyParent from "./components/getdata2";
import UpdateData from "./components/updateData";
import Delete from "./components/delete";


require("../styles/stylesheet.scss");


const app = document.getElementById("app");
ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Layout}>
            <Route path="Header" component={Header}/>
            <Route path="Frontpage" component={Frontpage}/>
            <Route path="GetData" component={GetData}/>
            <Route path="Uploader" component={Uploader}/>
            <Route path="GetDataV2" component={MyParent}/>
            <Route path="UpdateData" component={UpdateData} />
            <Route path="Delete" component={Delete} />
        </Route>
    </Router>,app);


