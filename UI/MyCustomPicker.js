import React from 'react';
import {View, Text,TouchableOpacity,Modal,StyleSheet, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker'
const MyCustomPicker = ({modalOpen,setModalOpen,value,setValue,items}) =>{
    const pickerData = (data) =>{
        return (data?.length>0) && (
            data.map((val,index)=> <Picker.Item label={val} value={val} key={index}/>)
        )
        
    }
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={()=>{
            Alert.alert('Quieres cerrar la ventana webon?',
            [{text:'Si pem'}]);
        }}
        >
        <View style={styles.container}>
         <View style={styles.pickerContainer}>
             <TouchableOpacity
             style={styles.closeButton}
             onPress={()=>{setModalOpen(!modalOpen)}}
             >
             <Text>Close</Text>   
             </TouchableOpacity>
             <Picker
             selectedValue={value}
             style={{height:50,width:'100%'}}
             onValueChange={(itemValue,itemIndex)=>{
                 setValue(itemValue);
             }}>
             {pickerData(items)}    
             </Picker>
        </View>   
        </View> 
        </Modal>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pickerContainer:{

        backgroundColor:'white',
        width:'100%',
        height:'40%',
        position:'absolute',
        bottom:0.2,

    },
    closeButton:{
        justifyContent:'center',
        alignItems:'center'
    }
})
export default MyCustomPicker;



// <Modal
//              animationType="slide"
//              transparent={true}
//              visible={props.modalOpen}
//              onRequestClose={()=>{
//                  Alert.alert('Quieres cerrar la ventana webon?',
//                  [{text:'Si pem'}]);
//              }}
//              >
//              <View style={styles.container}>
//               <View style={styles.pickerContainer}>
//                   <TouchableOpacity
//                   style={styles.closeButton}
//                   onPress={props.setModalOpen}
//                   >
//                   <Text>Close</Text>    
//                   </TouchableOpacity>
//                   <Picker
//                   selectedValue={props.value}
//                   onChangeText={textChangeHandler}
//                   style={{height:50,width:'100%'}}
//                   onValueChange={props.onValueChange}>
//                   {pickerData(props.items)}    
//                   </Picker>
//              </View>   
//              </View> 
//              </Modal>