import { BrowserRouter as Router } from "react-router-dom";
import "prismjs";
import "./App.css";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  return (
    <>
      <Router>
        <Main />
      </Router>
      <Footer />
    </>
  );
}

export default App;
