
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import '../components/model.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GavelIcon from '@mui/icons-material/Gavel';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import AccountMenu from '../Pages/Profiles/profile.jsx';


import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { colors } from '@mui/material';


import ListSubheader from '@mui/material/ListSubheader';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';


import PromotionalActivity from './table.jsx'
import Dashboard from '../Pages/dashboard.jsx'
import CreateCL from '../Pages/create.jsx';
import Get from '../Pages/get.jsx';
import Update from '../Pages/update.jsx';


import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import MinimizeIcon from '@mui/icons-material/Minimize';
import CircleIcon from '@mui/icons-material/Circle';

import App from '../App.jsx';
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";



import AppraisalQuestion from '../Pages/AppraisalQuestion/index.jsx';
import AddAppraisalQuestion from '../Pages/AppraisalQuestion/Form.jsx';
import AddDesignation from "../Pages/AppraisalQuestion/addDesignation.jsx";
import AddOption from '../Pages/AppraisalQuestion/optionfiles/Option.jsx';
import UpdateAppraisalQuestion from "../Pages/AppraisalQuestion/Edit.jsx"
import UpdateOption from "../Pages/AppraisalQuestion/optionfiles/OptionEdit.jsx"



import LiaisonProcess from '../Pages/Process/ProcessIndex.jsx';
import AddLiaisonProcess from "../Pages/Process/ProcessForm.jsx";
import UpdateLiaisonProcess from '../Pages/Process/ProcessEdit.jsx';



const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(['width', 'margin'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        variants: [
            {
                props: ({ open }) => open,
                style: {
                    ...openedMixin(theme),
                    '& .MuiDrawer-paper': openedMixin(theme),
                },
            },
            {
                props: ({ open }) => !open,
                style: {
                    ...closedMixin(theme),
                    '& .MuiDrawer-paper': closedMixin(theme),
                },
            },
        ],
    }),
);

export default function MiniDrawer() {
     
     const navigate = useNavigate();
 const handlegotopromotionalt = () => {
    navigate('/dashboard/table')
 }

 const handlegotoAppraisalQuestion = () => {
    navigate('/AppraisalQuestion/index')
 }

  const handlegotoProcess = () => {
    navigate('/LiaisonProcess/Process')
 }

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };
    const iconArray = [<GavelIcon />, <AdminPanelSettingsIcon />, <AlignHorizontalLeftIcon />]
    /* const handleDrawerClose = () => {
        setOpen(false);
    }; */
    const [openNestedList, setOpenNestedList] = React.useState(false);
    const handleClick = () => {
        setOpenNestedList(!openNestedList);
    };

    const [openNestedList1, setOpenNestedList1] = React.useState(false);
    const handleClick1 = () => {
        setOpenNestedList1(!openNestedList1);

    };



    const [selectedIndex, setSelectedIndex] = React.useState();

    


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline  />
            <AppBar position="fixed" >
                <Toolbar sx={{ backgroundColor: 'white', color: 'black' }}>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={[
                            {
                                marginRight: 5,
                                

                            },
                            open && { display: 'block' },
                        ]}
                    >
                        <MenuIcon 
                        sx={{
                            fontSize:40,
                            color:"#717070"


                        }}
                        />
                    </IconButton>
                    <img src='/public/kns.png' alt='' width={40} className='logoStyling' />
                    <Typography variant="h6" noWrap component="div">
                        KNS
                    </Typography>

                    <div className='toolbar'>
                        <Badge badgeContent={10} color="primary" sx={{ m: 2 }}>
                            <NotificationsIcon color="action" />
                        </Badge>
                        <p>Username</p>
                        <AccountMenu></AccountMenu>
                    </div>

                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open} sx={{
                '& .MuiDrawer-paper': { backgroundColor: '#101041' }
            }}>
                <DrawerHeader>

                </DrawerHeader>
                <Divider />



                <List
                    sx={{ width: '100%', maxWidth: 360, bgcolor: '#101041', color: 'white' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"

                >
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <GavelIcon />
                        </ListItemIcon>
                        <ListItemText primary="Legal" sx={{ pl: 1.5 }} />
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <AdminPanelSettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Admin" sx={{ pl: 1.5 }} />
                        
                    </ListItemButton>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon sx={{ color: 'white' }}>
                            <AlignHorizontalLeftIcon  onClick={handleDrawerOpen}/>
                        </ListItemIcon>
                        <ListItemText primary="Master" sx={{ pl: 1.4 }}  />

                        {openNestedList ? <ExpandLess /> : <ExpandMore />}

                    </ListItemButton>
                    <Collapse in={openNestedList} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton onClick={handleClick1} sx={{ pl: 4 }}>
                                <ListItemText primary="CRM"/>
                                {openNestedList1 ? <RemoveIcon /> : <AddIcon />}

                                {/* {closed ? <ExpandLess /> : <ExpandMore /> ,<MinimizeIcon/>} */}
                            </ListItemButton>
                        </List>
                    </Collapse>
                    <Collapse in={openNestedList1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon sx={{ color: 'white' }}>   
                                </ListItemIcon>
                               <div sx={{size:'1px',}}>
                                <CircleIcon  sx={{fontSize:10,mr:1,}}></CircleIcon>
                               </div>
                                <ListItemText primary="CLP Milestone"  sx={{size:'small'}} onClick={handlegotopromotionalt} />
                            </ListItemButton>
                        </List>
                    </Collapse>



                    <Collapse in={openNestedList1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon sx={{ color: 'white' }}>   
                                </ListItemIcon>
                               <div sx={{size:'1px',}}>
                                <CircleIcon  sx={{fontSize:10,mr:1,}}></CircleIcon>
                               </div>
                                <ListItemText primary="Appraisal Question"  sx={{size:'small'}}  onClick={handlegotoAppraisalQuestion} />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <Collapse in={openNestedList1} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                                <ListItemIcon sx={{ color: 'white' }}>   
                                </ListItemIcon>
                               <div sx={{size:'1px',}}>
                                <CircleIcon  sx={{fontSize:10,mr:1,}}></CircleIcon>
                               </div>
                                <ListItemText primary="Process"  sx={{size:'small'}}  onClick={handlegotoProcess}  />
                            </ListItemButton>
                        </List>
                    </Collapse>



                    
                    
                </List>

            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 2, backgroundColor: '#f1f8f8' }}>
                <DrawerHeader />
         
                    <Routes>
                    <Route path="/dashboard/table/create" element={< CreateCL />} />
                    <Route path="/dashboard/table" element={<PromotionalActivity />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/table/update" element={<Update />} />
                    <Route path="/AppraisalQuestion/index" element={<AppraisalQuestion/>} />
                    <Route path="/AppraisalQuestion/index/Form" element={<AddAppraisalQuestion/>} />
                      <Route path="/AppraisalQuestion/index/AddDesignation" element={<AddDesignation />} />
                    <Route path="/AppraisalQuestion/index/Option" element={<AddOption />} />
                    <Route path="/AppraisalQuestion/index/addOption/optionEdit" element={<UpdateOption />} />
                    <Route path="/AppraisalQuestion/index/Edit" element={<UpdateAppraisalQuestion />} />

                    <Route path="/LiaisonProcess/Process" element={<LiaisonProcess />} />
                     <Route path="/LiaisonProcess/Process/ProcessForm" element={<AddLiaisonProcess />} />
                      <Route path="/LiaisonProcess/Process/ProcessEdit" element={<UpdateLiaisonProcess />} />
                    </Routes>
              

            </Box>
            
        </Box >
    );
}
