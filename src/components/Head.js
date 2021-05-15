import React,{Component} from 'react';
import {Link, useHistory} from "react-router-dom";
import {Nav,Navbar,Form,FormControl, NavLink} from 'react-bootstrap';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import '../../node_modules/font-awesome/css/font-awesome.min.css';

export default class Head extends Component{

  constructor(props)
  {
    super(props);
    this.state={
      isClicked:"Sign Up",
      link:"/signup",
      isLoggedIn:false
    }
    this.myLogoutHandler = this.myLogoutHandler.bind(this);
    this.myClickHandler = this.myClickHandler.bind(this);
  }
  componentDidMount()
  {
    if(sessionStorage.getItem('id') == null)
    {
      this.setState({isLoggedIn:false})
    }
    else
    {
      this.setState({isLoggedIn:true})
    }
  }
  myLogoutHandler()
  {
    this.setState({isLoggedIn:false});
    sessionStorage.clear();
  }
  myClickHandler(name)
  {
    if(this.state.isClicked=="Sign In")
    {
      this.setState({isClicked:"Sign Up"})
      this.setState({link:"/signup"})
    }
    else
    {
      this.setState({isClicked:"Sign In"})
      this.setState({link:"/"})
    }

  }
render(){

    return (
      <Navbar  style={{backgroundColor:"#242424"}} >
        <Navbar.Brand style={{marginLeft:"100px",fontSize:"30px"}}><Link style={{textDecoration:"none",color:"white"}} to="/"><i style={{padding:"10px"}} className="fa fa-cube"/>AddJency</Link></Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <NavLink style={{textDecoration:"none",fontSize:"20px",color: "white",margin:"5px"}} >Services</NavLink>
                <NavLink style={{textDecoration:"none",fontSize:"20px",color: "white",margin:"5px"}} >Contact</NavLink>
                <NavLink style={{textDecoration:"none",fontSize:"20px",color: "white",margin:"5px"}} >About</NavLink>
            </Nav>
            <Form inline >
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <i className="fa fa-search" style={{color:"white"}}/>
            </Form>{
            this.state.isLoggedIn?
            <NavLink onClick={this.myLogoutHandler} style={{textDecoration:"none",fontSize:"20px",color: "white",margin:"5px"}} ><Link to="/" >Sign Out</Link></NavLink>
            :
            <NavLink onClick={this.myClickHandler} style={{textDecoration:"none",fontSize:"20px",color: "white",margin:"5px"}} ><Link to={this.state.link} >{this.state.isClicked}</Link></NavLink>
            }
      </Navbar.Collapse>
    </Navbar>);
   }
}