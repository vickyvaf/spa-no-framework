import Link from "./Link.js";

function Navbar() {
  const linkHome = Link({ href: "/", label: "Home" });
  const linkAbout = Link({ href: "/about", label: "About" });

  const div = document.createElement("div");
  div.append(linkHome, linkAbout);

  return div;
}

export default Navbar;
