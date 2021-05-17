import React, {useState} from "react";
import "../css/login.css";
import { Redirect, useHistory} from "react-router-dom";
import UserService, { USER_NAME_SESSION_ATTRIBUTE_NAME } from "../services/UserService";
import { Modal, ModalBody } from 'reactstrap';
import {
    Card, CardImg
  } from 'reactstrap';
import Popup from '../../node_modules/reactjs-popup';
import {Link} from "react-router-dom";
import img1 from "../images/toi2.webp";
import img2 from "../images/patrika2.jpg";
import img3 from "../images/ndtv.jpg";
import img4 from "../images/hindu.jpg";
import Charts from "./Charts";

function LoginPage(props){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");    
    const [modalIn, setModalIn] = useState(false);
    const [modalOut, setModalOut] = useState(false);
    const [userType, setUserType]= useState("Normal");

    const [firstname,setFirstname] = useState("");
    const [lastname,setLastname] = useState("");
    const [companyName,setCompanyname]=useState("");

    const history = useHistory();

    const mySubmitHandler = () =>{
      if(userType==="Company")
        {
            if(companyName.length>0 && email.length>0 && password.length>0 && firstname.length>0 && lastname.length>0)
            {
                let user = {userType:userType,companyName:companyName,firstName:firstname,lastName:lastname,emailId:email,password:password};
                console.log(user);
                UserService.createUser(user);
                alert("Registration successful"); 
                history.push("/");
            }
        }
        else if(email.length>0 && password.length>0 && firstname.length>0 && lastname.length>0)
        {
            let user = {userType:userType,companyName:"",firstName:firstname,lastName:lastname,emailId:email,password:password};
            console.log(user);
            UserService.createUser(user);
            alert("Registration successful");
            history.push("/");
        }
    };

    const handleSubmit = () => {

        if(UserService.validateUser(email,password))
        {
            alert("login success !");
            history.push("/dashboard");
        }
        else{
            alert("incorrect credentials")
        }
      };

    const toggle = ((event) => 
    {
        if(event.target.name == "modalIn")
        {
            setModalIn(!modalIn);
        }
        else{
            setModalOut(!modalOut);
        }

    });
    
    return (

        <div className="page-wrapper">
            <section className="hero-section">
                <div className="welcome">
                    <h1 style={{color:"white",fontSize:"60px"}}>Welcome to AddJency</h1>
                </div>
                <div className="l-o-s">
                    <a name="modalIn" onClick={toggle} style={{fontSize:"30px",color:"aquamarine"}}>Login</a>
                    <div style={{marginLeft:"20px",marginRight:"20px",width:"3px",backgroundColor:"yellow",height:"50px"}}></div>
                    <a name="modalOut" onClick={toggle} style={{fontSize:"30px",color:"aquamarine"}}>Sign up</a>

                </div>
                <div style={{backgroundColor:"whitesmoke",borderRadius:"45px"}}>
                <Modal  name="modalIn" isOpen={modalIn} toggle={(event)=>setModalIn(!modalIn)}>
                    <ModalBody style={{backgroundColor:"whitesmoke",borderRadius:"45px"}} >
                        <form onSubmit={handleSubmit} >
                          <div className="Model-in">
                                <h2 className="tag">Log In!</h2>
                                    
                                <input name="email" type="email" value={email} onChange={(Event)=>{setEmail(Event.target.value)}} placeholder="Email" /><br/>
                                
                                <input name="password" type="password" value={password} onChange={(Event)=>{setPassword(Event.target.value)}} placeholder="Password" /><br/>
                                
                                <input type="submit" value="submit" className="bt" />
                                    
                                <p style={{color:"whitesmoke"}} className="forgot-password">
                                    Forgot <a href="#">password?</a>
                                </p>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
                </div>
                <Modal name="modalOut" isOpen={modalOut} toggle={(event)=>setModalOut(!modalOut)} >
                    <ModalBody >
                        <form onSubmit={mySubmitHandler}>
                            <div className="Model-up">
                                <h2 className="tag">Sign Up!</h2><br/>

                                <select name="userType" onChange={(Event)=>{setUserType(Event.target.value)}} value={userType} > 
                                    <option value="Normal">Normal</option>
                                    <option value="Company">Company</option>
                                </select><br/>

                                <input className={userType=="Normal"?"hidden":"0"} type="text" name="companyName" onChange={(Event)=>{setCompanyname(Event.target.value)}} value={companyName} placeholder="Company name" /><br/>
                                
                                <input type="text" name="firstname" onChange={(Event)=>{setFirstname(Event.target.value)}} value={firstname} placeholder="First name" /><br/>
                                
                                <input type="text" name="lastname" onChange={(Event)=>{setLastname(Event.target.value)}} value={lastname} placeholder="Last name" /><br/>
                        
                                <input name="email" onChange={(Event)=>{setEmail(Event.target.value)}} value={email} type="email" placeholder="Email" /><br/>
                    
                                <input name="password" onChange={(Event)=>{setPassword(Event.target.value)}} value={password} type="password" placeholder="Password" /><br/>
                
                                <input type="submit" value="Submit" className="bt" />
                
                                <p className="forgot-password">
                                    Already registered <a href="/">log in?</a>
                                </p>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>

            </section>
            <div className="row col-lg-12">
                <section className="about-section col-lg-6">
                    <h1 style={{display:"flex",flexDirection:"row",justifyContent:"center",padding:"40px"}}>Our company</h1>
                        <div style={{padding:"10px"}}>
                            <div className="about-text">
                            <span><h4>AddJency is an advertisement coordinator website that lets you decide which company is best for you to post your advertisement.
                              
                              </h4>
                            </span>
                            </div>
                        </div>
                </section>
                <section className="stats col-lg-6">
                    <Charts />
                </section>
            </div>
            <section className="partners">
                <h2 style={{display:"flex",flexDirection:"row",justifyContent:"center",padding:"40px",fontWeight:"bolder"}}>Our Partners</h2>

                <div className="row" style={{margin:"20px"}}>
                    <div className="col-lg-3">
                        <Card>
                            <CardImg top width="100%" src={img2} alt="Card image cap" />
                        </Card>
                    </div>

                    <div className="col-lg-3">
                        <Card>
                            <CardImg top width="100%" src={img1} alt="Card image cap" />
                            
                        </Card>
                    </div>

                    <div className="col-lg-3">
                        <Card>
                            <CardImg top width="100%" src={img3} alt="Card image cap" />
                        </Card>
                    </div>

                    <div className="col-lg-3">
                        <Card>
                            <CardImg top width="100%" src={img4} alt="Card image cap" />
                        </Card>
                    </div>
 
                </div>
            </section>
            <div className='footer-container'>

      <section className='subscription'>
        <h2>Subscribe to our newsletter to get latest offers</h2>
        <h3 >You can unsubscribe at any time</h3>
        <div>
          <form>
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Your Email'
            />
            <input className='btn-danger' type="button" value="Subscribe" />
          </form>
        </div>
      </section>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              AddJency
              <i className='fa fa-typo3' />
            </Link>
          </div>
          <small className='website-rights'>AddJency © 2020</small>
          <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fa fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fa fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='Youtube'
            >
              <i className='fa fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fa fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fa fa-linkedin' />
            </Link>
          </div>

        </div>
      </section>
    </div>
        </div>
    );
}
export default LoginPage;