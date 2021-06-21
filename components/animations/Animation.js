import React, { useRef, useEffect,useState } from 'react';
import { Animated, Text, View,StyleSheet } from 'react-native';


const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
    const [Loading,SetLoading] = useState(false);
    useEffect(() => {
      Animated.sequence([
        Animated.timing(
          fadeAnim,
          {
            toValue: 1,
            duration: 5000,
            useNativeDriver: true, 
          }
        ),
        Animated.timing(
          fadeAnim,
          {
            toValue: 0,
            duration: 5000,
            useNativeDriver: true, 
          }
        ),
      ]).start(()=>
      {
        SetLoading(true);
        // store();
      })
    }, [fadeAnim]);
    
    return (
      <View style={styles.container} >
          <Animated.View style={{opacity:fadeAnim,width:300,height:50}}>    
              <Text style={styles.name}>Bievenido, {props.children}</Text> 
          </Animated.View>
      </View>
    );
  }
  
  const styles=StyleSheet.create({
      container:
      {
          alignItems: 'center',justifyContent:'center'
      },
      name:
      {
          fontSize: 20, textAlign: 'center', 
        //   margin: 10,
        //   bottom:50
      },
    
  });
  // You can then use your `FadeInView` in place of a `View` in your components:
  export default FadeInView;