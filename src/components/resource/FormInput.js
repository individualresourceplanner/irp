import React from 'react';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

export default function FormInput(props) {
  return (
    <Input
      containerStyle={props.style}
      inputContainerStyle={{ borderBottomWidth: 0 }}
      placeholder={props.placeholder}
      textAlign={'center'}
      underlineColorAndroid="transparent"
      value={props.title}
      onChangeText={text => props.onChange(text)}
      onKeyPress={(keyPress) => {
        if (props.onKeyPress) {
          props.onKeyPress(keyPress);
        }
      }}
      leftIcon={(
        <Icon
          name={props.Icon}
          size={22}
        />
      )}
    />
  );
}
