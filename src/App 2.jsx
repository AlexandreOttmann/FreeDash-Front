import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from './theme'
//routes
import Router from "./routes";



import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
        {/* <StyledChart> */}
        <Router />
        {/* </StyledChart> */}
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
