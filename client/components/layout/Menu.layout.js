import React, { useState, useEffect, useContext } from "react";
import { useHistory, Link } from 'react-router-dom';
import { AuthContext } from "../contexts/Auth.context";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const MenuComponent = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (typeof user != 'object') history.push('/');
  });

  const logOut = () => {
    setUser(null);
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchHandler = () => {

    fetch('/spot/viewAllSpots')
      .then(response => response.json())
      .then(spots => {
        setSpots(spots);
      });
    setAnchorEl(null);
  };

  const searchavailableHandler = () => {
    fetch(`/spot/viewAvailableSpots`)
      .then(response => response.json())
      .then(spots => {
        setSpots(spots);
      });
    setAnchorEl(null);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}><Link style={{ textDecoration: 'none' }} to='/my-profile'>Profile</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link style={{ textDecoration: 'none' }} to='/search-spots'>Search For Parking</Link></MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title} style={{ textAlign: 'right' }}>
            Welcome, {user[0].first_name}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuComponent;

