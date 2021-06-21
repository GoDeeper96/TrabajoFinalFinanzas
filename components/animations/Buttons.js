import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';

const MainButton = props =>
{
    return(
        <TouchableOpacity activeOpacity={0.9}onPress={props.onPress}>
            <View style={{...styles.button,...props.style}}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create(
    {
        button:{
            backgroundColor:Colors.accent,
            paddingVertical:12,
            paddingHorizontal:15,
            borderRadius:5,
            alignItems:'center'
        },
        buttonText:{
            color:'white',
            fontFamily:'open-sans',
            fontSize:14
        }
    }
)
export default MainButton;