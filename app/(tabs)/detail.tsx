import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { createTodo } from '../../apis/todo';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function TodoDetailPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const mutation = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      router.push('/list');
    },
  });
  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <Button
        title="Create"
        onPress={() => mutation.mutate({ title, description })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: 'flex-start',
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
  input: {
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
