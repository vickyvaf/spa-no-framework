export function Loader() {
  const loading = document.createElement("p");
  loading.textContent = "Loading...";

  loading.style.textAlign = "center"

  return loading;
}