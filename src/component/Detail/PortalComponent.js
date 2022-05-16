import React from 'react';
import {
  Modal,
  Portal,
  Dialog,
  TextInput,
  Headline,
  Button,
  Paragraph,
} from 'react-native-paper';

import {View} from 'react-native';

export default function PortalComponent({
  hideModal,
  setTask,
  visible,
  containerStyle,
  task,
  EditTodo,
  visibleDialog,
  hideDialog,
  DeleteTodo,
}) {
  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Headline>Edit Todo</Headline>
          <TextInput
            label="Edit Task"
            name="task"
            value={task}
            onChangeText={val => setTask(val)}
          />
          <Button mode="contained" onPress={EditTodo} style={{marginTop: 20}}>
            Edit
          </Button>
        </Modal>
      </Portal>
      <Portal>
        <Dialog visible={visibleDialog} onDismiss={hideDialog}>
          <Dialog.Title>Hapus</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Anda Yakin Ingin Menghapus ?</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={DeleteTodo}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
