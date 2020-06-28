import { createMuiTheme } from "@material-ui/core/styles";

export default (dark: boolean) => createMuiTheme({
  palette: {
    type: dark ? 'dark' : 'light',
    primary: {
      main: '#c800c8',
    },
    secondary: {
      main: '#F64D3A',
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "1em",
      },
    },
  },
});