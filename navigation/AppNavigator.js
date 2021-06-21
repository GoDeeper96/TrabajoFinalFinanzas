import React ,{useState} from 'react'
import {useSelector} from 'react-redux'
import {NavigationContainer} from '@react-navigation/native'


// import ShopNavigator from './ShopNavigator'
// import ProductOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import { ShopNavigator,AuthNavigator} from './ShopNavigator'
import  StartupScreen from '../screens/StartupScreen'
import  WelcomeScreen from '../screens/WelcomeScreen'
const AppNavigator = props => {


    const isAuth = useSelector(state=>!!state.auth.token);
    const didTryAutoLogin = useSelector(state=>!!state.auth.didTryAutoLogin);
    const loadingOver = useSelector(state=>!!state.auth.isLoading);    
    // const loading = useSelector(state=>!!state.auth.)


    // console.log(loadingState);
    return (
    <NavigationContainer>
        {isAuth && loadingOver && <ShopNavigator/>}
        {isAuth && !loadingOver && <WelcomeScreen/> }
        {!isAuth && didTryAutoLogin  && <AuthNavigator/>}
        {!isAuth && !didTryAutoLogin &&  <StartupScreen/>}
    </NavigationContainer>);
}
export default AppNavigator;