import React from 'react';
import { FlatList } from 'react-native';
import AppointmentItem from './ListRdv';

const AppointmentList = ({ appointments }) => {
  return (
    <FlatList
      data={appointments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <AppointmentItem appointment={item} />}
    />
  );
};

export default AppointmentList;
