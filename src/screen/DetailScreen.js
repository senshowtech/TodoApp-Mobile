import React from 'react';
import {View} from 'react-native';
import {Title, Button} from 'react-native-paper';

export default function DetailScreen({route}) {
  return (
    <View>
      <View style={{padding: 10, width: 120, flexDirection: 'row'}}>
        <Button
          icon="file-document-edit"
          color="blue"
          onPress={() => console.log('Pressed')}>
          edit
        </Button>
        <Button
          icon="delete"
          color="red"
          onPress={() => console.log('Pressed')}>
          delete
        </Button>
      </View>
      <View style={{padding: 20, marginTop: -20}}>
        <Title>{route.params.task}</Title>
      </View>
    </View>
  );
}
