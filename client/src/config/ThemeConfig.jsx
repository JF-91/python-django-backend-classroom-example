import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

export const ThemePalette = {
    
    BG:'#ECFDF5',
    PRIMARY: '#064E3B',
    SECONDARY: '#059669',
    FONT_GLOBAL: "'Lato', Barlow",
    //Alerts types
    ERROR_MAIN: '#f44336',
    BG_ERROR_MAIN: 'rgba(#f44336,0,1)',
    SUCCESS_MAIN: '#65A30D',
    BG_SUCCESS_MAIN: 'rgba(#65A30D,0.1)',
}

const theme = createTheme({
  palette:{
    mode:'light',
    background:{
      default: ThemePalette.BG,
    },
    primary:{
      main: ThemePalette.PRIMARY,
    },
    secondary:{
      main:ThemePalette.SECONDARY,
    },
    text:{
      primary: '#000',
      secondary: '#fff',
    },
    
  },
  typography:{
    fontFamily: ThemePalette.FONT_GLOBAL,
    body1:{
      fontSize: '1em',
      color: 'primary',
    },
    body2:{
      fontSize: '0.8em',
      color: '#000',
    },
    link: {
      textDecoration: 'none',
      color: ThemePalette.PRIMARY,
      '&:hover': {
        color: `rgba(${ThemePalette.PRIMARY}, 0.9)`,
        textDecoration: 'underline',
      },
    }
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
          '&:hover':{background:"rgb(#064E3B,0.20)"}
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