import React from 'react';
import { SearchBar } from 'react-native-elements';
import styles from './FilterBar.scss';

export default function FilterBar(props) {
  const { value, onUpdate } = props;
  return (
    <SearchBar
      inputContainerStyle={{
        backgroundColor: 'white',
      }}
      containerStyle={styles.containerStyle}
      lightTheme
      placeholder="Filter resources…"
      value={value}
      onChangeText={onUpdate}
    />
  );
}
