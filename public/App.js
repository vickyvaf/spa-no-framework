import Homepage from "./pages/Homepage.js";
import Aboutpage from "./pages/Aboutpage.js";
import NotFound from "./pages/NotFound.js";

const App = () => {
  if (window.location.pathname === "/") {
    return Homepage();
  } else if (window.location.pathname === "/about") {
    return Aboutpage();
  } else {
    return NotFound();
  }
};

export default App;
