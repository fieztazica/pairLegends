export async function getToken(body) {
  const response = await fetch("api/user/authenticate", {
    body: body,
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.status >= 500) throw new Error(response.statusText);

  const data = await response.json();
  if (data.succeeded) return data;
  else throw new Error(data.message);
}

export async function register(body) {
  const response = await fetch("api/user", {
    body: body,
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (response.status >= 500) throw new Error(response.statusText);

  const data = await response.json();
  if (data.succeeded) return data;
  else throw new Error(data.message);
}

// export function logout() {
//   return fetch("/logout", {
//     withCredentials: true,
//   });
// }

export async function getUser() {
  const token = localStorage.getItem("jwtToken");
  if (!token) throw new Error("No Token Provided");
  const response = await fetch("/api/user/@me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status >= 500) throw new Error(response.statusText);

  const data = await response.json();
  if (data.succeeded) return data;
  else throw new Error(data.message);
}

export async function getMatchesById(id) {
  const token = localStorage.getItem("jwtToken");
  if (!token) throw new Error("No Token Provided");
  const response = await fetch("/api/match/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status >= 500) throw new Error(response.statusText);

  const data = await response.json();
  if (data.succeeded) return data;
  else throw new Error(data.message);
}

export async function getMatches() {
  const token = localStorage.getItem("jwtToken");
  if (!token) throw new Error("No Token Provided");
  const response = await fetch("/api/match", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status >= 500) throw new Error(response.statusText);

  const data = await response.json();
  if (data.succeeded) return data;
  else throw new Error(data.message);
}
