import React from 'react';
import {Modal, Portal, TextInput, Headline, Button} from 'react-native-paper';

export default function PortalComponent({
  hideModal,
  setTask,
  visible,
  containerStyle,
  task,
  EditTodo,
}) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Headline>Edit Task</Headline>
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
  );
}
