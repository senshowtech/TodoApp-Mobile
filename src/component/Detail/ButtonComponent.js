import React from 'react';
import {Button} from 'react-native-paper';
import {View} from 'react-native';

export default function ButtonComponent({showModal, showDialog}) {
  return (
    <View style={{padding: 10, width: 120, flexDirection: 'row'}}>
      <Button icon="file-document-edit" color="blue" onPress={showModal}>
        edit
      </Button>
      <Button icon="delete" color="red" onPress={showDialog}>
        delete
      </Button>
    </View>
  );
}
