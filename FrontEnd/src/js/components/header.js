import React from "react";


export default class Header extends React.Component {
    render(){
        const {history} = this.props;
        return (
            <div>
                <h1 id="otsikko">{this.props.title}</h1>
            </div>
        );
    }
}
