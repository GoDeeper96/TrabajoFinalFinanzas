import AsyncStorage from '@react-native-async-storage/async-storage';
export const AUTHENTICATE = 'AUTHENTICATE'
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL='SET_DID_TRY_AL';
export const IS_LOADING ='IS_LOADING';

export const isLoading = () =>{
    return {type: 'IS_LOADING'}
}
export const setDidTryAl = () =>{
    return {type: 'SET_DID_TRY_AL'}
}
let timer;
export const authenticate = (userId,token,expiryDate) =>{
    return dispatch =>{
        dispatch(SetLogoutTimer(expiryDate));
        dispatch({
            type:AUTHENTICATE,
            userId:userId,
            token:token
        })
    }
}

export const signUp = (email,password) =>
{
    //AIzaSyBvxHmF05fxHejY2xvJhq-hFwdaI2F8Koc OLD 
    return async dispatch =>{
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAT45ZgReCyQOCadwB1X07SK3ouTzrhXec',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        })
        if(!response){
            const errorData = await response.json();
            const errorId = errorData.error.message;
            let msg = 'Something went wrong'
            if(errorId==='EMAIL_EXISTS'){
                msg='This email already exists'
            }
            // else if(errorId==='INVALID_PASSWORD')
            // {
            //     msg='This password is not valid';
            // }
            throw new Error(msg)
        }
        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.localId,resData.idToken,parseInt(resData.expiresIn)*1000)
            // {
            // type:SIGN_UP,
            // token:resData.idToken,
            // userId:resData.localId
            // }
        )
        const expirationDate =new Date(new Date().getTime()+parseInt(resData.expiresIn)*1000);
        saveDataToStorage(resData.idToken,resData.localId,expirationDate);
    }
}
export const login = (email,password) =>
{
    return async dispatch =>{
        const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAT45ZgReCyQOCadwB1X07SK3ouTzrhXec',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email:email,
                password:password,
                returnSecureToken:true
            })
        })
        if(!response.ok){
            const errorData = await response.json();
            const errorId = errorData.error.message;
            let msg = 'Something went wrong'
            if(errorId==='EMAIL_NOT_FOUND'){
                msg='This email could not be found'
            }else if(errorId==='INVALID_PASSWORD')
            {
                msg='This password is not valid';
            }
            throw new Error(msg);
        }
        const resData = await response.json();
        console.log(resData);
        dispatch(authenticate(resData.localId,resData.idToken,parseInt(resData.expiresIn)*1000)
        //     {
        //     type:LOGIN,
        //     token:resData.idToken,
        //     userId:resData.localId
        // }
        )
        const expirationDate =new Date(new Date().getTime()+parseInt(resData.expiresIn)*1000);
        saveDataToStorage(resData.idToken,resData.localId,expirationDate);
    }
}
export const logout = () =>{
    
        clearLogoutTimer();
        AsyncStorage.removeItem('userData');
    return {
        type:LOGOUT
    }
};
const clearLogoutTimer = ()=>{
    if(timer){
        clearTimeout(timer);
    }
   
}
const SetLogoutTimer = expirationTime =>{
    return dispatch=>{
        timer = setTimeout(()=>{
            dispatch(logout());
        },expirationTime/3) //EXPIRATION TIME /1000
    }
    
}
const saveDataToStorage = (token,userId,expirationDate) =>{
    AsyncStorage.setItem('userData',JSON.stringify({
        token:token,
        userId:userId,
        expiryDate: expirationDate.toISOString()
    }))
}