import React from 'react';
import reactDom from 'react-dom';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/notify.css";

function Notify(props)
{
    return(
        <div className="inner-notify">
            <p>Your advertisement for <b>{props.companyName}</b> company, dated <b>{props.date}</b> is <b>{props.status}</b>.</p>
        </div>
    );
}

export default Notify;