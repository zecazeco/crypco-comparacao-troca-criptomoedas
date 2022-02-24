import { List } from 'react-native-paper';

export default function App() {
  return (
    <List.Item
      title="First Item"
      description="Item description"
      left={props => <List.Icon {...props} icon="folder" />}
    />
  );
}