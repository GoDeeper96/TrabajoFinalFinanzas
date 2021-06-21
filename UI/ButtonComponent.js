import React from 'react';
import {View, Text,TouchableOpacity,Modal,StyleSheet, Alert} from 'react-native';
const ButtonComponent = (props) => {
    return (
        <View style={styles.container}>
        <Text style={styles.buttonText}>{props.children}</Text>    
        <TouchableOpacity
        style={styles.button}
        onPress={props.HandlerOnPress}>
        <Text style={styles.buttonText}>{props.value}</Text>    
        </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems:'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor:'#ccc',
        width:'70%',
        height:35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:15,
        shadowColor:'white',
        shadowOffset:{
            width:0,
            height:2,
        },
        shadowOpacity:0.25,
        shadowRadius:0.25,
        elevation:5,
        marginTop:10,
        marginBottom:10,

    },
    buttonText:{
        fontSize:14,
        fontWeight:'bold',
        color:'black'
    }
})
export default ButtonComponent;

