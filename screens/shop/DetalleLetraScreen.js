import React from 'react'
import {ScrollView,View,Text,Image,Button,StyleSheet} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import Colors from '../../constants/Colors'
const DetalleLetraScreen = props =>{
    const letraId = props.route.params.letraId;
    const selectedLetras = useSelector(state =>
        state.letras.availableLetras.find(letr => letr.id === letraId)
      );
    const dispatch = useDispatch();
    return (
        <ScrollView>
            <Image style={styles.img} source={{uri:selectedLetras.imageUrl}}/>
            <View style={styles.actions}>
            {/* <Button color={Colors.primary} title='Add To Cart' onPress={()=>{
                dispatch(cartActions.addToCart(selectedLetras));
            }}/> */}
            </View>
            <Text style={styles.prc}>${selectedLetras.price.toFixed(2)}</Text>
            <Text style={styles.desc}>{selectedLetras.description}</Text>
        </ScrollView>
    )

};

export const screenOptions = navData=>{
    return {
        headerTitle: navData.route.params.letraTitle
    }
}

const styles = StyleSheet.create({
    actions:{
        marginVertical:10,
        alignItems:'center'
    },
    img:{
        width:'100%',
        height:300,
    },
    desc:
    {
        fontSize:18,
        textAlign:'center',
        marginHorizontal:20,
        fontFamily:'open-sans-bold'
    },
    prc:{
        fontSize:20,
        color:'#888',
        textAlign:'center',
        marginVertical:20,
        fontFamily:'open-sans-bold'
    },

})
export default DetalleLetraScreen