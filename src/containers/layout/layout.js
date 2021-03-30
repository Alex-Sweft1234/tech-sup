import React, {Fragment} from "react";
import Drawer from '../../components/navigation/drawer/drawer.js';
import Basement from '../basement/basement.js';

export default function Layout(props) {
    return (
        <Fragment>
            <Drawer />  
            <div className="layout" style={{backgroundColor: "Lavender", minHeight: '78vh', paddingBottom: 15}}>
                <div className="content">
                    {props.children}
                </div>
            </div>
            <Basement />
        </Fragment>
    )
}