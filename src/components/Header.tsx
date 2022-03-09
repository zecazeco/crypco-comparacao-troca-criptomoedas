import React, { useState } from 'react';
import { Appbar } from 'react-native-paper';

type Props = {
  children: React.ReactNode;
};


export default function Header({ onPress }: any) {
  return (  
    <Appbar.Header >
      <Appbar.Content title="Portfólio" />
      <Appbar.Action icon="refresh" onPress={onPress} />
    </Appbar.Header>
  );
}