import React from 'react';
import { Appbar } from 'react-native-paper';

type Props = {
  children: React.ReactNode;
};

export default function Header() {
  return (  
    <Appbar.Header >
      <Appbar.Content title="Ativos" />
    </Appbar.Header>
  );
}