import React from 'react';
import Colors from '../../constants/Colors'
import {View,Text,Image,StyleSheet,Button, TouchableOpacity,TouchableNativeFeedback, Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
const CartList = props =>{
    return (
        <View style={styles.lst}>
            <View style={styles.it}>
                <Text style={styles.qty}>{props.quantity} </Text>
                <Text style={styles.sameOne}>{props.title}</Text>
            </View>
            <View style={styles.it}>
                <Text style={styles.sameOne}>${props.amount.toFixed(2)}</Text>
                { props.deletable &&
                <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                    <Ionicons name={Platform.OS==='android'?'md-trash':'ios-trash'} size={23} color='red'/>
                </TouchableOpacity>}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    deleteButton:{
        marginLeft:20
    },
    sameOne:{
        fontFamily:'open-sans-bold',
        fontSize:16,
    },
    it:{
        flexDirection:'row',
        alignItems:'center',    
    },
    qty:
    {
        fontFamily:'open-sans',
        color:'#888',
        fontSize:16,

    },
    lst:
    {
        padding:10,
        backgroundColor:'white',
        flexDirection:'row',
        justifyContent:'space-between',
        marginHorizontal:20,
    },
})
export default CartList;