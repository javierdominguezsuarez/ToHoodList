import { useContext } from "react"
import AuthContext from "./context"

export default function useAuth(){
   const {user, setUser} = useContext(AuthContext);
   return {user, setUser};
};