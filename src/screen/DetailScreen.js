import React from 'react';
import {View} from 'react-native';
import {
  Title,
  Button,
  Modal,
  Portal,
  TextInput,
  Headline,
} from 'react-native-paper';
import {API} from '../config/axios';
import {useNavigation} from '@react-navigation/native';

export default function DetailScreen({route}) {
  const [visible, setVisible] = React.useState(false);
  const [task, setTask] = React.useState('');
  const [id, setId] = React.useState(0);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await API.get(`/todo/${route.params.id}`);
        setTask(response.data.data.todos.task);
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();
  }, [id]);

  const EditTodo = async () => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const data = {
        task: task,
      };
      const response = await API.patch(
        `/todo/${route.params.id}`,
        data,
        config,
      );
      if (response.status === 201) {
        setVisible(false);
        setId(response.data.data.todos.id);
        // navigation.navigate('TodoApp', response.data.data.todos.id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
  };
  return (
    <View>
      <View style={{padding: 10, width: 120, flexDirection: 'row'}}>
        <Button icon="file-document-edit" color="blue" onPress={showModal}>
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
        <Title>{task}</Title>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Headline>Edit Task</Headline>
          <TextInput
            label="Task"
            name="task"
            value={task}
            onChangeText={val => setTask(val)}
          />
          <Button mode="contained" onPress={EditTodo} style={{marginTop: 20}}>
            Edit
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}
