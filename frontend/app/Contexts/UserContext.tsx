import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

//While creating the login and register it came up the error of not reloading the nick of the user
//So I tried to navigate to / page to force the reload of Header but didn't work

//Then I learned about Context, to manage the nick of the user. This context can be used in the entire app without passing props manually

//Define the interface, it's like a UseState
interface UserContextType {
  nick: string | null; //Nick can be a string or null if its not logged
  setNick: (nick: string | null) => void;
  //Added the userId too, for collections
  userId: number | null;
  setUserId: (id: number | null) => void;
}

//Create the context with initial values
const UserContext = createContext<UserContextType>({
  nick: null, //No user at the beggining (we are ussing sessions)
  setNick: () => {},
  userId: null,
  setUserId: () => {},
});


//This is the hook useUser to enter the state of the context in any component
export const useUser = () => useContext(UserContext);

//UserProvider is the component that it's gonna be envolving root.tsx to provide context

export const UserProvider = ({ children }: { children: ReactNode }) => {

    //Local state to storage nick
  const [nick, setNick] = useState<string | null>(null);
  const [userId,setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedNick = sessionStorage.getItem("nick");
      const storedUserId = sessionStorage.getItem("userId");
      if (storedNick) setNick(storedNick);
      if (storedUserId) setUserId(Number(storedUserId));
    }
  }, []);

  return (
    <UserContext.Provider value={{ nick, setNick,userId,setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
