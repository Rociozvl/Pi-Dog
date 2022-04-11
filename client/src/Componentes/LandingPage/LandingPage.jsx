import React ,{Component} from "react";
import {Link} from "react-router-dom";
import LandingCSS from "./LandingPage.module.css"

export default class LandingPage extends Component{
    render(){
        return (
            <div className={LandingCSS.container}>
                <div className={LandingCSS.title_container}>
                    <h1>Welcome to Henry dogs</h1>
                   
                    <h3>Here to create races</h3> 
                </div>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <Link to="/home">
            Start
            </Link>
            </div>
        )
    }
};