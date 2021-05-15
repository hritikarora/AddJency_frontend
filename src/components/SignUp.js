import React, { Component } from "react";
import "../css/login.css";
import UserService from "../services/UserService";

export default class SignUp extends Component {

    constructor(props){
        super(props);
        this.state={
            userType:"Normal",
            email:"",
            password:"",
            firstname:"",
            lastname:"",
            companyName:""
        }
    
        this.myChangeHandler=this.myChangeHandler.bind(this);
        this.mySubmitHandler=this.mySubmitHandler.bind(this);
     }
    myChangeHandler(event)
    {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]:val})
    }
    mySubmitHandler(event)
    {
        if(this.state.userType==="Company")
        {
            if(this.state.companyName.length>0 && this.state.email.length>0 && this.state.password.length>0 && this.state.firstname.length>0 && this.state.lastname.length>0)
            {
                let user = {userType:this.state.userType,companyName:this.state.companyName,firstName:this.state.firstname,lastName:this.state.lastname,emailId:this.state.email,password:this.state.password};
                console.log(user);
                UserService.createUser(user);
                alert("Registration successful"); 
            }
        }
        else if(this.state.email.length>0 && this.state.password.length>0 && this.state.firstname.length>0 && this.state.lastname.length>0)
        {
            let user = {userType:this.state.userType,companyName:"",firstName:this.state.firstname,lastName:this.state.lastname,emailId:this.state.email,password:this.state.password};
            console.log(user);
            UserService.createUser(user);
            alert("Registration successful");
        }
        
    }

    render() {
        return (
            <div class="outer">
            <form onSubmit={this.mySubmitHandler} >
                <div className="Model-up">
                    <h2 className="tag">Sign Up!</h2><br/>

                    <select name="userType" onChange={this.myChangeHandler} value={this.state.userType} > 
                        <option value="Normal">Normal</option>
                        <option value="Company">Company</option>
                    </select><br/>

                    <input className={this.state.userType=="Normal"?"hidden":"0"} type="text" name="companyName" onChange={this.myChangeHandler} value={this.state.companyName} placeholder="Company name" /><br/>
                    
                    <input type="text" name="firstname" onChange={this.myChangeHandler} value={this.state.firstname} placeholder="First name" /><br/>
                    
                    <input type="text" name="lastname" onChange={this.myChangeHandler} value={this.state.lastname} placeholder="Last name" /><br/>
            
                    <input name="email" onChange={this.myChangeHandler} value={this.state.email} type="email" placeholder="Email" /><br/>
        
                    <input name="password" onChange={this.myChangeHandler} value={this.state.password} type="password" placeholder="Password" /><br/>
    
                    <input type="submit" value="Submit" className="bt" />
    
                    <p className="forgot-password">
                        Already registered <a href="/">log in?</a>
                    </p>
                </div>
            </form>
            </div>
            
        );
    }
}
