import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Card, IconButton, Button, Title, Paragraph } from 'react-native-paper';

const instLogo = ({props}:any) => <Avatar.Icon style={styles.logo} {...props} icon="folder" />
const actionButton = ({props}:any) => <IconButton {...props} icon="format-list-bulleted" onPress={() => {}} />

export default function Item({ code, name }: any) {
  return (
    <Card style={styles.card} mode='elevated' elevation={2}>
      <Card.Title
        title={code}
        subtitle={name}
        left={instLogo}
        right={actionButton}
      />
    </Card>    
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  logo: {
    paddingRight: 10,
  }
});