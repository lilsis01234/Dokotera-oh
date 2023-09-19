import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { Video } from 'expo-av';

const AppointmentsScreen = ({ route }) => {
  const [docteur,setDocteur]= useState([]);

  useEffect(() => {
    const { doctorId } = route.params;

    // Make a GET request to fetch user data based on doctorId
    axios.get(`http://localhost:3000/doctor/profil/${doctorId}`)
      .then((response) => {
        // Set the fetched user data to the state
        setDocteur(response.data);
      })
      .catch((error) => {
        // Handle errors appropriately
        console.error(error);
      });
  }, [route.params]);


  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isCalling, setIsCalling] = useState(false);

  const peerConnectionRef = useRef(null);

  useEffect(() => {
    // Gérez l'accès à la caméra ici avec Expo Camera (localStream)
    const getCameraPermission = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === 'granted') {
        const stream = await Camera.getCameraStreamAsync({
          type: Camera.Constants.Type.front,
          audio: true, // You can include audio if needed
        });
        setLocalStream(stream);
      } else {
        console.log("Permission not granted for camera");
        // Handle the case where permission is not granted, e.g., show a message to the user
      }
    };
  
    getCameraPermission();
  }, []);

  const startVideoCall = async () => {
    if (!localStream) {
      console.log("Permission not granted for camera");
      return;
    }

    setIsCalling(true);

    // Initialize and manage the peer-to-peer connection here
    const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
    const peerConnection = new RTCPeerConnection(configuration);

    peerConnectionRef.current = peerConnection;

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        // Send the ICE candidate to the other participant
        // You need a signaling server to exchange ICE candidates
      }
    };

    peerConnection.onaddstream = (event) => {
      const remoteVideoStream = event.stream;
      setRemoteStream(remoteVideoStream);
    };

    // Create and send an offer to the other participant
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);

    // Send the offer to the other participant
    // You need a signaling server to exchange offers and answers
  };

  const endVideoCall = () => {
    // Terminate the video call and close the peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }
    setIsCalling(false);
    setRemoteStream(null);
  };

  return (
    <View>
      <Text>Appel vidéo avec le médecin {docteur.name}</Text>
      <View>
        {localStream && (
          <Camera
            style={{ width: 200, height: 200 }}
            type={Camera.Constants.Type.front}
            ref={(ref) => {
              // You can access the camera component's ref here if needed
            }}
          />
        )}
      </View>
      <View>
        {remoteStream && <Video source={{ uri: remoteStream.toURL() }} style={{ width: 200, height: 200 }} />}
      </View>
      {isCalling ? (
        <Button title="Terminer l'appel" onPress={endVideoCall} />
      ) : (
        <Button title="Appeler maintenant" onPress={startVideoCall} />
      )}
    </View>
  );
};

export default AppointmentsScreen;
