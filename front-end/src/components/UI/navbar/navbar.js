import React from 'react';
import classes from './navbar.module.css'
import './nav-hover.css';
import {NavLink, Link} from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';

import colorsByPath from '../../../helper/colors-by-path';

class Navbar extends React.Component {
    state = {
        sideDrawerOpen: false,
        sideDrawerMoved: false,
        links: [
            {display: 'All', path: '/'},
            {display: 'Powerlifting', path: '/powerlifting'},
            {display: 'Bodybuilding', path: '/bodybuilding'},
            {display: 'Weightlifting', path: '/weightlifting'},
            {display: 'Endurance', path: '/endurance'},
            {display: 'Crossfit', path: '/crossfit'}
        ]
    }

    toggleSideDrawerHandler = () => {
        const newSideDrawerOpen = !this.state.sideDrawerOpen;
        this.setState({
            sideDrawerOpen: newSideDrawerOpen,
            sideDrawerMoved: true
        });
    }

    render() { 
        let navList = <React.Fragment>
            {this.state.sideDrawerMoved ? <li><NavLink to="/create" onClick={this.state.sideDrawerOpen ? this.toggleSideDrawerHandler : null} className={classes.NavButton + ' createNavButton'} activeStyle={{color: 'rgb(132, 132, 255)'}}>Create</NavLink></li> : null}
            {this.state.links.map(link => {
                return <li>
                    <NavLink onClick={this.state.sideDrawerOpen ? this.toggleSideDrawerHandler : null} 
                    exact={link.display === "All" ? true : false} 
                    to={link.path}
                    activeStyle={{color: colorsByPath(link.path).idleColor}}
                    className={classes.NavButton + ' ' + link.display}>
                        {link.display}
                    </NavLink>
                </li>
            })}
        </React.Fragment>
        

        return <React.Fragment>
            <nav className={classes.Navbar}>
                <Link to="/"><h2 className={classes.Logo}>Workout Hub</h2></Link>
                 <div className={classes.Options} style={this.state.sideDrawerOpen ? {transform: 'translate(-100%)'} : null}>
                    <ul>
                        {navList}
                    </ul>
                </div>

                <NavLink to="/create" className={classes.Create} activeStyle={{color: 'rgb(132, 132, 255)'}}>Create</NavLink>
                <div className={classes.Burger} onClick={this.toggleSideDrawerHandler}>
                    <div className={classes.Line1}></div>
                    <div className={classes.Line2}></div>
                    <div className={classes.Line3}></div>
                </div>
            </nav>
            {this.state.sideDrawerOpen ? <Backdrop clicked={this.toggleSideDrawerHandler}/> : null}
        </React.Fragment>
    }
}

export default Navbar;