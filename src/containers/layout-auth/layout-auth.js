import React, {Fragment} from "react";
import Drawer from '../../components/navigation/drawer/drawer.js';
import BasementAuth from '../basement-auth/basement-auth.js';

export default function LayoutAuth(props) {
    return (
        <Fragment>
            <Drawer />  
            <div className="layout" style={{backgroundColor: "Lavender", minHeight: '82vh', paddingBottom: 15}}>
                <div className="content">
                    {props.children}
                </div>
            </div>
            <BasementAuth />
        </Fragment>
    )
}