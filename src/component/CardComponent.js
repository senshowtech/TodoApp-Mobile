import React from 'react';
import {Card, Title} from 'react-native-paper';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function CardComponent({item}) {
  const navigation = useNavigation();
  return (
    <View>
      <View
        style={{
          marginTop: 15,
          borderLeftColor: '#3498db',
          borderLeftWidth: 10,
        }}>
        <Card
          stye={{marginTop: 10}}
          onPress={() => navigation.navigate('Detail', item)}>
          <Card.Content>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Title>{item.task}</Title>
            </View>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}
