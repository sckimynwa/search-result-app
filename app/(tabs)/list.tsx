import { StyleSheet } from 'react-native';

import { useQuery } from '@tanstack/react-query';
import { Button, FlatList } from 'react-native';
import { listTodos } from '../../apis/todo';
import { Text, View } from '../../components/Themed';
import { useRouter } from 'expo-router';

export default function TabOneScreen() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery(['todos'], listTodos);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>An error has occurred</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Button
              title="View Details"
              onPress={() => router.push('/detail')}
            />
          </View>
        )}
      />
      <Button title="Create Todo" onPress={() => router.push('/detail')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
