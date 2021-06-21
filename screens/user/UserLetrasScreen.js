import React,{useState,useEffect,useCallback} from 'react';
import { View,Text,FlatList,Platform,Button,Alert }from 'react-native'
import {useSelector,useDispatch}from 'react-redux'
import LetraItem  from '../../components/shop/LetraItem'
import {HeaderButtons,Item}from 'react-navigation-header-buttons'
import HeaderButton from '../../UI/HeaderButton'
import Colors from '../../constants/Colors'
import * as LetrasActions from '../../store/actions/letrasActions'
const UserLetrasScreen = props =>{
    const [isLoading,setIsLoading] = useState(false);
    const [isRefreshing,SetIsRefreshing] = useState(false);
    const [err,SetErr] = useState();
    // const products = useSelector(state=>state.products.availableProducts);
    const dispatch = useDispatch();
    const userLetras = useSelector(state=>state.letras.userLetras);
    const loadLetras =useCallback (async () =>{
        SetErr(null);
        SetIsRefreshing(true);
        try {
            await dispatch(LetrasActions.fetchLetras())
        } catch (error) {
            SetErr(error.messsage)
        }
        SetIsRefreshing(false);
    },[dispatch,setIsLoading,SetErr])
    useEffect(()=>
    {
        const unsubscribe = props.navigation.addListener('focus',loadLetras);
        return () =>{
            unsubscribe();
        }
    },[loadLetras])
    useEffect(()=>{
        setIsLoading(true);
        loadLetras().then(()=>{
            setIsLoading(false);
        })
    },[dispatch,loadLetras])
    const selectItemHandler = (id,title) =>{
        props.navigation.navigate('DetalleLetra',{
            letraId: id,
            letraTitle: title
        })
    }
    const editLetrasHandler = (id) =>
    {
        props.navigation.navigate('EditarLetras',{
            productId: id
        })
    }
    const deleteHandler = (id)=>
    {
        Alert.alert('Are you sure?','Do you really want to delete this item',[
            {text:'No',style:'default'},
            {text:'Yes',style:'destructive',onPress:()=>{
                dispatch(LetrasActions.deletProduct(id))
            }}
        ])
    }
    if(userLetras.length===0){
        console.log(userLetras.length)
        return(<View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text>No hay letras, quizá deberías agregar algunas?</Text>
        </View>)
    }
    return (<FlatList data={userLetras} keyExtractor={item=>item.id} 
    renderItem={itemData => <LetraItem image={itemData.item.imageUrl} 
    title={itemData.item.title}
    price={itemData.item.price}>
         <Button color={Colors.primary} title="Ver" onPress={()=>{selectItemHandler(itemData.item.id,itemData.item.title)}}/>
        <Button color={Colors.primary} title="Editar" onPress={()=>{editLetrasHandler(itemData.item.id)}}/>
        <Button color={Colors.primary} title="Eliminar" onPress={deleteHandler.bind(this,itemData.item.id)}/>
    </LetraItem>}/>);                                 
};
export const screenOptions = navData => {
    return {
    headerTitle: 'Mis Letras',
    headerLeft:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title='Menu' iconName={Platform.OS==='android' ? 'md-menu':'ios-menu'} onPress={()=>{
    navData.navigation.toggleDrawer()}}/>
    </HeaderButtons>),
    headerRight:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title='Add' iconName={Platform.OS==='android' ? 'md-create':'ios-create'} onPress={()=>{
    navData.navigation.navigate('EditarLetras')}}/>
    </HeaderButtons>)
    }
}

export default UserLetrasScreen;