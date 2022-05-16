import React from 'react';
import {Button} from 'react-native-paper';
import {View} from 'react-native';

export default function ButtonComponent({showModal}) {
  return (
    <View style={{width: 180, padding: 10}}>
      <Button
        style={{marginLeft: 10}}
        icon="pencil-plus-outline"
        mode="contained"
        onPress={showModal}>
        Add Todo
      </Button>
    </View>
  );
}
