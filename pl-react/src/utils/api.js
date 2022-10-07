const rootUrl =
  process.env.REACT_APP_VERCEL_ENV === "production" ||
  process.env.NODE_ENV === "production"
    ? process.env.API_HOST
    : "";

export async function getToken(body) {
  const response = await fetch(`${rootUrl}/api/user/authenticate`, {
    body: body,
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return checkData(response);
}

export async function register(body) {
  const response = await fetch(`${rootUrl}/api/user`, {
    body: body,
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return checkData(response);
}

// export function logout() {
//   return fetch("/logout", {
//     withCredentials: true,
//   });
// }

export async function getUser() {
  const token = localStorage.getItem("jwtToken");
  if (!token) throw new Error("No Token Provided");
  const response = await fetch(`${rootUrl}/api/user/@me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return checkData(response);
}

export async function getMatchesById(id) {
  const token = localStorage.getItem("jwtToken");
  if (!token) throw new Error("No Token Provided");
  const response = await fetch(`${rootUrl}/api/match/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return checkData(response);
}

export async function getMatches() {
  const token = localStorage.getItem("jwtToken");
  if (!token) throw new Error("No Token Provided");
  const response = await fetch(`${rootUrl}/api/match`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return checkData(response);
}
// eslint-disable-next-line
function dataFetch(url, parameters) {
  return fetch(url, parameters)
    .then((response) => {
      console.log(response);
      return response.text();
    })
    .then((string) => {
      console.log(string);
      return !string || string === "" ? {} : JSON.parse(string);
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error);
    });
}

async function checkData(response) {
  console.log(response);
  if (response.status >= 500) throw new Error(response.statusText);

  const string = await response.text();
  if (!string || string === "") {
    console.error(response, string);
    if (!response.status) throw new Error("[API] Response failed");
    else throw new Error(response.statusText);
  }
  const data = JSON.parse(string);
  if (data.succeeded) return data;
  else throw new Error(data.message);
}
