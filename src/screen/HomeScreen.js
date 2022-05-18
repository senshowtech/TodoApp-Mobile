import React from 'react';
import {View, SafeAreaView, FlatList} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {getUniqueId} from 'react-native-device-info';
import {API} from '../config/axios';
import ButtonComponent from '../component/Home/ButtonComponent';
import CardComponent from '../component/Home/CardComponent';
import PortalComponent from '../component/Home/PortalComponent';

export default function HomeScreen() {
  const [visible, setVisible] = React.useState(false);
  const [id, setId] = React.useState(0);
  const [task, setTask] = React.useState({
    task: '',
    uuid: '',
    doing: '',
  });
  const [dataTodo, setdataTodo] = React.useState([]);
  const page = React.useRef({
    current_page: 1,
    last_page: 0,
  });
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    const getTodo = async () => {
      try {
        if (page.current.current_page === 1) {
          const response = await API.get(
            `/todos/pagination/${getUniqueId()}/1`,
          );
          setdataTodo(response.data.data.todos);
          page.current = {
            current_page: response.data.data.current_page,
            last_page: response.data.data.last_page,
          };
        }
      } catch (error) {
        console.log(error);
      }
    };
    getTodo();
    if (isFocused) {
      getTodo();
    }
    setTask({
      ...task,
      doing: 'false',
      uuid: getUniqueId(),
    });
  }, [id, isFocused]);

  const SaveTodo = async () => {
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const data = {
        task: task.task,
        doing: task.doing,
        uuid: task.uuid,
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

  const renderItem = ({item}) => <CardComponent key={item.id} item={item} />;

  const fetchData = async () => {
    try {
      page.current = {
        ...page.current,
        current_page: page.current.current_page + 1,
      };
      if (page.current.current_page <= page.current.last_page) {
        const response = await API.get(
          `/todos/pagination/${getUniqueId()}/${page.current.current_page}`,
        );
        setdataTodo(dataTodo.concat(response.data.data.todos));
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
    <SafeAreaView>
      <View style={{marginTop: 20}}>
        <ButtonComponent showModal={showModal} setVisible={setVisible} />
      </View>
      <FlatList
        style={{padding: 20}}
        data={dataTodo}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReachedThreshol={0.2}
        onEndReached={fetchData}
      />
      <View style={{padding: 15, marginTop: -10}}>
        <PortalComponent
          hideModal={hideModal}
          setTask={setTask}
          visible={visible}
          containerStyle={containerStyle}
          task={task}
          SaveTodo={SaveTodo}
        />
      </View>
    </SafeAreaView>
  );
}
