import type PropTypes from "prop-types";
import React from "react";
import { Redirect, Route } from "react-router-dom";

export interface PrivateRouteProps {
    component : PropTypes.ReactNodeLike;
    path : string;
    exact? : boolean;
};

const PrivateRoute : React.FC<PrivateRouteProps> = ({ component : Component, ...rest}) => {
    return (   
        <Route {...rest} render = { props =>
            localStorage.getItem('token') ? (
                // @ts-ignore
                <Component {...props}/>
            ) : (
                    <Redirect to={{pathname: "/"}}/>
                )
            }
        />
    );
};

export default PrivateRoute;