import React, { useEffect } from 'react';
import reactDom from 'react-dom';
import { useHistory } from 'react-router';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/companyNotify.css";
import UserService from "../services/UserService";

function CompanyNotify(props)
{
    let history = useHistory();

    useEffect(()=>{
        history.push("/dashboard");
    });

    function accept() 
    { 
        let ad = {
            adId:props.adId,
            companyName: props.companyName,
            userId:props.userId,
            desc:props.description,
            adDate:props.date,
            status:"Accepted"
        }; 
        console.log(ad);
        UserService.createAd(ad);
        
    } 

    function reject()
    { 
        let ad = {
            adId:props.adId,
            companyName: props.companyName,
            userId:props.userId,
            desc:props.description,
            adDate:props.date,
            status:"Rejected"
        };
        console.log(ad);
        UserService.createAd(ad);
    }

    return(
        <div className="inner-company-notify">
            <p><b>Advertisement date : </b>{props.date}</p>
            <br/>
            <p><b>Description : </b>{props.description}</p>
            <br/>
            <input type="submit" className="btn1" value="Approve" onClick={accept} />
            <br/>
            <input type="submit" className="btn2" value="Reject" onClick={reject} />
        </div>
    );
}

export default CompanyNotify;