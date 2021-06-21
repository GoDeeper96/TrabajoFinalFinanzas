
import React,{useState} from 'react';
import {View,Text, FlatList,Button,StyleSheet,ActivityIndicator} from 'react-native'
import Colors from '../../constants/Colors'
import {useSelector,useDispatch} from 'react-redux'
import CartItem from '../../components/shop/CartItem'
import Card from '../../UI/Card'
import * as cartActions from '../../store/actions/cartActions'
import * as ordersActions from '../../store/actions/ordersAction'
const CartScreen = props =>{
    const cartTotalAmount = useSelector(state=>state.cart.totalAmount)
    const [isLoading,SetisLoading] =useState(false);
    const cartItems = useSelector(state=>{
        const transformedCartItems = [];
        for(const key in state.cart.items)
        {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,
            })
        }
        return transformedCartItems.sort((a,b)=>a.productId>b.productId?1:-1);
    });
    const dispatch = useDispatch();
    const sendOrderHandler = async () =>
    {
        SetisLoading(true);
        await dispatch(ordersActions.addOrder(cartItems,cartTotalAmount))
        SetisLoading(false);
    }
    return(
        <View style={styles.scr}>
            <Card style={styles.summ}>
                <Text style={styles.summText}>Total:<Text style={styles.TotAmount}>${Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text></Text>
                {isLoading?<ActivityIndicator size='small' color={Colors.primary}/>:
                <Button 
                color={Colors.accent} 
                title='Order Now' 
                disabled={cartItems.length===0}
                onPress={sendOrderHandler}/>
                }     
            </Card>
                <FlatList data={cartItems} keyExtractor={item=>item.productId} renderItem=
                {itemData=><CartItem 
                deletable
                quantity={itemData.item.quantity}
                title={itemData.item.productTitle}
                amount={itemData.item.sum}
                onRemove={()=>{
                    dispatch(cartActions.RemoveFromCart(itemData.item.productId));
                }}/>}/>
        </View>
    )
}
export const screenOptions ={
    headerTitle:'Your Cart'
}

const styles = StyleSheet.create({  
    scr:{
        margin:20,

    },
    summ:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
        padding:10,
    },
    summText:
    {
        fontFamily:'open-sans-bold',
        fontSize:18,
    },
    TotAmount:{
        color:Colors.primary
    },
})
export default CartScreen;
