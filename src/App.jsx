import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from './theme'
//routes
import Router from "./routes";

import store from './store/store'
import "./App.css";
import { Provider } from "react-redux";

//components
import { StyledChart } from './components/charts'

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider>
            <StyledChart />
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
