import React,{useState} from 'react';
import Colors from '../../constants/Colors'
import {View,Text,Image,StyleSheet,Button, TouchableOpacity,TouchableNativeFeedback, Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import CartItem from './CartItem'
import Card from '../../UI/Card'
const OrderItem = props =>
{
    const [showDetails,setShowDetails] = useState(false);
    return (<Card style={styles.OrderMain}>
        <View style ={styles.summary}>
            <Text style={styles.totalAmount}>${props.amount.toFixed(2)}</Text>
            <Text style={styles.date}>{props.date}</Text>
        </View>
        <Button color={Colors.primary} title={showDetails?'Hide Details':"Show Details"}
        onPress={()=>{setShowDetails(prevState=>!prevState)}}/>
        {showDetails&&
            <View style={styles.detailsItems}>
                {props.items.map(cartItem=><CartItem 
                key={cartItem.productId}
                quantity={cartItem.quantity}
                amount={cartItem.sum} 
                title={cartItem.productTitle}/>)}
            </View>}
    </Card>);
}

const styles = StyleSheet.create({
    OrderMain:{
        margin:20,
        padding:10,
        alignItems:'center'
    },
    summary:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%'
    },
    totalAmount:{
        fontFamily:'open-sans-bold',
        fontSize:16
    },
    date:{
        fontSize:16,
        fontFamily:'open-sans',
        color:'#888'
    },
    detailsItems:{
        width:'100%',

    }
})
export default OrderItem;