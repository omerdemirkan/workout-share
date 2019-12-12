import React from 'react';
import classes from './navbar.module.css'
import {NavLink, Link} from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop'

class Navbar extends React.Component {
    state = {
        sideDrawerOpen: false,
        links: [
            {display: 'All', path: '/', activeColor: '#00e5ff', idleColor: '#04a8af'},
            {display: 'Powerlifting', path: '/powerlifting', activeColor: '#ff0000', idleColor: '#af0404'},
            {display: 'Bodybuilding', path: '/bodybuilding', activeColor: '#007fff', idleColor: '#0460af'},
            {display: 'Weightlifting', path: '/weightlifting', activeColor: '#ffb900', idleColor: '#af8004'},
            {display: 'Endurance', path: '/endurance', activeColor: '#68ff00', idleColor: '#51af04'},
            {display: 'Crossfit', path: '/crossfit', activeColor: '#00ff9d', idleColor: '#04af78'},
        ]
    }

    toggleSideDrawerHandler = () => {
        const copy = this.state.sideDrawerOpen;
        this.setState({
            sideDrawerOpen: !copy
        });
    }

    render() { 
        let navList = this.state.links.map(link => {
            return <li>
                <NavLink onClick={this.state.sideDrawerOpen ? this.toggleSideDrawerHandler : null} 
                exact={link.display === "All" ? true : false} 
                to={link.path} className={classes.NavLink} 
                activeStyle={{color: link.idleColor}}
                className={classes.NavButton}>
                    {link.display}
                </NavLink>
            </li>
        });
        // seperating assignment because the buttons should toggle the sidedrawer only if its in the sidedrawer.
        

        return <React.Fragment>
            <nav className={classes.Navbar}>
                <Link to="/"><h2 className={classes.Logo}>Workout Hub</h2></Link>
                <div className={classes.Options} 
                style={this.state.sideDrawerOpen ? {transform: 'translate(-100%)'} : null}>
                    <ul>
                        {navList}
                    </ul>
                </div>
                <button className={classes.Create}>Create</button>
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