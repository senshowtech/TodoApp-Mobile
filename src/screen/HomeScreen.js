import React from 'react';
import {View, ScrollView} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {API} from '../config/axios';
import ButtonComponent from '../component/Home/ButtonComponent';
import CardComponent from '../component/Home/CardComponent';
import PortalComponent from '../component/Home/PortalComponent';

export default function HomeScreen() {
  const [visible, setVisible] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [task, setTask] = React.useState('');
  const [dataTodo, setdataTodo] = React.useState([]);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const getTodo = async () => {
      try {
        const response = await API.get('/todos');
        setdataTodo(response.data.data.todo);
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();
    if (isFocused) {
      getTodo();
    }
  }, [id, isFocused]);

  const SaveTodo = async () => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const data = {
        task: task,
      };
      const response = await API.post('/todo', data, config);
      setId(response.data.data.todo.id);
      if (response.status === 201) {
        setVisible(false);
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
    <ScrollView>
      <View style={{marginTop: 20}}>
        <ButtonComponent showModal={showModal} setVisible={setVisible} />
      </View>
      <View style={{padding: 15, marginTop: -20}}>
        {dataTodo.map(item => {
          return <CardComponent key={item.id} item={item} />;
        })}
        <PortalComponent
          hideModal={hideModal}
          setTask={setTask}
          visible={visible}
          containerStyle={containerStyle}
          task={task}
          SaveTodo={SaveTodo}
        />
      </View>
    </ScrollView>
  );
}
