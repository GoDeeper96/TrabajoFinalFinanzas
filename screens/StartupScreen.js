import React,{useEffect,useState} from 'react'
import { View,ActivityIndicator,StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay'
import {LinearGradient} from 'expo-linear-gradient';
import Colors from '../constants/Colors';
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/auth';
const StartupScreen = props =>{
    const dispatch = useDispatch();
    
    // useEffect(()=>{
    //     SetLoading(true);
    //     setTimeout(() => {
    //     SetLoading(false);
    //     console.log('2asdas');
    //   }, 3000);
    // })
    const isAuth = useSelector(state=>!!state.auth.token);
    const loadingState = useSelector(state=>!!state.auth.isLoading);    
    useEffect(()=>{
        const tryLogin = async ()=>
        {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData){
                // props.navigation.navigate('Auth');
                dispatch(authActions.setDidTryAl());
                return;
            }
            
            const transformedData= JSON.parse(userData);
            const { token,userId,expiryDate } = transformedData;
            const expirationDate = new Date (expiryDate);
            if(expirationDate<=new Date()||!token||!userId)
            {
                // props.navigation.navigate('Auth');
                dispatch(authActions.setDidTryAl());
                return;
            }
            const expirationTime = expirationDate.getTime()- new Date().getTime();
            // props.navigation.navigate('Shop');
            // dispatch(authActions.setDidTryAl())
            dispatch(authActions.authenticate(userId,token,expirationTime));
        }
        tryLogin();
        // console.log(loadingState);
        // console.log(isAuth);
        // if(isAuth==false&&loadingState)
        // {
            
        //     setTimeout(() =>{
        //         tryLogin();
        //     },3000)
        // }
         
        
    },[dispatch])
    
    return (

        <LinearGradient colors={['#00467F','#A5CC82']} style={styles.container}>
        <Spinner
        //visibility of Overlay Loading Spinner
        visible={loadingState}
        //Text with the Spinner
        textContent={'Loading...'}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
        />
        </LinearGradient>
    // <View style={styles.screen}>
    //     {/* <Spinner/> */}
    //     <ActivityIndicator size='large' color={Colors.primary}/>
    // </View>
    )
}
const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    container: {
        flex:1,
        backgroundColor: '#33f',
        alignItems: 'center',
        justifyContent: 'center'
      },
      spinnerTextStyle: {
        color: '#fc6767',
      },
})
export default StartupScreen;