import React,{useState, useEffect,useCallback,useReducer,useRef} from 'react'
import {View, 
        Text, 
        StyleSheet,
        TextInput,
        Platform,
        Button,
        Alert,
        KeyboardAvoidingView,
        ActivityIndicator} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Card from '../../UI/Card'
import {HeaderButtons,Item}from 'react-navigation-header-buttons'
import HeaderButton from '../../UI/HeaderButton'
import {useSelector,useDispatch} from 'react-redux'
import * as letrasActions from '../../store/actions/letrasActions'
import Input from '../../UI/InputInterface'
import Colors from '../../constants/Colors'
import MyCustomPicker from '../../UI/MyCustomPicker'
import MyButton from '../../UI/ButtonComponent'
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
const DiasAño =[
    '360',
    '365'
]
const PlazoTasas = [
    'Diario',
    'Quincenal',
    'Mensual',
    'Bimestral',
    'Trimestral',
    'Cuatrimestral',
    'Semestral',
    'Anual',

]
const motivos = [
    'Portes',
    'Fotocopias',
    'Comisión de estudio',
    'Comisión de desembolso',
    'Comisión de intermediación',
    'Gastos de administración',
    'Gastos Notariales',
    'Gastos Registrales',
    'Seguro',
    'Otros Gastos'

]
const valorUnidad = [
    'Efectivo',
    'Porcentaje',
]
const motivosFinales = [
    'Portes',
    'Gastos de administración',
    'Otros Gastos',

]
const EditProductScreen = props =>{
    // const letrId = props.navigation.getParam('productId');

    const letrId = props.route.params? props.route.params.letraId:null;
    const editedLetra = useSelector(state=>state.letras.userLetras.find(letr=>letr.id===letrId))
    const [isLoading,SetIsloading] = useState(false);
    const [isFinished,SetIfFinished] = useState(false);
    const [IsNexted, SetIsNexted] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState();
    const [error,SetIsError] = useState();
    const [modalOpenPT,setModalOpenPT] = useState(false);
    const [pT,setpT] = useState('');
    const [modalOpenDaños,setModalOpenDaños] = useState(false);
    const [Daños,setDaños] = useState('');
    const [modalOpenMotivo,setModalOpenMotivo] = useState(false);
    const [Motivo,setMotivo] = useState('');
    const [modalOpenValorE,setModalOpenValorE] = useState(false);
    const [ValorE,setValorE] = useState('');
    const [modalOpenMotivoF,setModalOpenMotivoF] = useState(false);
    const [MotivoF,setMotivoF] = useState('');
    const dispatch=useDispatch();

    const pickerRef = useRef();
    // setModalOpen={setOneModal} 
    // modalOpen={OneModal} 
    // value={One} 
    // setValue={setOne}
    // items={ArrayOne} 

    const [formState, dispatchFormState]=useReducer(formReducer,{
         inputValues:{
             title:editedLetra?editedLetra.title:'',
             imageUrl:editedLetra?editedLetra.imageUrl:'',
             description:editedLetra?editedLetra.description:'',
             price:''
         },
        inputValidities:{
            title:editedLetra?true:false,
            imageUrl:editedLetra?true:false,
            description:editedLetra?true:false,
            price:editedLetra?true:false
        },
         formIsValid:editedLetra?true:false 
        });

    useEffect(()=>{
        if(error){
            Alert.alert('An error ocurred',
            error,
            [{text:'okay'}]);
        }
    },[error]);
    function open() {
        pickerRef.current.focus();
      }
      
      function close() {
        pickerRef.current.blur();
      }
    const submitHandler = useCallback(async () =>
    {   
        if(!formState.formIsValid)
        {
            Alert.alert('wrong input!','please check errors in the form',
            [
                {text:'Ok'}
            ]);
            return;
        }
        SetIsError(null);
        SetIsloading(true);
        
        try {
            if(editedLetra){
            
                await dispatch(letrasActions.updateLetra(
                    letrId,
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl))
            }
            else{
                await dispatch(letrasActions.createLetra(
                    formState.inputValues.title,
                    formState.inputValues.description,
                    formState.inputValues.imageUrl,
                    +formState.inputValues.price));
            }
            props.navigation.goBack();
        } catch (err) {
            SetIsError(err.message);
        }
       
        SetIsloading(false);
       
    },[dispatch,letrId,formState]);
    useEffect(()=>
    {
    // props.navigation.setParams({submit:submitHandler})
    props.navigation.setOptions({
        headerRight:()=>(
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            {isFinished?<Item title='Save' 
            iconName={Platform.OS==='android' ? 'md-checkmark':'ios-checkmark'} 
            onPress={submitHandler}/>:null
            }
        </HeaderButtons>)
    })
    // props.navigation.route
    },[submitHandler]);
    // useEffect(()=>{
    //     if(IsNexted){
    //         props.navigation.navigate('EditarLetras2');
    //     }
    // },[IsNexted]);
    const validateInitialData = () =>{
        // SetIfFinished(true);
        SetIsNexted(true);
       console.log(IsNexted);
    }
    const InputChangeHandler = useCallback((inputIdentifier,inputValue,inputValidity) => {

        dispatchFormState({
            type:FORM_INPUT_UPDATE,
            value:inputValue,
            isValid : inputValidity,
            input:inputIdentifier
        })
    },[dispatchFormState]);
    if(isLoading)
    {   
        return(
        <View style={styles.ct}>
            <ActivityIndicator size='large' color={Colors.primary}/>
        </View>);
    }
    if(IsNexted)
    {
        return(
        <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={100}>
        <ScrollView style={{margin:10}}>
         <View style={{justifyContent:'center',alignItems:'center',marginVertical:5}}>
            <Text style={styles.HeaderFinales}>Datos Finales</Text>
         </View>
         <Input
                id='title'
                label='Title'
                errorText='X'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next' 
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.title:''}
                initiallyValid ={!!editedLetra}
                required
                />
                <Input
                id='imageUrl'
                label = 'ImageURL'
                errorText='X'
                keyboardType='default'
                returnKeyType='next'   
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.imageUrl:''}
                initiallyValid ={!!editedLetra}
                required
                />       
                <Input
                id='title'
                label='Title'
                errorText='X'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next' 
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.title:''}
                initiallyValid ={!!editedLetra}
                required
                />
                <Input
                id='imageUrl'
                label = 'ImageURL'
                errorText='X'
                keyboardType='default'
                returnKeyType='next'   
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.imageUrl:''}
                initiallyValid ={!!editedLetra}
                required
                />       
         </ScrollView>
         <Button color={Colors.primary} title="Resolver" onPress={()=>{}}/>   
         </KeyboardAvoidingView>)
    }
     return (
         <KeyboardAvoidingView style={{flex:1}} behavior="padding" keyboardVerticalOffset={-180}>
         <ScrollView style={{margin:10}} >
         <View style={{justifyContent:'center',alignItems:'center'}}>
            <Text style={styles.HeaderInicial}>Datos iniciales</Text>
         </View>    
                <Input
                id='title'
                label='Titulo:'
                errorText='X'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next' 
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.title:''}
                initiallyValid ={!!editedLetra}
                required
                />
                <Input
                id='descripcion'
                label='Descripción:'
                errorText='X'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next' 
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.title:''}
                initiallyValid ={!!editedLetra}
                required
                />
                <MyButton value={Daños} HandlerOnPress={()=>setModalOpenDaños(!modalOpenDaños)}>Seleccione Dias por año
                </MyButton>
                <MyCustomPicker
                setModalOpen={setModalOpenDaños}
                modalOpen={modalOpenDaños} 
                value={Daños} 
                setValue={setDaños}
                items = {DiasAño}
                />
                <MyButton value={pT} HandlerOnPress={()=>setModalOpenPT(!modalOpenPT)}>Seleccione Plazo de Tasa
                </MyButton>
                <MyCustomPicker
                setModalOpen={setModalOpenPT}
                modalOpen={modalOpenPT} 
                value={pT} 
                setValue={setpT}
                items = {PlazoTasas}
                />
                <View>
                
                <MyCustomPicker
                setModalOpen={setModalOpenMotivo}
                modalOpen={modalOpenMotivo} 
                value={Motivo} 
                setValue={setMotivo}
                items = {motivos}
                />
                </View>
                <Card style={styles.card}>
                    <ScrollView>
                        <MyButton value={Motivo} HandlerOnPress={()=>setModalOpenMotivo(!modalOpenMotivo)}>Motivo
                        </MyButton>
                            <Input
                            style={{marginLeft:20}}
                            id='precio'
                            label = 'Precio:'
                            errorText='X'
                            keyboardType='default'
                            returnKeyType='next'   
                            onInputChange ={InputChangeHandler}
                            initialValue={editedLetra?editedLetra.imageUrl:''}
                            initiallyValid ={!!editedLetra}
                            required
                            />       
                    </ScrollView>
                </Card>
                {/* <MyButton HandlerOnPress={()=>setModalOpenPT(!modalOpenPT)}>Valor expresado
                </MyButton>
                <MyCustomPicker
                setModalOpen={setModalOpenPT}
                modalOpen={modalOpenPT} 
                value={pT} 
                setValue={setpT}
                items = {PlazoTasas}
                />
                <MyButton HandlerOnPress={()=>setModalOpenPT(!modalOpenPT)}>Motivos Finales
                </MyButton>
                <MyCustomPicker
                setModalOpen={setModalOpenPT}
                modalOpen={modalOpenPT} 
                value={pT} 
                setValue={setpT}
                items = {PlazoTasas}
                /> */}
                
                <Input
                id='nombre'
                label='Nombre:'
                errorText='X'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next' 
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.title:''}
                initiallyValid ={!!editedLetra}
                required
                />
                <Input
                id='plazot'
                label = 'Plazo de Tasa:'
                errorText='X'
                keyboardType='default'
                returnKeyType='next'   
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.imageUrl:''}
                initiallyValid ={!!editedLetra}
                required
                />       
                <Input
                id='tasa'
                label='Tasa:'
                errorText='X'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next' 
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.title:''}
                initiallyValid ={!!editedLetra}
                required
                />
                {/* <Input
                id='fechaDesc'
                label = 'Fecha de Descuento:'
                errorText='X'
                keyboardType='default'
                returnKeyType='next'   
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.imageUrl:''}
                initiallyValid ={!!editedLetra}
                required
                />   
                <Input
                id='imageUrl'
                label = 'ImageURL:'
                errorText='X'
                keyboardType='default'
                returnKeyType='next'   
                onInputChange ={InputChangeHandler}
                initialValue={editedLetra?editedLetra.imageUrl:''}
                initiallyValid ={!!editedLetra}
                required
                />                 */}
                             
         </ScrollView>
         <Button color={Colors.primary} title="Continuar" onPress={validateInitialData}/>  
         </KeyboardAvoidingView>
     )
}


export const screenOptions = navData =>{
    // const sub= navData.route.params ? navData.route.params.submit:null;
    const routeParams = navData.route.params ? navData.route.params : {}
    return{
        headerTitle:routeParams.letraId
        ?'Editar Letra'
        :'Agregar Letra',
        // headerRight:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
        // <Item title='Save' iconName={Platform.OS==='android' ? 'md-checkmark':'ios-checkmark'} onPress={sub}/>
        // </HeaderButtons>)
    }
}
const styles = StyleSheet.create({
    card:{
        marginHorizontal:50
    },  
    form:
    {

        margin:20,
        marginVertical:8,
    },
    HeaderInicial:{
        justifyContent:'center',
        alignItems: 'center',

    },
    HeaderFinales:{

    },
    ct:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    }
})

export default EditProductScreen;


// {editedLetra?null:
//     <Input
//     id='price'
//     label = 'Price'
//     errorText='Please enter a valid price'
//     keyboardType='decimal-pad'
//     returnKeyType='next'   
//     onInputChange ={InputChangeHandler}
//     required
//     min={0.1}
//     />}
//     <Input
//     id='description'
//     label = 'Description'
//     errorText='Please enter a valid description'
//     keyboardType='default'
//     autoCapitalize='sentences'
//     autoCorrect
//     multiline
//     numberOfLines={3}
//     initialValue={editedLetra?editedLetra.description:''}
//     initiallyValid ={!!editedLetra}
//     onInputChange ={InputChangeHandler}
//     required
//     minLength={5}
//     />










        // let isValidProp=false;
        // if(text.trim().length>0)
        // {
        //     isValidProp =true;
        // }
    // const [title,setTitle] = useState(editedLetra?editedLetra.title:'');
    // const [imageUrl,setimageUrl] = useState(editedLetra?editedLetra.imageUrl:'');
    // const [price,setprice] = useState('');
    // const [Description,setDescription] = useState(editedLetra?editedLetra.description:'');
    // const [TitleIsValid,setTitleIsValid] = useState(false);
  // formControl:{
    //     width:'100%'
    // },
    // label:{
    //     fontFamily:'open-sans-bold',
    //     marginVertical:8
    // },
    // input:{
    //     paddingHorizontal:2,
    //     paddingVertical:5,
    //     borderBottomColor:'#ccc',
    //     borderBottomWidth:1,
    // },
 {/* <View style={styles.formControl}>
             <Text style={styles.label}>Title</Text>
             <TextInput style={styles.input} 
                        value={formState.inputValues.title} 
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onEndEditing={()=>console.log('onEndEditing')}
                        onSubmitEditing={()=>console.log('onSubmitEditing')}/>
            {!formState.inputValidities.title && <Text>pls enter a valid title</Text>}
            </View> */}
            {/* <View style={styles.formControl}>
             <Text style={styles.label}>ImageURL</Text>
             <TextInput style={styles.input}
              value={formState.inputValues.imageUrl} 
              onChangeText={textChangeHandler.bind(this,'imageUrl')}
              />
              {!formState.inputValidities.imageUrl && <Text>pls enter a valid imageUrl</Text>}
            </View>
            {editedLetra?null:
            <View style={styles.formControl}>
             <Text style={styles.label}>Price</Text>
             <TextInput style={styles.input}
              value={formState.inputValues.price} 
              onChangeText={textChangeHandler.bind(this,'price')}
              keyboardType='decimal-pad'/>
              {!formState.inputValidities.price && <Text>pls enter a valid price</Text>}
            </View>}
            <View style={styles.formControl}>
             <Text style={styles.label}>Description</Text>
             <TextInput style={styles.input}
              value={formState.inputValues.description} 
              onChangeText={textChangeHandler.bind(this,'description')}
             />
             {!formState.inputValidities.description && <Text>pls enter a valid description</Text>}
            </View> */}