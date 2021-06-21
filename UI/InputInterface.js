import React,{useReducer,useEffect,useState} from 'react';
import {Picker} from '@react-native-picker/picker'
import {View, Text,TextInput,TouchableOpacity,Modal,StyleSheet, Alert} from 'react-native';
const INPUT_CHANGE = 'INPUT_CHANGE'
const INPUT_BLUR = 'INPUT_BLUR'
const inputReducer = (state,action) =>
{
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value:action.value,
                isValid:action.isValid
            }
        case INPUT_BLUR:
            return {
                ...state,
                touched:true
            }
        default:
            return state;
    }
}   


const Input = props =>{
    const {onInputChange,id} = props;

    const [inputState,dispatch] = useReducer(inputReducer,{
        value:props.initialValue ? props.initialValue:'',
        isValid:props.initiallyValid,
        touched:false,  
    })
    useEffect(()=>{
        if(inputState.touched) {
            onInputChange(id,inputState.value,inputState.isValid);
        }
    },[inputState,onInputChange,id])

    const textChangeHandler=text=>{
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
        isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
        }
        if (props.min != null && +text < props.min) {
        isValid = false;
        }
        if (props.max != null && +text > props.max) {
        isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
        isValid = false;
        }
        dispatch({type:INPUT_CHANGE,value:text, isValid:isValid})
    }
    const LostFocusHandler = () =>
    {
        dispatch({
            type:INPUT_BLUR
        })
    }

   
    return(
        <View style={styles.formControl}>
             <Text style={styles.label}>{props.label}</Text>
             <TextInput 
            {...props}
            style={
            {
                width:'40%',
                paddingHorizontal:2,
                paddingVertical:5,
                borderRadius:5,
                borderWidth:1,
                margin:5,
                marginHorizontal:20,
                backgroundColor:'#D3D5D7',
                color:'black',
                borderColor:!inputState.isValid&& inputState.touched ?'red':'#B4B7BB'
            }} 
            value={inputState.value} 
            onBlur={LostFocusHandler}
            onChangeText={textChangeHandler}/>
        </View>
    )
};
const styles = StyleSheet.create({
    formControl:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    label:{
        fontFamily:'open-sans-bold',
        marginVertical:8,
        color:'black',
    },
    errorContainer:{
        marginVertical:5,
    },
    errorTxt:{
        fontFamily:'open-sans',
        color:'red',
        fontSize:14,
    }
});

export default Input;
    // input:{
    //     width:'40%',
    //     paddingHorizontal:2,
    //     paddingVertical:5,
    //     borderRadius:5,
    //     borderWidth:1,
    //     margin:5,
    //     marginHorizontal:20,
    //     backgroundColor:'#D3D5D7',
    //     color:'black',
    
    // },
            {/* {!inputState.isValid&& inputState.touched &&(
            <View style={styles.errorContainer}>
                <Text style={styles.errorTxt}>{props.errorText}</Text>
            </View>)} */}
{/* <MyButton>{props.Default}
<MyCustomPicker 
// onValueChange={props.onValueChange}
modalOpen={props.modalOpen} 
// setModalOpen={props.setModalOpen} 
// value={props.One} 
// setValue={props.setOne}
/>
</MyButton> */}