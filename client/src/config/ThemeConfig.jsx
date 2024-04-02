import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const ThemePalette = {
    
    BG:'#FFFFFF',
    PURPLE: '#B2B0DF',
    GREY: '#c8c7cb',
    FONT_GLOBAL: "'Lato', Barlow",
    //Alerts types
    ERROR_MAIN: '#f44336',
    BG_ERROR_MAIN: 'rgba(244,67,54,0,1)',
    SUCCESS_MAIN: '#66bb6a',
    BG_SUCCESS_MAIN: 'rgba(102,187,106,0.1)',
}

const theme = createTheme({
  palette:{
    mode:'light',
    background:{
      default: ThemePalette.BG,
    },
    primary:{
      main: ThemePalette.PURPLE,
    },
    secondary:{
      main:ThemePalette.GREY,
    },
    
  },
  typography:{
    fontFamily: ThemePalette.FONT_GLOBAL
  },
  components:{
    MuiButton:{
      defaultProps:{
        style:{
          textTransform:'none',
          boxShadow:'none',
          borderRadius:'0.5em'
        }
        
      },
      styleOverrides:{
        outlined:{
          '&:hover':{background:"rgb(200,162,400,0.20)"}
        }
      }
    },
    MuiAlert:{
      defaultProps:{
        style:{
          borderRadius: '0.8em',
          fontSize: '1em',
        },
      },
      styleOverrides:{
        standardError:{
          border:`1px solid ${ThemePalette.BG_ERROR_MAIN}`,
          background: ThemePalette.BG_ERROR_MAIN
        },
        standardSuccess:{
          border:`1px solid ${ThemePalette.SUCCESS_MAIN}`,
          background: ThemePalette.SUCCESS_MAIN,
        },
      }
    }
  }
});

const ThemeConfig = ({children}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        {children}
      </CssBaseline>
    </ThemeProvider>
  )
}

export default ThemeConfig