import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E40AF",
    },
    secondary: {
      main: "#9333EA",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: { fontSize: "2rem", fontWeight: 600 },
  },
});

export default theme;