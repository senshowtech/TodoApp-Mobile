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
import ButtonComponent from '../component/Detail/ButtonComponent';
import PortalComponent from '../component/Detail/PortalComponent';

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
      }
    } catch (error) {
      console.log(error);
    }
  };

  const DeleteTodo = async () => {
    try {
      const response = await API.delete(`/todo/${route.params.id}`);
      if (response.status === 201) {
        navigation.navigate('TodoApp');
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
        <ButtonComponent showModal={showModal} DeleteTodo={DeleteTodo} />
      </View>
      <View style={{padding: 20, marginTop: -20}}>
        <Title>{task}</Title>
      </View>
      <PortalComponent
        hideModal={hideModal}
        setTask={setTask}
        visible={visible}
        containerStyle={containerStyle}
        task={task}
        EditTodo={EditTodo}
      />
    </View>
  );
}
