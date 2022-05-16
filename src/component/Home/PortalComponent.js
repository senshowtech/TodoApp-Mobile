import React from 'react';
import {Modal, Portal, TextInput, Headline, Button} from 'react-native-paper';

export default function PortalComponent({
  hideModal,
  setTask,
  visible,
  containerStyle,
  task,
  SaveTodo,
}) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Headline>Add Todo</Headline>
        <TextInput
          label="Task"
          name="task"
          value={task.task}
          onChangeText={val => setTask({...task, task: val})}
        />
        <Button mode="contained" onPress={SaveTodo} style={{marginTop: 20}}>
          Save
        </Button>
      </Modal>
    </Portal>
  );
}
