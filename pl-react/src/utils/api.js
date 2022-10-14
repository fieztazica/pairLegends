const rootUrl =
    process.env.REACT_APP_VERCEL_ENV === "production" ||
        process.env.NODE_ENV === "production"
        ? `${process.env.REACT_APP_API_HOST || process.env.API_HOST}`
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

export async function updateUser(body) {
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("No Token Provided");
    const response = await fetch(`${rootUrl}/api/user/@me`, {
        body: body,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    return checkData(response);
}

export async function changePassword(body) {
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("No Token Provided");
    const response = await fetch(`${rootUrl}/api/user/@me/password`, {
        body: body,
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    return checkData(response);
}

export async function getUserById(id) {
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("No Token Provided");
    const response = await fetch(`${rootUrl}/api/user/${id}`, {
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

export async function postMatch(body) {
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("No Token Provided");
    const response = await fetch(`${rootUrl}/api/Match`, {
        body: body,
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    return checkData(response);
}

async function checkData(response) {
    if (response.status >= 500) throw new Error(response.statusText);
    const data = await response.json();
    if (data.succeeded) return data;
    else throw new Error(data.message);
}
