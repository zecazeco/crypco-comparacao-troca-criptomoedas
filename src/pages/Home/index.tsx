import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Card, IconButton } from 'react-native-paper';
import Header from '../../components/Header';

export default function App() {
  return (
    <>
      <Header />
      <ScrollView contentInsetAdjustmentBehavior="automatic" >
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        />
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        />  
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        />
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        /> 
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        /> 
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        /> 
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        /> 
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        /> 
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        /> 
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        /> 
        <Card.Title
          title="Card Titl2e"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        />   
        <Card.Title
          title="Card Titl2e33"
          subtitle="Card Subtitle"
          left={(props) => <Avatar.Icon {...props} icon="folder" />}
          right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
        />                        
      </ScrollView>
    </>
  );
}
