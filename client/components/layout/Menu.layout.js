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

  const classes = useStyles();

  return (
    // <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    //   <div className="container-fluid">
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarCollapse">
    //       <ul className="navbar-nav me-auto mb-2 mb-md-0">
    //         <li className="nav-item">
    //           <Link className="nav-link" to='/my-profile'>Profile</Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link className="nav-link" to='/search-spots'>Search For Parking</Link>
    //         </li>
    //       </ul>
    //       <form className="d-flex">
    //         {user ? (
    //           <div className="me-2">{user[0].first_name}</div>
    //         ) : ('')}
    //         <Link className="btn btn-outline-success" to='/' onClick={logOut}>Log Out</Link>
    //       </form>
    //     </div>
    //   </div>
    // </nav>
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
            <MenuItem onClick={handleClose}><Link to='/my-profile'>Profile</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to='/search-spots'>Search For Parking</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to='/'>View All</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to='/'>View Available</Link></MenuItem>
          </Menu>
          <Typography variant="h6" className={classes.title}>
            Welcome, {user[0].first_name}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default MenuComponent;

