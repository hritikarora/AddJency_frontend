import React from 'react';
import reactDom from 'react-dom';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/companyNotify.css";

function CompanyNotify(props)
{
    return(
        <div className="inner-company-notify">
            <p><b>Advertisement date : </b>{props.adDate}</p>
            <br/>
            <p><b>Description : </b>{props.desc}</p>
            <br/>
            <input type="submit" className="btn1" value="Approve" />
            <br/>
            <input type="submit" className="btn2" value="Reject" />
        </div>
    );
}

export default CompanyNotify;