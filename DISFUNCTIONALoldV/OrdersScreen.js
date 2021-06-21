import React,{useEffect,useState} from 'react'
import {FlatList,Text,Platform,ActivityIndicator,StyleSheet,View} from 'react-native'
import {useSelector,useDispatch }from 'react-redux';
import {HeaderButtons,Item}from 'react-navigation-header-buttons'
import HeaderButton from '../../UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'
import * as OrdersAction from '../../store/actions/ordersAction'
import Colors from '../../constants/Colors';
const OrdersScreen = props =>{
    const orders= useSelector(state=>state.ordersa.orders);
    const [isLoading,SetIsloading] = useState(false);
    const dispatch = useDispatch();
    useEffect(()=>{
        SetIsloading(true);
        dispatch(OrdersAction.fetchOrders()).then(
            ()=>{
                SetIsloading(false);
            }
        );
        
    },[dispatch])
    if(orders.length===0){
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>No orders found, maybe start ordering some products?</Text>
        </View>)
    }
    if(isLoading)
    {
        return (
            <View style={styles.isloadingvw}>
                <ActivityIndicator size='large' color={Colors.primary}/>
            </View>
        )
    }
    return (
        <FlatList data={orders} keyExtractor={item=>item.id} 
        renderItem={itemData=>
        <OrderItem 
        amount={itemData.item.totalAmount} 
        date={itemData.item.ReadableDate}
        items={itemData.item.items}/>}
        />
    )
}
 

export const screenOptions = navData => {
    return {
        headerTitle:'Your Orders',
        headerLeft:()=>
        (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Cart' iconName={Platform.OS==='android' ? 'md-menu':'ios-menu'} onPress={()=>
            {navData.navigation.toggleDrawer();}
            }/>
        </HeaderButtons>)
    };
    
}
const styles = StyleSheet.create({
    isloadingvw:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default OrdersScreen;