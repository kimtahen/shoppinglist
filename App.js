import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, FlatList, Alert} from 'react-native';
import Header from "./components/Header";
import ListItem from './components/ListItem';
import AddItem from "./components/AddItem";
import uuid from 'uuid-random';
import AsyncStorage from "@react-native-community/async-storage";

const App = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=> {
        const read = async () => {
            try {
                const value = await AsyncStorage.getItem('shoppinglist');
                return value != null ? JSON.parse(value) : [];
            } catch (e) {
                return [];
            }
        };
        read().then(value=>{
            setIsLoading(false);
            setItems(value);
        })
    },[]);
    useEffect(()=>{
        const storeData = async (value) => {
            try {
                const jsonValue = JSON.stringify(value)
                await AsyncStorage.setItem('shoppinglist', jsonValue)
                return true;
            } catch (e) {
                return false;
            }
        }
        storeData(items);
    },[items]);

    const deleteItem = (id) => {
        setItems(prevItems => {
            return prevItems.filter(item => item.id !== id);
        })
    }

    const addItem = (text) => {
        if (text===''){
            Alert.alert('Please enter an item');
        } else {
            setItems(prevItems => {
                return [{id: uuid(), text}, ...prevItems];
            })
        }

    }

    return (
        <View style={styles.container}>
            <Header title={isLoading ? `Loading...` : `Shopping List`}/>
            <AddItem addItem={addItem}/>
            <FlatList data={items} ListEmptyComponent={() => <View></View>} renderItem={({item}) => <ListItem item={item} deleteItem={deleteItem}/>}/>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },

})
export default App;