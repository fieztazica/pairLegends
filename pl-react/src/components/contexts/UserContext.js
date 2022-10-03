import * as React from "react";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) throw new Error("No Token.");

    let response = await fetch("/api/user/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error(response.statusText);
    
    response = await response.json();
    setUser(response.resultObject);
  };

  return (
    <UserContext.Provider value={{ user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
