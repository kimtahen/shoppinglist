import React, {useState} from 'react';
import {View, Text,StyleSheet,TextInput, TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

const AddItem = ({addItem}) => {
    const [text,setText] = useState('');
    const onChange = (textValue) => setText(textValue);
    return (
        <View>
            <TextInput placeholder={`Add Item...`} onChangeText={onChange} style={styles.input}/>
            <TouchableOpacity style={styles.btn}  onPress={()=>addItem(text)}>
                <Text style={styles.btnText}><AntDesign name={`plus`} size={20}/>  Add Item</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 60,
        padding: 8,
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#f1f1f1',
        padding: 9,
        margin: 5,
    },
    btnText: {
        color: 'steelblue',
        fontSize: 20,
        textAlign: 'center',
    }
})

export default AddItem;
