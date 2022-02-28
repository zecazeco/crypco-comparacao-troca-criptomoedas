import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

interface FuncProps {
  onPress(): void;
};

//export default function AddFab: React.FC<FuncProps>(props) {
const AddFab: React.FC<FuncProps> = (props) => {
  return (
    <FAB
      style={styles.fab}
      icon="plus"
      onPress={props.onPress}
    />   
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 24,
    right: 0,
    bottom: 0,
  },
});

export default AddFab;