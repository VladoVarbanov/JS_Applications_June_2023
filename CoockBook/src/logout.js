import { showCatalog } from "./catalogPage.js";

export async function logout(domElement) {
  let url = "http://localhost:3030/users/logaut";
  let settings = {
    method: "GET",
    headers: {
      "X-Authorization": sessionStorage.getItem("accessToken"),
    },
  };

  const response = await fetch(url, settings);
  if (response.status === 204) {
    sessionStorage.removeItem("accessToken");
    showCatalog(domElement);
  }
}
