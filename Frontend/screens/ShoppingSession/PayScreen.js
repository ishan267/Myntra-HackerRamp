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
import PayModal from "../../components/UI/PayModal";
import user from "../../models/user";


const PayScreen = (props) => {

    const sessionCarts = useSelector(state => state.cart.sessionCarts);
    const users = useSelector(state => state.users.availableUsers);
    console.log("session cart info", sessionCarts)
    let checkout=[];
    for(let i=0;i<sessionCarts.length;i++)
    {
        let newName;
        for(let j=0;j<users.length;j++)
        {
            if(users[j].id==sessionCarts[i].userId)
            {
                newName=users[j].name;
                break;
            }
        }
        let newProduct=[];
        for (var property in sessionCarts[i].carts) 
        {
            const obj = sessionCarts[i].carts[property];
            obj = {...obj,productId:property};
            newProduct.push(obj);
        } 
        let obj={
            id:sessionCarts[i].userId,
            name:newName,
            total: sessionCarts[i].amount,
            isSelected: false,
            products:newProduct.slice()
        }
        checkout.push(obj);
    }
    console.log("final array is",checkout);
    // let checkout = [
    //     {
    //         id: 1,
    //         name: "Ishan Thapa",
    //         products: [
    //             {
    //                 productId: 1,
    //                 productTitle: "Shirt",
    //                 productPrice: 40,
    //                 quantity: 2,
    //                 sum: 80
    //             },
    //             {
    //                 productId: 2,
    //                 productTitle: "jeans",
    //                 productPrice: 80,
    //                 quantity: 1,
    //                 sum: 80
    //             },
    //             {
    //                 productId: 2,
    //                 productTitle: "Gun",
    //                 productPrice: 100,
    //                 quantity: 1,
    //                 sum: 100
    //             },
    //             {
    //                 productId: 2,
    //                 productTitle: "Gun",
    //                 productPrice: 100,
    //                 quantity: 1,
    //                 sum: 100
    //             },
    //             {
    //                 productId: 2,
    //                 productTitle: "Gun",
    //                 productPrice: 100,
    //                 quantity: 1,
    //                 sum: 100
    //             }
    //         ],
    //         total: 260,
    //         isSelected: false
    //     },
    //     {
    //         id: 2,
    //         name: "Arju Kumar",
    //         products: [
    //             {
    //                 productId: 1,
    //                 productTitle: "Shirt",
    //                 productPrice: 40,
    //                 quantity: 2,
    //                 sum: 80
    //             },
    //             {
    //                 productId: 2,
    //                 productTitle: "perfume",
    //                 productPrice: 100,
    //                 quantity: 1,
    //                 sum: 100
    //             }
    //         ],
    //         total: 180,
    //         isSelected: false
    //     }
    // ]

    const [selectedToPay, setSelectedToPay] = useState([]);  // this will be managed by redux
    const [checkoutList, setCheckoutList] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [payModalVisible,setPayModalVisible]=useState(false);
    const [totalToPay,setTotalToPay]=useState(0);

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
        let sum=0;
        for(var i=0;i<selectedToPay.length;i++){
            sum+=selectedToPay[i].total;
        }
        setTotalToPay(sum);

        console.log("all", checkoutList);
        console.log("selected", selectedToPay);
    }

    const onPayHandler=()=>{
        if(selectedToPay.length==0){
            Alert.alert("Select to pay");
            return;
        }
        setPayModalVisible(true);
    }


    return (
        <>
        <PayModal 
           visible={payModalVisible}
           setModalVisible={setPayModalVisible}
           total={totalToPay}
           orderList={selectedToPay}
           navigation={props.navigation}
        />
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
                                    > {showProducts ? 'Hide' : 'Show'}</Text>
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