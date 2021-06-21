import React,{useReducer,useCallback,useState,useEffect} from 'react'
import {ScrollView,View,KeyboardAvoidingView,StyleSheet,Button,ActivityIndicator,Alert} from 'react-native'
import Input from '../../UI/Input';
import Card from '../../UI/Card'
import Colors from '../../constants/Colors';
import {useDispatch} from 'react-redux';
import {LinearGradient} from 'expo-linear-gradient';
import * as authActions from '../../store/actions/auth'
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'
const formReducer = (state,action)=>
{
    if(action.type===FORM_INPUT_UPDATE)
    {
        const UpdatedValues ={
            ...state.inputValues,
            [action.input]:action.value
        };
        const UpdatedValidities ={
            ...state.inputValidities,
            [action.input]:action.isValid
        }
        let updatedFormValidation = true;
        for(const key in UpdatedValidities)
        {
            updatedFormValidation = updatedFormValidation && UpdatedValidities[key];
        }
        return{
            formIsValid:updatedFormValidation,
            inputValidities:UpdatedValidities,
            inputValues:UpdatedValues,           
        }
    }
    return state;
}
const authScreen = props =>{
    const [isLoading,setIsLoading] = useState(false);
    const [isSignUp, SetIsSignup] =useState(false);
    const [error,SetError] = useState()
    const dispatch = useDispatch();
    useEffect(()=>{
        if(error){
            Alert.alert('An error ocurred',error,[
                {text:'okay'}
            ])
        }
    },[error])
    const authHandler = async() =>{
        let action;
        if(isSignUp)
        {
        action = authActions.signUp(
            formState.inputValues.email,
            formState.inputValues.password)
        }
        else{
        action = authActions.login(
            formState.inputValues.email,
            formState.inputValues.password)
        }
        SetError(null);
        setIsLoading(true);
        try {
            await dispatch(action);
            // dispatch(authActions.isLoading());
            // props.navigation.navigate('Shop')
        } catch (err) {
            SetError(err.message)
            setIsLoading(false);
        }
        // await dispatch(action);
        
    }
    const InputChangeHandler = useCallback((inputIdentifier,inputValue,inputValidity) => {

        dispatchFormState({
            type:FORM_INPUT_UPDATE,
            value:inputValue,
            isValid : inputValidity,
            input:inputIdentifier
        })
    },[dispatchFormState]);
    const [formState, dispatchFormState]=useReducer(formReducer,{
        inputValues:{
           email:'',
           password:'',
        },
       inputValidities:{
           email:false,
           password:false,
       },
        formIsValid:false
       });
    return (
        <LinearGradient colors={['#fff','#fff']} style={styles.gradient}>
        <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={10}
        style={styles.screen}>
        <Card style={styles.authContainer}>
            <ScrollView>
                <Input 
                id='email' 
                label='E-Mail' 
                keyboardType='email-address' 
                required 
                email 
                autoCapitalize='none' 
                errorText='please enter a valid address'
                onInputChange={InputChangeHandler}
                initialValue =""
                />
                 <Input 
                id='password' 
                label='Password' 
                keyboardType='default'
                secureTextEntry
                required 
                minLength={5} 
                autoCapitalize='none' 
                errorText='please enter a valid password'
                onInputChange={InputChangeHandler}
                initialValue =""
                />
                <View style={styles.btncontainer}>
                    {isLoading?<ActivityIndicator size='small' color={Colors.primary}/>:
                    <Button title={isSignUp?'Sign Up':'Login'} color={Colors.fifth} onPress={authHandler}/>}
                </View>
                <View style={styles.btncontainer}>
                    <Button title={`Switch to ${isSignUp?'Login':'Sign Up'}`} color={Colors.accent} onPress={()=>{
                    SetIsSignup(prevState=>!prevState)
                }}/>
                </View>
            </ScrollView>
        </Card>
        </KeyboardAvoidingView>
        </LinearGradient>
        
    )
}
export const screenOptions = {
    headerTitle:'Please authenticate'
}

const styles = StyleSheet.create({
    btncontainer:{
        marginTop:10,
    },
    gradient:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },  
    screen:{
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    authContainer:{
        width:'80%',
        maxWidth:400,
        maxHeight:400,
        padding:20

    }
})

export default authScreen;