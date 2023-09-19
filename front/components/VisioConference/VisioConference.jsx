import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';

const AppointmentsScreen = ({ route }) => {
  const { doctorId } = route.params;

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);

  useEffect(() => {
    // Gérez l'accès à la caméra ici avec Expo Camera (localStream)

    // Démarrez la connexion avec l'autre participant (peer-to-peer)

    // Gérez la réception de la vidéo distante (remoteStream)
  }, [doctorId]);

  return (
    <View>
      <Text>Appel vidéo avec le médecin {doctorId}</Text>
      <View>
        {localStream && (
          <Camera
            style={{ width: 200, height: 200 }}
            type={Camera.Constants.Type.front}
          />
        )}
      </View>
      <View>
        {remoteStream && <Video source={{ uri: remoteStream }} style={{ width: 200, height: 200 }} />}
      </View>
      <Button title="Terminer l'appel" onPress={() => { /* Terminer l'appel vidéo ici */ }} />
    </View>
  );
};
export default AppointmentsScreen;
