import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL,IS_LOADING } from "../actions/auth"

const initialState ={
    token:null,
    userId:null,
    didTryAutoLogin:false,
    isLoading: true,
}
export default(state = initialState,action) =>{
    switch(action.type){
        case AUTHENTICATE:
            return {
                token:action.token,
                userId:action.userId,
                didTryAutoLogin:true,
            };
        case SET_DID_TRY_AL:
            return {
                ...state,
                didTryAutoLogin:true
            }
        case IS_LOADING:
            return {
                ...state,
                isLoading:true,
            }
        case LOGOUT:
            return {
                ...initialState,
                isLoading:true,
                didTryAutoLogin:true
            }
        // case SIGN_UP:
        //     return {
        //         token:action.token,
        //         userId:action.userId
        //     };
        default:
            return state;
    }
}