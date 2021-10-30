import { FloatingAction } from "react-native-floating-action";

import React from "react";
const FloatingActionButton=(props)=>{
    const {onclick}=props

     return(
    
    <FloatingAction
     
      onPressItem={onclick}
    />
 
  )
}

export default FloatingActionButton;