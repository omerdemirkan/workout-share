import React from 'react';
import classes from './Footer.module.css'

// Material UI
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

const footer = () => {
    return <div className={classes.Footer}>
        <h3 className={classes.Header}>{new Date().getFullYear()} Omer Demirkan</h3>
        <div className={classes.LinkBox}>
            <a href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile" target="_blank"><LinkedInIcon style={{color: 'rgb(131, 131, 131)'}}/></a>
            <a href="https://github.com/omerdemirkan" target="_blank"><GitHubIcon style={{color: 'rgb(131, 131, 131)'}}/></a>
            <a href="mailto:omerfarukpiano@gmail.com"><MailOutlineIcon style={{color: 'rgb(131, 131, 131)'}}/></a>
        </div>
    </div>
}

export default footer;