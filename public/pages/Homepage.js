import Navbar from "../components/Navbar.js";

const Homepage = () => {
  const title = document.createElement("h1");
  title.textContent = "Home Page";

  const div = document.createElement("div");
  div.append(Navbar(), title);

  return div;
};

export default Homepage;
