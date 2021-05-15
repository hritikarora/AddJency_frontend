import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from "../services/UserService"

function AuthenticatedRoute(props){

    if(JSON.parse(sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME))) return <Route {...props}></Route>;
    else return <Redirect to="/signup"/>
        
}

export default AuthenticatedRoute;