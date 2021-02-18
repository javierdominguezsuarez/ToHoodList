
const key = "user";

const setUser = async token => {
    try{
        await localStorage.setItem(key, token);
    }catch(error){
        console.log("Error storing token", error);
    }
}

const getUser = async () => {
    try{
        return await localStorage.getItem(key);
    }catch(error){
        console.log("Error storing token", error);
    }
}

const removeUser = async () => {
    try{
        return await localStorage.removeItem(key);
    }catch(error){
        console.log("Error removing the auth token", error);
    }
}

export default {setUser, getUser, removeUser}