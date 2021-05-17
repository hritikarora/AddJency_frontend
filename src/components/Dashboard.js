import react,{Component} from 'react';
import reactDom from 'react-dom';
import {Link} from 'react-router-dom';
import {NavDropdown,Navbar,Form,FormControl} from 'react-bootstrap';

// import css
import '../css/dash.css';

import "../../node_modules/font-awesome/css/font-awesome.min.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

// import components
import Card from "./Card.js";
import Notify from './Notify';
import CompanyNotify from './CompanyNotify';
import UserService,{USER_NAME_SESSION_ATTRIBUTE_NAME} from "../services/UserService";
import Charts from "./Charts";

// import images
import hin from "../images/hindu.jpg";
import toi from "../images/toi.png";
import pat from "../images/patrika2.jpg";
import msg from "../images2/icons/Emai_nav_outlined.svg";
import mag1 from "../images/mag2.png";
import mag2 from "../images/mag5.jpg";
import mag3 from "../images/mag4.jpg";
import mag5 from "../images/mag6.png";
import rad1 from "../images/rad1.jpg";
import rad2 from "../images/rad2.jpeg";
import rad3 from "../images/rad3.jpg";

class Dashboard extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      //page transition
      currentPage:"Dashboard",
      
      //post an add
      companyName:"",
      description:"",
      Ad_date:"",
      companies:[],

      //notifications
      adItems:null,
      adItemsCompany:null,
      
      // user profile
      userType:"",
      firstname:"",
      lastname:"",
      email:"",
    }
    this.mySubmitHandler = this.mySubmitHandler.bind(this)
    this.myLogoutHandler = this.myLogoutHandler.bind(this)
  }

  componentDidMount()
  {
    const user = JSON.parse(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME));
    console.log(user)
    
    this.setState({firstname:user.firstname});
    this.setState({lastname:user.lastname});
    this.setState({email:user.email});
    this.setState({userType:user.userType});
    

    // getting all ads for normal user
    const items = UserService.getAllAds().then((ad) =>
     {
       console.log(ad)
       const items = ad.map((item) => 
        <Notify companyName={item['companyName']} date={item['adDate']} status={item['status']} />
        )
        this.setState({adItems:items});
     }
    );
    
    // getting all ads for a company for company user
    const items2 = UserService.getAllAdsByCompanyName().then((ad) =>
    {
      console.log(ad)
      const items = ad.map((item) => 
       <CompanyNotify adId={item['adId'] } companyName={item['companyName']} userId={item['userId']} description={item['desc']} date={item['adDate']} status={item['status']}  />
       )
       this.setState({adItemsCompany:items});
    }
   );

   //getting dynamic dropdown list of companies in post an add
    let arr=UserService.getCompanyNames(); 
    console.log(arr) ;
    let companies1=[{id:0,name:"select company"}]; 
    arr.then((companies)=> { 
      for(let i=0;i<companies.length;i++) 
      
        if(companies[i]!="") 
        { 
          companies1[i+1]=
          { 
            name:companies[i] 
          } 
        }  
      } 
    ); 

  this.setState({ companies: companies1 }); 
  }

  //logout handle
  myLogoutHandler()
  {
    sessionStorage.clear();
  }

  // sending ad post request
  mySubmitHandler()
  {
    let user = JSON.parse(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME));
    
    if(this.state.companyName.length>0 && this.state.description.length>0)
    {
      let ad = {companyName:this.state.companyName,userId:user['id'],desc:this.state.description,adDate:this.state.Ad_date,status:"Pending"};
      console.log(ad);
      UserService.createAd(ad);
      alert("Ad request sent successfully!"); 
    }
    this.componentDidMount();
  }

  render()
  {

    this.myClickHandler=(event)=>
    {
      this.setState({currentPage:event.target.name})
    }

    this.myChangeHandler=(event)=>
    {
      let nam = event.target.name;
      let val = event.target.value;

      this.setState({[nam] : val});
    }

  return (
    this.state.userType === "Normal"?

    <div className="out">

      <div class="sidebar-wrapper">
        <nav className="sidebar-root">
          <header className="sidebar-logo">
          <i style={{padding:"10px"}} className="fa fa-cube"/>
            <span>AddJency</span>
          </header>
          <h5 className="sidebar-nav-title">APP</h5>
          <ul className="sidebar-ul">
            <li className="sidebar-li">
              <a name="Dashboard" class={this.state.currentPage=="Dashboard"?"active":""} onClick={this.myClickHandler}>
              <i style={{padding:"10px"}} className="fa fa-columns"/>
                Dashboard
              </a>
            </li>
            <li className="sidebar-li">
              <a name="Ad" class={this.state.currentPage=="Ad"?"active":""} onClick={this.myClickHandler} >
              <i style={{padding:"10px"}} className="fa fa-audio-description"/>
                Post an Ad</a>
            </li>
            <li className="sidebar-li">
              <a name="Profile" class={this.state.currentPage=="Profile"?"active":""} onClick={this.myClickHandler} >
              <i style={{padding:"10px"}} className="fa fa-address-book"/>
                User Profile</a>
            </li>
          </ul>
          <hr></hr>
          <ul className="sidebar-ul">
            <li className="sidebar-li">
              <a href="#contact">
              <i style={{padding:"10px"}} className="fa fa-address-book"/>
              Contact</a>
            </li>
      
          </ul>
        </nav>
      </div>

    <div class="layout-wrap">

      <Navbar  style={{display:"flex",justifyContent:"right",backgroundColor: "rgb(50, 50, 50)",zIndex: "100",height:"76px"}} expand="lg" >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline style={{margin:"10px"}}>
            <FormControl style={{width:"300px"}} type="text" placeholder="Search" className="mr-sm-2" />
            <i style={{color:"white"}} className="fa fa-search"></i>
        </Form>
        <NavDropdown title={<img src={msg}></img>} id="basic-nav-dropdown">
          {this.messages}
        </NavDropdown>
        <NavDropdown title={<span className="avatar" >H</span>} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1"><i style={{padding:"4px"}} className="fa fa-user-circle"></i>Account</NavDropdown.Item>
          <NavDropdown.Item onClick={this.myLogoutHandler} ><i style={{padding:"4px"}} className="fa fa-sign-out"></i><Link style={{textDecoration:"none",color:"black"}} to="/" >Sign Out</Link></NavDropdown.Item>
        </NavDropdown>  
      </Navbar.Collapse>  
      </Navbar>

      <div className="inner-content">
      {
        this.state.currentPage==="Dashboard"
        ?
        <div className="col-lg-9 outer-div">
          <h3>Popular <i class="fa fa-angle-right"></i></h3>
          <div className="row">
            <Card className="card" src={rad1} alt={"Radio mirchi"} onClick={(e)=>this.handleClick(e)} />
            <Card className="card" src={mag5} alt={""} onClick={(e)=>this.handleClick(e)} />
            <Card className="card" src={mag1} alt={"hindu"} onClick={(e)=>this.handleClick(e)} />
          </div>
          <br></br>
          <br></br>
          <h3>Newspaper <i class="fa fa-angle-right"></i></h3>
          <div className="row">
            <Card className="card" src={toi} alt={"times of india"} title={"TOI"} onClick={(e)=>this.handleClick(e)} />
            <Card className="card" src={pat} alt={"patrika"} title={"Patrika"} onClick={(e)=>this.handleClick(e)} />
            <Card className="card" src={hin} alt={"hindu"} title={"The Hindu"} onClick={(e)=>this.handleClick(e)} />
          </div>
          <br></br>
          <br></br>
          <h3>Magazine <i class="fa fa-angle-right"></i></h3>
          <div className="row">
            <Card className="card" src={mag1} alt={"times of india"} title={"TOI"} onClick={(e)=>this.handleClick(e)} />
            <Card className="card" src={mag2} alt={"patrika"} title={"Patrika"} onClick={(e)=>this.handleClick(e)} />
            <Card className="card" src={mag3} alt={"hindu"} title={"The Hindu"} onClick={(e)=>this.handleClick(e)} />
          </div>
          <br></br>
          <br></br>
          <h3>Radio <i class="fa fa-angle-right"></i></h3>
          <div className="row">
            <Card className="card" src={rad1} alt={"times of india"} title={"TOI"} onClick={(e)=>this.handleClick(e)} />
            <Card className="card" src={rad2} alt={"patrika"} title={"Patrika"} onClick={(e)=>this.handleClick(e)} />
            <Card className="card" src={rad3} alt={"hindu"} title={"The Hindu"} onClick={(e)=>this.handleClick(e)} />
          </div>
        </div>
        :
        this.state.currentPage==="Ad"?
          <div className="col-lg-9 outer-div">
              <div className="postAd">
                      <form className="form-group" onSubmit={this.mySubmitHandler} >
                          <h2 className="heading">Post an Advertisement</h2><br/>

                          <select name="companyName" onChange={this.myChangeHandler} value={this.state.companyName} > 
                          {
                          (this.state.companies).length > 0 && (this.state.companies).map((item, i) => {
                             return ( <option key={i+1} value={item.name}>{item.name}</option> 
                             ) 
                             }, this)}
                          </select> 
                          <br/>
                          <hr/>
                          <label for="Ad_post_date">Select Date : </label>
                          <input type="date" name="Ad_date" onChange={this.myChangeHandler} placeholder="Ad post date" /><br/>
                          <hr/>
                          <textarea type="text" name="description" onChange={this.myChangeHandler} value={this.state.description} placeholder="Description" /><br/>
                          <input type="submit" name="submit" value="submit" className="btn btn-primary" />
                      </form>
                      </div>
          </div>
          :
          <div className="col-lg-9 outer-div">
              <div className="row">
              <div className="profile">
                  <i style={{fontSize:"84px",padding:"15px",marginRight:"20px"}} class="fa fa-user-circle"></i>
                      <form className="form-group" onSubmit={this.mySubmitHandler} >
                          <h2 className="heading">{this.state.firstname} {this.state.lastname}</h2><br/>
                          <h3>User Type : </h3><p>{this.state.userType}</p><br/>
                          
                          <h3>Email id : </h3><p>{this.state.email}</p><br/>
                      </form>
                  </div>
                  </div>
          </div>
      }
      <div className="outer-outer col-lg-3">
        <section className="inner-section">
          <header className="section-header">Status</header>
        {this.state.adItems}
        </section>
      </div>

    </div>
    </div>

    </div>
    :
    <div className="out">

      <div class="sidebar-wrapper">
        <nav className="sidebar-root">
          <header className="sidebar-logo">
          <i style={{padding:"10px"}} className="fa fa-cube"/>
            <span>AddJency</span>
          </header>
          <h5 className="sidebar-nav-title">APP</h5>
          <ul className="sidebar-ul">
            <li className="sidebar-li">
              <a name="Dashboard" class={this.state.currentPage=="Dashboard"?"active":""} onClick={this.myClickHandler}>
              <i style={{padding:"10px"}} className="fa fa-columns"/>
                Dashboard
              </a>
            </li>
            <li className="sidebar-li">
              <a name="Profile" class={this.state.currentPage=="Profile"?"active":""} onClick={this.myClickHandler} >
              <i style={{padding:"10px"}} className="fa fa-address-book"/>
                User Profile</a>
            </li>
          </ul>
          <hr></hr>
          <ul className="sidebar-ul">
            <li className="sidebar-li">
              <a href="#contact">
              <i style={{padding:"10px"}} className="fa fa-address-book"/>
              Contact</a>
            </li>
          </ul>
        </nav>
      </div>
      
      <div className="layout-wrap">
      <Navbar  style={{display:"flex",justifyContent:"right",backgroundColor: "rgb(50, 50, 50)",zIndex: "100",height:"76px"}} expand="lg" >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form inline style={{margin:"10px"}}>
            <FormControl style={{width:"300px"}} type="text" placeholder="Search" className="mr-sm-2" />
            <i style={{color:"white"}} className="fa fa-search"></i>
        </Form>
        <NavDropdown title={<img src={msg}></img>} id="basic-nav-dropdown">
          {this.messages}
        </NavDropdown>
        <NavDropdown title={<span className="avatar" >H</span>} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1"><i style={{padding:"4px"}} className="fa fa-user-circle"></i>Account</NavDropdown.Item>
          <NavDropdown.Item onClick={this.myLogoutHandler} ><i style={{padding:"4px"}} className="fa fa-sign-out"></i><Link style={{textDecoration:"none",color:"black"}} to="/" >Sign Out</Link></NavDropdown.Item>
        </NavDropdown>  
      </Navbar.Collapse>  
      </Navbar>
    <div class="inner-content">
      {
        this.state.currentPage==="Dashboard"?

        <div className="outer-div">
          <div className="row">
            {this.state.adItemsCompany}
          </div>
        </div>
        :
        <div className="col-md-8 outer-div">
              <div className="row">
              <div className="profile">
                  <i style={{fontSize:"84px",padding:"15px",marginRight:"20px"}} class="fa fa-user-circle"></i>
                      <form className="form-group" onSubmit={this.mySubmitHandler} >
                          <h2 className="heading">{this.state.firstname} {this.state.lastname}</h2><br/>
                          <h3>User Type : </h3><p>{this.state.userType}</p><br/>
                          
                          <h3>Email id : </h3><p>{this.state.email}</p><br/>
                      </form>
                  </div>
              </div>
          </div>
      }

    </div>
    </div>
    </div>
  );
 }
}

export default Dashboard;