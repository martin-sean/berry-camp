import React, { useState } from 'react';

import { AppBar, Fade, Hidden, Toolbar, Typography, IconButton, Theme, MenuList, MenuItem, Menu, ListItem, List } from '@material-ui/core';
import { ExpandLess, ExpandMore, AccountCircle } from '@material-ui/icons/';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { ClearNavAction, clearNav } from 'redux/actions';
import SignIn from './SignIn';
import { useHistory, Route, NavLink } from 'react-router-dom';
import * as Path from 'pages/paths';
import { GlobalStore } from 'redux/reducers';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    minHeight: theme.mixins.toolbar.minHeight,
  },
  toolBar: {
    paddingLeft: 0,
    minHeight: theme.mixins.toolbar.minHeight,
    display: 'flex',
    flexWrap: 'wrap',
  },
  toolbarWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    flex: 1,
    maxWidth: 330,
    height: theme.mixins.toolbar.minHeight,
  },
  logo: {
    objectFit: 'cover',
    width: '100%',
    minHeight: theme.mixins.toolbar.minHeight,
    maxHeight: theme.mixins.toolbar.minHeight,
  },
  title: {
    display: 'flex',
    alignSelf: 'center',
    position: 'absolute',
    left: theme.spacing(2),
    cursor: 'pointer',
  },
  titleIcon: {
    fontSize: '24pt',
    paddingRight: theme.spacing(1),
  },
  titleText: {
    letterSpacing: theme.spacing(0.5),
    fontSize: '24pt',
    color: 'white',
    textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
  },
  rightSide: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  menuList: {
    display: 'flex',
    padding: 0,
    height: '100%',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },
  menuItem: {
    height: '100%',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.25rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
  },
  navMenuButton: {
    textTransform: 'none',
    height: '100%',
    fontSize: '1rem',
  },
  userItem: {
    padding: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  menuPaper: {
    overflow: 'hidden',
  }
}));

interface NavbarProps {
  open: boolean,
  setDrawerOpen: (open: boolean) => void
}

export default (props: NavbarProps) => {
  // Logo image loaded
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const accessToken = useSelector((store: GlobalStore) => store.accessToken);

  // Anchor the dropdown menu to an element
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorAccEl, setAnchorAccEl] = useState<HTMLElement | null>(null);

  const handleTitleClick = () => {
    dispatch<ClearNavAction>(clearNav());
    history.push(Path.HOME);
  }

  // Handle opening the account menu
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }

  // Handle closing the mobile menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  }

  // Open the account menu
  const handleAccMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorAccEl(event.currentTarget);
  }

  // Close the account menu
  const handleAccMenuClose = () => {
    setAnchorAccEl(null);
  }

  // Common page links in desktop and mobile
  const PageLinks = () => (
    <List className={ classes.menuList }>
      <ListItem button className={ classes.menuItem } component={ NavLink } onClick={ handleMenuClose } to={ Path.BROWSE }>Browse</ListItem>
      <ListItem button className={ classes.menuItem } component={ NavLink } onClick={ handleMenuClose } to={ Path.ABOUT }>About</ListItem>
      <ListItem button className={ classes.menuItem } component={ NavLink } onClick={ handleMenuClose } to={ Path.PRIVACY }>Privacy</ListItem>
    </List>
  );

  return (
    <AppBar className={ classes.appBar } position='fixed'>
      <Toolbar className={ classes.toolBar }>
        <div className={ classes.toolbarWrapper }>
          <Fade in={ loaded }>
            <div className={ classes.imageWrapper }>
              <img
                className={ `${ classes.logo } pixelated` }
                src={ process.env.PUBLIC_URL + '/img/logo.png' }
                alt='Animation of madeline in a campsite in game'
                onLoad={ () => setLoaded(true) }
              />
            </div>
          </Fade>
          {/* Title */}
          <div onClick={ handleTitleClick } className={ classes.title } tabIndex={ 0 }>
            <Typography className={ classes.titleIcon }><span role='img' aria-label='Berry'>🍓</span></Typography>
            <Typography component="div" className={ classes.titleText  }>camp</Typography>
          </div>
          {/* Sign in button and account dropdown */}
          {/* Right side content */}
          <div className={ classes.rightSide }>
            <Hidden smDown>
              <MenuList className={ classes.menuList } >
                <PageLinks />
              </MenuList>
              <SignIn accessToken={ accessToken } />
            </Hidden>
            {/* Mobile right side content */}
            <Hidden mdUp>
              {/* Menu Drawer toggle */}
              <Route exact path={ Path.BROWSE }>
                <IconButton
                  className={ classes.navMenuButton }
                  color='inherit' 
                  aria-label='menu' 
                  onClick={ () => props.setDrawerOpen(!props.open) }
                >
                  { props.open ? <ExpandLess /> : <ExpandMore /> }
                </IconButton>
              </Route>
              {/* Links dropdown */}
              <IconButton
                className={ classes.navMenuButton }
                color='inherit'
                aria-controls='links-menu'
                aria-haspopup='true'
                onClick={ handleMenuOpen }
              >
                { <MenuIcon /> }
              </IconButton>
              <Menu
                keepMounted
                id="links-menu"
                anchorEl={ anchorEl }
                open={ Boolean(anchorEl) }
                onClose={ handleMenuClose }
              >
                <PageLinks />
              </Menu>
              <IconButton
                color='inherit'
                aria-controls='account-menu'
                aria-haspopup='true'
                onClick={ handleAccMenuOpen }
              >
                { <AccountCircle /> }
              </IconButton>
              <Menu
                classes={{ paper: classes.menuPaper }}
                keepMounted
                id='account-menu'
                anchorEl={ anchorAccEl }
                open={ Boolean(anchorAccEl) }
                onClose={ handleAccMenuClose }
              >
                <MenuItem
                  disableRipple
                  disableTouchRipple
                  className={ `${ classes.menuItem } ${ classes.userItem }` }
                >
                  <SignIn accessToken={ accessToken } closeParent={ handleAccMenuClose }/>
                </MenuItem>
              </Menu>
            </Hidden>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}