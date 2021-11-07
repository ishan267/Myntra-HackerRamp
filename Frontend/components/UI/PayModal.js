import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator, FlatList, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Colors from "../../constants/Colors";
import * as chatroomAction from '../../store/actions/chatroom';
import { useSelector, useDispatch } from 'react-redux';
import user from "../../models/user";
import { Ionicons } from "@expo/vector-icons";
import CartItem from '../shop/CartItem'
import Card from "./Card";
import DropDownPicker from 'react-native-dropdown-picker';


const PayModal = (props) => {

    const modalVisible = props.visible;
    const setModalVisible = props.setModalVisible;
    const orderList=props.orderList;
    const total=props.total;

    
    const onCancelHandler = () => {
        setModalVisible(!modalVisible);
    }

    const onSubmitHandler=()=>{
        setModalVisible(!modalVisible);
        Alert.alert("Order placed successfully!")
        props.navigation.navigate('CurrentShoppping')
        
    }

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <View style={{ height: 400, width: 300 }}>
                            
                            {/* <Text>Hello</Text> */}
                            <View>
                                <FlatList
                                    data={orderList}
                                    keyExtractor={({ index }) => index}
                                    style={{height:310}}
                                    renderItem={({ item, index }) => {
                                        return <>
                                        <Text>{item.name}</Text>
                                         <View style={styles.detailItems}>
                                        {item.products.map(cartItem => (
                                            <CartItem
                                                key={cartItem.productId}
                                                quantity={cartItem.quantity}
                                                amount={cartItem.sum}
                                                title={cartItem.productTitle}
                                            />
                                        ))}
                                    </View>
                                        </>
                                    }}
                                />
                            </View>
                            <View style={{alignItems:'center',marginTop:10}}>
                            <Text style={{fontSize:20,fontWeight:'700'}}>Total : ${total.toFixed(2)}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 10,justifyContent:'space-between',paddingHorizontal:30 }}>
                                <View style={[styles.actions, { backgroundColor: 'red'}]}>
                                    <Text style={{ color: 'white', paddingTop: 5 }} onPress={onCancelHandler}> Cancel</Text>
                                </View>
                                <View style={[styles.actions, { backgroundColor: 'green' }]}>
                                    <Text style={{ color: 'white', paddingTop: 5 }} onPress={onSubmitHandler}> Order </Text>
                                </View>


                            </View>
                        </View>
                    </View>
                </View>

            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 20,

    },
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    },
    image: {
        backgroundColor: 'skyblue',
        width: 80,
        height: 80
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',
        width:80,
        height:30,
        borderRadius:10,
      
      },
      detailItems: {
        width: '100%'
    },
});

export default PayModal;