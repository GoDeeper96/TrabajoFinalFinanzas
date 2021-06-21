// import {createStackNavigator} from 'react-navigation-stack';
// import {createAppContainer,createSwitchNavigator} from 'react-navigation';
// import {createDrawerNavigator,DrawerItems} from 'react-navigation-drawer'
// import StarupScreen,{screenOptions as StarupScreenOptions} from '../screens/StarupScreen'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer'
import {Platform,SafeAreaView,Button,View} from 'react-native'
// import ProductOverviewScreen,{screenOptions as productOverviewScreenOptions} from '../screens/shop/ProductsOverviewScreen'
import DetalleLetraScreen,{screenOptions as DetalleLetraScreenOptions} from '../screens/shop/DetalleLetraScreen'
// import CartScreen,{screenOptions as CartScreenOptions} from '../screens/shop/CartScreen'
// import OrdersScreen,{screenOptions as OrdersScreenOptions} from '../screens/shop/OrdersScreen'
import UserLetrasScreen,{screenOptions as UserLetrasScreenOptions} from '../screens/user/UserLetrasScreen'
import EditarLetraScreen ,{screenOptions as EditarLetraScreenOptions} from '../screens/user/EditarLetraScreen'
import Colors from '../constants/Colors'
import {useDispatch} from 'react-redux'
import {Ionicons} from '@expo/vector-icons'
import React from 'react'

import AuthScreen,{screenOptions as AuthScreenOptions} from '../screens/user/AuthScreen'

import * as authActions from '../store/actions/auth'
const defaultNav = {
    headerStyle:{
        backgroundColor: Platform.OS ==='android' ? Colors.primary : Colors.accent,
    },
    headerTitleStyle:{
        fontFamily:'open-sans-bold'
    },
    headerBackTitleStyle:{
        fontFamily:'open-sans' //IOS
    },
    headerTintColor: Platform.OS ==='android' ? 'white' : Colors.primary
}
const ProductsStackNavigator = createStackNavigator(); 
// export const ProductsNavigator = () =>{
//     return <ProductsStackNavigator.Navigator screenOptions={defaultNav}>
//         <ProductsStackNavigator.Screen name="Admin" 
//         component={AdminNavigator}
//         options={{drawerIcon: props =>
//             <Ionicons 
//             name={Platform.OS==='android '?'md-create':'ios-create'}
//             size={23}
//             color={props.color}/> 
                         
//         }}

//         />
//         <ProductsStackNavigator.Screen name="DetalleLetra" 
//         component={DetalleLetraScreen}
//         options={DetalleLetraScreenOptions}/>
//         <ProductsStackNavigator.Screen name="Cart" 
//         component={CartScreen}
//         options={CartScreenOptions}/> 
//     </ProductsStackNavigator.Navigator>

// }


// const OrdersStackNavigator = createStackNavigator();

// export const OrdersNavigator = () => {
//     return <OrdersStackNavigator.Navigator screenOptions={defaultNav}>
//         <OrdersStackNavigator.Screen
//         name="Orders"
//         component={OrdersScreen}
//         options={OrdersScreenOptions}
//         />
//     </OrdersStackNavigator.Navigator>
// }


const AdminStackNavigator = createStackNavigator();
export const AdminNavigator = () =>{
    return <AdminStackNavigator.Navigator screenOptions={defaultNav}>
        <AdminStackNavigator.Screen
        name ="UserLetras"
        component={UserLetrasScreen}
        options={UserLetrasScreenOptions}
        />
        <AdminStackNavigator.Screen
        name="EditarLetras"
        component={EditarLetraScreen}
        options={EditarLetraScreenOptions}
        />
         <AdminStackNavigator.Screen
        name="EditarLetras2"
        component={EditarLetraScreen}
        options={EditarLetraScreenOptions}
        />
         <AdminStackNavigator.Screen name="DetalleLetra" 
        component={DetalleLetraScreen}
        options={DetalleLetraScreenOptions}/>
    </AdminStackNavigator.Navigator>
}

const ShopDrawer = createDrawerNavigator();

export const ShopNavigator = () =>{
    const dispatch = useDispatch();
    return (<ShopDrawer.Navigator 
        drawerContentOptions={{activeTintColor:Colors.primary}}
        drawerContent={props=>{
            return (<View style={{flex:1,paddingTop:20}}>
                <SafeAreaView forceInset={{top:'always',horizontal:'never'}}>
                    <DrawerItemList {...props}/>
                    <View style={{marginHorizontal:70,borderRadius:20,radius:20,marginTop:20}}>
                        <Button title='Cerrar Sesión' color={Colors.primary}onPress={()=>
                        {
                        dispatch(authActions.logout());
                        // props.navigation.navigate('Auth');
                        }}/>
                    </View>
                </SafeAreaView>
            </View>)           
        }}>
       <ShopDrawer.Screen 
        name="Mis letras"
        component={AdminNavigator} 
        options={
            {drawerIcon: props =>
                <Ionicons 
                name={Platform.OS==='android '?'md-create':'ios-create'}
                size={23}
                color={props.color}/> 
                             
            }
        }/>
        
        
    </ShopDrawer.Navigator>)
}

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () =>{
    return (
        <AuthStackNavigator.Navigator
        screenOptions={defaultNav}>
            <AuthStackNavigator.Screen
            name="Auth"
            component={AuthScreen}
            options={AuthScreenOptions}
            />
        </AuthStackNavigator.Navigator>
    )
}
{/* <ShopDrawer.Screen 
        name="Resultados de letras"
        component={OrdersNavigator}
        options={
            {
            drawerIcon: props =>
            <Ionicons name={Platform.OS==='android '?'md-list':'ios-list'}
            size={23}
            color={props.color}/>
            }
        } /> */}


 /* <ShopDrawer.Screen 
        name="Products"
        component={ProductsNavigator}
        options={
            {
                drawerIcon: props =>
                <Ionicons name={Platform.OS==='android '?'md-cart':'ios-cart'}
                size={23}
                color={props.color}/>          
            }
        } /> */
        // options={navData =>{
        //         return{
        //         headerTitle:'All Products',
        //         headerLeft:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        //                             <Item title='Menu' iconName={Platform.OS==='android' ? 'md-menu':'ios-menu'} onPress={()=>{
        //                             navData.navigation.toggleDrawer()}}/>
        //                         </HeaderButtons>,
        //         headerRight:()=><HeaderButtons HeaderButtonComponent={HeaderButton}>
        //                             <Item title='Cart' iconName={Platform.OS==='android' ? 'md-cart':'ios-cart'} onPress={()=>{
        //                             navData.navigation.navigate('Cart')}}/>            
        //                         </HeaderButtons>
        //         }
        //     }
        // }
// const ProductsManager = createStackNavigator({
//     ProductsOverview :ProductOverviewScreen,
//     ProductDetail:DetalleLetraScreen,
//     Cart:CartScreen,
// },
// {
//     navigationOptions:{
//         drawerIcon:drawerConfig=><Ionicons name={Platform.OS==='android '?'md-cart':'ios-cart'}
//             size={23}
//             color={drawerConfig.tintColor}/>
//     },
//     defaultNavigationOptions:defaultNav
// })
// const OrdersNavigator = createStackNavigator(
//     {
//     Orders:OrdersScreen
//     },
//     {
//     navigationOptions: {
//         drawerIcon:drawerConfig=><Ionicons name={Platform.OS==='android '?'md-list':'ios-list'}
//             size={23}
//             color={drawerConfig.tintColor}/>
//     },
//     defaultNavigationOptions:defaultNav
//     }
// );
// const AdminNav = createStackNavigator(
//     {
//     UserProducts:UserLetrasScreen,
//     EditProducts:EditarLetraScreen
//     },
//     {
//     navigationOptions: {
//         drawerIcon:drawerConfig=><Ionicons name={Platform.OS==='android '?'md-create':'ios-create'}
//             size={23}
//             color={drawerConfig.tintColor}/>
//     },
//     defaultNavigationOptions:defaultNav
//     }
// );
// const ShopNavigator = createDrawerNavigator({
//     Products:ProductsNavigator,
//     Orders:OrdersNavigator,
//     admin : AdminNavigator
//     }, 
//     {
//     contentOptions:{
//         activeTintColor:Colors.primary
//     },
//     contentComponent:props=>{
//         const dispatch = useDispatch();
//         return (<View style={{flex:1,paddingTop:20}}>
//             <SafeAreaView forceInset={{top:'always',horizontal:'never'}}>
//                 <DrawerItems {...props}/>
//                 <Button title='Logout' color={Colors.primary}onPress={()=>
//                 {
//                     dispatch(authActions.logout());
//                     // props.navigation.navigate('Auth');
//                 }}/>
//             </SafeAreaView>
//         </View>)
//     }
// })
// const AuthNavigator = createStackNavigator(
//     {
//     Auth:AuthScreen
//     },
//     {
//     defaultNavigationOptions:defaultNav
//     }
// )
// const MainNavigator = createSwitchNavigator({
//     Starup:StarupScreen,
//     Auth:AuthNavigator,
//     Shop:ShopNavigator
// })
// export default createAppContainer(MainNavigator);
