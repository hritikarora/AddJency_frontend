import React from 'react';
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../css/card.css";

function Card(props)
{
    console.log(props);
    return(
        <div className="col-md-4" >
            <div class="card" style={{borderRadius:"10px"}} onClick={()=>props.onClick(props.title)} >
                <img src={props.src} class="card-img-top" alt={props.alt} />
                <div class="card-body">
                    <h5 class="card-title">{props.title}</h5>
                </div>
            </div>
        </div>
    );
}
export default Card;