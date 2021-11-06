import React from "react";
import * as Animatable from 'react-native-animatable';
import { UserImgWrapper, UserImg } from "../../styles/MessageStyles";


const FloatingAnimation = () => {
    return (
        <Animatable.View animation="slideInDown" iterationCount={5} direction="alternate">
            <UserImgWrapper>
                <UserImg source={require('../../assets/users/user-4.jpg')} />
            </UserImgWrapper>
        </Animatable.View>
    );
}

export default FloatingAnimation;