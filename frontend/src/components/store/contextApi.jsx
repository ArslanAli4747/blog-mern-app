import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

const initialState = {
    user:JSON.parse(localStorage.getItem("user"))||null,
    isFetching:false,
    error:false

}
export const ContextApi = createContext(initialState)


export const ContextProvider = ({children})=>{
const [state,dispatch] = useReducer(reducer,initialState)

useEffect(()=>{
    localStorage.setItem("user",JSON.stringify(state.user))
},[state.user])
    return(
        <ContextApi.Provider
        value={{
            user:state.user,
            isFetching:state.isFetching,
            error:state.error,
            dispatch
        }}
        >
                {children}
        </ContextApi.Provider>
    )
}

export const usecontext = ()=>{
    return useContext(ContextApi)
}