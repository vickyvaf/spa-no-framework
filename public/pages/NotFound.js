const NotFound = () => {
  document.title = "Not Found";

  const title = document.createElement("h1");
  title.textContent = "404 Not Found";

  const desc = document.createElement("p");
  desc.textContent = "Sorry page not found";

  const div = document.createElement("div");
  div.append(title, desc);

  div.style.textAlign = "center";

  return div;
};

export default NotFound;
