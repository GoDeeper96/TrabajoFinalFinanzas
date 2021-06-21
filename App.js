import React,{useState} from 'react';
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import letrasReducer from './store/reducers/letrasReducer'
import ReduxThunk from 'redux-thunk'
import AuthReducer from './store/reducers/auth'
import AppNavigator from './navigation/AppNavigator'
// ,composeWithDevTools()
const fetchFonts =()=>
{
  return Font.loadAsync(
    {
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    });
};

const rootReducer =combineReducers({
  letras: letrasReducer,
  // cart: cartReducer,
  // ordersa:ordersReducer,
  auth: AuthReducer
})

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));
export default function App() {
  const [fontLoaded,SetFontLoaded] = useState(false);
  if(!fontLoaded){
    return(<AppLoading 
    startAsync={fetchFonts} 
    onFinish={()=>{SetFontLoaded(true)}} 
    onError={(err)=>console.log(err)}/>
    )}
  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
