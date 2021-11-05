import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator, FlatList, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Colors from '../../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';

import { Ionicons } from "@expo/vector-icons";
import CartItem from '../../components/shop/CartItem';
import Card from "../../components/UI/Card"
import DropDownPicker from 'react-native-dropdown-picker';
import OrderItem from "../../components/shop/OrderItem";
import { Container } from "../../styles/MessageStyles";


const PayScreen = (props) => {

    const checkout = [
        {
            id: 1,
            name: "Ishan Thapa",
            products: [
                {
                    productId: 1,
                    productTitle: "Shirt",
                    productPrice: 40,
                    quantity: 2,
                    sum: 80
                },
                {
                    productId: 2,
                    productTitle: "jeans",
                    productPrice: 80,
                    quantity: 1,
                    sum: 80
                }
            ],
            total: 160,
            isSelected: false
        },
        {
            id: 2,
            name: "Arju Kumar",
            products: [
                {
                    productId: 1,
                    productTitle: "Shirt",
                    productPrice: 40,
                    quantity: 2,
                    sum: 80
                },
                {
                    productId: 2,
                    productTitle: "perfume",
                    productPrice: 100,
                    quantity: 1,
                    sum: 100
                }
            ],
            total: 180,
            isSelected: false
        }
    ]

    const [selectedToPay, setSelectedToPay] = useState([]);
    const [checkoutList, setCheckoutList] = useState([]);
    const [showProducts, setShowProducts] = useState(false);

    useEffect(() => {
        checkoutList.map((f) => f.isSelected = false);
        setCheckoutList(checkout);
    }, [])

    const onClickHandler = (index) => {
        let newData = [...checkoutList];
        if (checkoutList[index].isSelected === false)
            newData[index].isSelected = true;
        else {
            newData[index].isSelected = false;
        }

        setCheckoutList(newData);
        const selectedToPay = newData.filter((f) => f.isSelected === true);
        setSelectedToPay(selectedToPay);
        console.log("all", checkoutList);
        console.log("selected", selectedToPay);
    }

    const onPayHandler=()=>{
        Alert.alert("Payment done successfully!")
        props.navigation.navigate('CurrentShoppping')
    }


    return (
        <>
          <Container>
            <View>
                <FlatList
                    data={checkoutList}
                    keyExtractor={({ index }) => index}

                    renderItem={({ item, index }) => {
                        return <>
                            <Card style={styles.orderItem}>
                                <View style={[styles.iconCont, { backgroundColor: item.isSelected === true ? 'red' : 'green' }]}>
                                    <Ionicons
                                        name={Platform.OS === "android" ? (item.isSelected === false ? "md-add" : "md-remove") : (item.isSelected === false ? "ios-add" : "ios-remove")}
                                        size={23}
                                        color='white'
                                        onPress={() => onClickHandler(index)}
                                    />
                                </View>
                                <View style={styles.summary}>
                                    <Text style={styles.date}>{item.name}</Text>
                                    <Text style={styles.totalAmount}>${item.total.toFixed(2)}</Text>

                                </View>
                                <View style={{ backgroundColor: showProducts ? '#FF3659' : Colors.primary, width: 95, height: 40, borderRadius: 10 }}>
                                    <Text
                                        style={{ color: 'white', paddingTop: 10, textAlign: 'center', paddingRight: 3 }}
                                        onPress={() => {
                                            setShowProducts(prevState => !prevState);
                                        }}
                                    > {showProducts ? 'Hide Products' : 'Show Products'}</Text>
                                </View>
                                {showProducts && (
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
                                )}
                            </Card>
                        </>

                    }}
                />

            </View>
            </Container>
            <View style={{backgroundColor:'white'}}>
            <View style={{ backgroundColor: Colors.primary, width: 95, height: 40, borderRadius: 10,marginLeft:290,marginBottom:30 }}>
          <Text
            style={{ color: 'white', paddingTop: 10, textAlign: 'center', paddingRight: 3 }}
            onPress={onPayHandler}
          >Pay</Text>
        </View>
        </View>


        </>
    )
}

PayScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "Payment",
    };
};

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
    },
    detailItems: {
        width: '100%'
    },
    iconCont: {
        borderRadius: 20,
        marginLeft: 280,
        marginBottom: 10,
        zIndex: 10
    },

});

export default PayScreen;