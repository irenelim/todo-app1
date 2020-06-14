import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

// colors
const primary = "#5285EC";
const secondary = "#537178";
const txtSecondary = "#8F9EA2";
const inputBgColor = "#EEF1F8";
const roundedPx = 8;
// const chartFill = "#E8ECEC";

// spacing
const spacing = 8;

const theme = createMuiTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
    text: {
      secondary: txtSecondary
    },    
    spacing
  },
  shape: {
    borderRadius: roundedPx,
  },
  overrides: {
    MuiExpansionPanel: {
      root: {
        position: "static"
      }
    },
    MuiFilledInput: {
        root: {
            backgroundColor: inputBgColor,
            borderRadius: roundedPx,
            borderTopLeftRadius: roundedPx,
            borderTopRightRadius: roundedPx, 
            '&$focused': {
                backgroundColor: inputBgColor
            },
            '&:hover': {
                backgroundColor: inputBgColor
            },
        },
    },
    MuiFormHelperText: { 
        root: {color: "red"}
    },    
    MuiButton: {
        root: {
            textTransform: "none",
            borderRadius: roundedPx,
        }
    },
    MuiDialogTitle: {
      root: {
        color: secondary,
      }
    }, 
    MuiListItem: {
      root: {
        color: primary,
        fontSize: '20px',
      },
      secondaryAction: {
        paddingRight: '96px',
      }
    },
  },
  typography: {
    fontFamily:  '"Montserrat", "Helvetica", "Arial", sans-serif',
    useNextVariants: true,
  }
});

export default responsiveFontSizes(theme);
