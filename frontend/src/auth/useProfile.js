import { useContext } from "react"
import ProfileContext from "./profileContext"

export default function useProfile(){
   const {profile, setProfile} = useContext(ProfileContext);
   return {profile, setProfile};
};