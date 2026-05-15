import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';


import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';






export default function Promo() {
  return (
   
    <React.Fragment>
      <CssBaseline />
      
      <GlobalStyles
        styles={(theme) => ({
          body: { backgroundColor: theme.palette.background.paper , },
        })}
      />
      <div>
        
        <Fab
        
          color="secondary"
          sx={(theme) => ({
            position: 'absolute',
            // bottom: theme.spacing(2),
            left: theme.spacing(35),
            
          })}
        >
          <AddIcon />
        </Fab>
        
      </div>
    </React.Fragment>
  );
}