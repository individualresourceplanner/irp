import React, { Component } from 'react'
import { Text, View, Picker, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import { Input, Button } from 'react-native-elements'
import styles from './ResourceForm.scss'

export default class ResourceForm extends Component {

  state={
    title: '',
    tags: '',
    price: '',
    unit: '',
    quantity: '',
    units: 'kg',
    description: '',
    location: '',
  }

  render() {
    let { title, tags, price,
      unit, quantity, units,
      description, location } = this.state

    //TODO photo
    return (
      <View style={styles.Container}>
        <View style={styles.NecessaryView}>
          <Input
            containerStyle={styles.InputFull}
            placeholder={'Title'}
            textAlign={'center'}
            value={title}
            onChangeText={text => this.setState({title: text})}
            leftIcon={
              <Icon
                name={'text'}
                size={22}
              />}
          />
          <Input
            containerStyle={styles.InputFull}
            placeholder='Tags'
            textAlign={'center'}
            value={tags}
            onChangeText={text => this.setState({tags: text})}
            leftIcon={
               <Icon
                 name={'tag'}
                 size={22}
               />}/>
          <View style={styles.NecessaryViewHorizontal}>
            <Input containerStyle={styles.InputHalf}
              textAlign={'center'}
              value={price}
              onChangeText={text => this.setState({price: text})}
              leftIcon={
                 <Icon
                   name={'price-tag'}
                   size={22}
                 />}
              placeholder='Price'/>
            <Text style={{ width: '10%', textAlign: 'center',}}>/</Text>
            <Input containerStyle={styles.InputHalf}
              textAlign={'center'}
              value={unit}
              onChangeText={text => this.setState({unit: text})}
              leftIcon={
                 <Icon
                   name={'box'}
                   size={22}
                 />}
              placeholder='Unit'/>
          </View>
          <View style={styles.NecessaryViewHorizontal}>
            <Input containerStyle={{width: '65%',}}
              textAlign={'center'}
              value={quantity}
              onChangeText={text => this.setState({quantity: text})}
              leftIcon={
                 <Icon
                   name={'shopping-cart'}
                   size={22}
                 />}
              placeholder='Quantity'/>
            <Picker style={styles.Picker}
              selectedValue={units}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({units: itemValue})
              }>
              <Picker.Item label='kg' value='kg'/>
              <Picker.Item label='litres' value='litres' />
              <Picker.Item label='items' value='items' />
            </Picker>
          </View>
          <TextInput
            multiline={true}
            numberOfLines={3}
            textAlignVertical={'top'}
            value={description}
            onChangeText={text => this.setState({description: text})}
            style={styles.InputBox}
            placeholder={'Description'}
          />
          <Input
            textAlign={'center'}
            containerStyle={styles.InputFull}
            placeholder='Location'
            value={location}
            onChangeText={text => this.setState({location: text})}
            leftIcon={
             <Icon
               name={'location'}
               size={22}
             />}/>
          <View style={styles.NecessaryViewHorizontal}>
            <Button
              buttonStyle={styles.AddPhotoButton}
              icon={{
                name: 'camera-alt',
                size: 25,
                color: 'white'
              }}/>
            <Button
              title='Publish'
              buttonStyle={styles.PublishButton}
            />
            </View>
          </View>
        </View>
    )
  }
}
