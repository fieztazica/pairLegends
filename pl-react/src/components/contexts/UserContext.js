import * as React from "react";
import { getUser } from "../../utils/api";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const fetchUser = async () => {
    let data = await getUser();
    setUser(data.resultObject);
    return data;
  };

  return (
    <UserContext.Provider value={{ user, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => React.useContext(UserContext);
