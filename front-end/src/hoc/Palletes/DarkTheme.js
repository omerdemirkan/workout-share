import React from 'react';

import grey from '@material-ui/core/colors/grey';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
          500: grey[700],
          backgroundColor: grey[100]
      }
    }
});

const Black = Component => {
    return <ThemeProvider theme={theme}><Component/></ThemeProvider>
}

export default Black;

