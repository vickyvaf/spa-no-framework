import Navbar from "../components/Navbar.js";

const Aboutpage = () => {
  const title = document.createElement("h1");
  title.textContent = "About Page";

  const div = document.createElement("div");
  div.append(Navbar(), title);

  return div;
};

export default Aboutpage;
