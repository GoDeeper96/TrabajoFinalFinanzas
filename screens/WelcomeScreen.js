import WelcomeFade  from '../components/animations/Animation'
import React,{ useEffect,useState } from 'react'
import { StyleSheet,View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors'
import MainButton from '../components/animations/Buttons'

const WelcomeScreen = props => {
    // const [Loading,SetLoading] = useState(false);
    const dispatch = useDispatch();
    // const loadingOver = useSelector(state=>!!state.auth.isLoading);
    const [FadeIsGone,SetFadeIsGone] = useState(false);
    const startLoading = () =>
    {
    //   props.onBTCready(true)
    dispatch(authActions.isLoading());
    }
    useEffect(() => {
        setTimeout(() => {
            // SetLoading(true);
            SetFadeIsGone(true);
          }, 11000)
    }, [])
    return (
    <LinearGradient
    colors={Colors.flare}
    style={styles.container}
    visible={true}>
        <WelcomeFade>
            Nombre de usuario
        </WelcomeFade>
        <View style={styles.btn}>
            { FadeIsGone?(
            <MainButton onPress={startLoading}> Continuar</MainButton>
        ):null}
        </View>
    </LinearGradient>
    )
}
export default WelcomeScreen;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn:
    {
      marginVertical:0,
      top:200,
      left:120
    }
    });

