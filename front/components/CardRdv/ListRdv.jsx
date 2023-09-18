import React from 'react';
import { View, Text } from 'react-native';

const AppointmentItem = ({ appointment }) => {
  return (
    <View>
      <Text>Date: {appointment.date}</Text>
      <Text>Heure: {appointment.time}</Text>
      <Text>Description: {appointment.description}</Text>
      <Text>Nom: {appointment.name}</Text>
    </View>
  );
};

export default AppointmentItem;



