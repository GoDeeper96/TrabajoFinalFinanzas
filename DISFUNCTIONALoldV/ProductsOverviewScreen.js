import React,{useState,useEffect,useCallback} from 'react';
import {FlatList,Text,Platform,Button, ActivityIndicator,View,StyleSheet} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import LetraItem from '../../components/shop/LetraItem'
import * as cartActions from '../../store/actions/cartActions'
import * as letrasActions from '../../store/actions/letrasActions'
import {HeaderButtons,Item}from 'react-navigation-header-buttons'
import HeaderButton from '../../UI/HeaderButton'
import Colors from '../../constants/Colors'
const ProductOverviewScreen = props =>{

    
    const [OnSpinner,SetOnSpinner] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [isRefreshing,SetIsRefreshing] = useState(false);
    const [err,SetErr] = useState();
    const letras = useSelector(state=>state.letras.availableletras);
    const dispatch = useDispatch();
    const loadLetras =useCallback (async () =>{
        SetErr(null);
        SetIsRefreshing(true);
        try {
            await dispatch(letrasActions.fetchLetras())
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
            productId: id,
            productTitle: title
        })
    }
    if(err){
        return (
        <View style={styles.ct}>
            <Text>An error ocurred!</Text>
            <Button title='Try again' onPress={loadLetras} color={Colors.primary}/>
        </View>
        );
    }
    if(isLoading)
    {
        return (<View style={styles.ct}>
            <ActivityIndicator size='large' color={Colors.accent}/>
        </View>);
    }
    if(!isLoading&&letras.length===0){
        return(
            <View style={styles.ct}>
                <Text>No letras found. Maybe start adding some!</Text>
            </View>
        )
    }
    return (<FlatList data={letras} keyExtractor={item=>item.id} 
        onRefresh={loadLetras}
        refreshing={isRefreshing}
        renderItem={itemData=><LetraItem image={itemData.item.imageUrl} 
                                           title={itemData.item.title}    
                                           price={itemData.item.price}
                                           onSelect={()=>{
                                            selectItemHandler(itemData.item.id,itemData.item.title)
                                        }}>                                                         
                                           <Button color={Colors.primary} title="View Details" onPress={()=>{ selectItemHandler(itemData.item.id,itemData.item.title)}}/>
                                           <Button color={Colors.primary} title="To Cart" onPress={ ()=>{ dispatch(cartActions.addToCart(itemData.item))}}/>
                                                                                                    </LetraItem>}/>);         
}

// export const screenOptions = navData =>{
//     return{
//     headerTitle:'All letras',
//     headerLeft:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
//                         <Item title='Menu' iconName={Platform.OS==='android' ? 'md-menu':'ios-menu'} onPress={()=>{
//                         navData.navigation.toggleDrawer()}}/>
//                     </HeaderButtons>),
//     headerRight:()=>(<HeaderButtons HeaderButtonComponent={HeaderButton}>
//                         <Item title='Cart' iconName={Platform.OS==='android' ? 'md-cart':'ios-cart'} onPress={()=>{
//                         navData.navigation.navigate('Cart')}}/>            
//                     </HeaderButtons>)
//     }
// };
const styles = StyleSheet.create({
    ct:{
        flex:1, 
        justifyContent:'center',
        alignItems:'center'
    }
})
export default ProductOverviewScreen;