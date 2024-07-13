import React from "react";
import { Link } from "react-router-dom";
import AllContacts from "./AllContacts";

const Header = () => {
    return (
        <>
            <header>
                <div>Contact Manager</div>
                <div className="menu">
                <div><Link to="/" style={{textDecoration:'none'}}>All Contacts</Link></div>
                <div><Link to="/add" style={{textDecoration:'none'}}>Add Contacts</Link></div>
                </div>
            </header>
        </>
    )
}

export default Header