import { createStore } from "redux"


const initialState={
    isAuth:false,
    user:localStorage.getItem("user")
};


const appReducer=(prevState=initialState,action)=>{
    
    switch (action.type){
        case 'login':
            return{
                ...prevState,
                isAuth:true,
                user:action.playload
            }
        case 'logout':
            return{
                ...prevState,
                isAuth:false,
                user:null
            }  
            case 'initial':
                return{
                    ...prevState,
                    isAuth:false,
                    user:null
                }     
        default:
            return{
                prevState
            }    
    }
}

const store=createStore(appReducer)

export default store