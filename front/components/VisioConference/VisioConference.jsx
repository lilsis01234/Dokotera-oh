import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { RTCView, mediaDevices, RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    // Avy am localhost:3000/rendezvous/ny id avy ao am localStorage.getItem('id')
  }, []);

  const isMeetingTime = (meetingDate, meetingStartTime) => {
    const rendezvousStartTime = new Date(meetingDate);
    const [hours, minutes] = meetingStartTime.split(':');
    rendezvousStartTime.setHours(hours);
    rendezvousStartTime.setMinutes(minutes);

    const currentDate = new Date();
    return currentDate >= rendezvousStartTime;
  };

  const initializeVideoCall = async () => {
    try {
      // Assurez-vous que selectedAppointment contient le rendez-vous sélectionné

      // Vérifiez les autorisations du docteur et du patient ici
      // Vous pouvez faire une requête au backend pour vérifier les autorisations

      // Vérifiez si la date et l'heure actuelles sont supérieures à la date et l'heure de début du rendez-vous
      if (isMeetingTime(selectedAppointment.date, selectedAppointment.heureStart)) {
        // Créez un peer connection
        const pc = new RTCPeerConnection({ iceServers: [] });

        // Obtenez le flux vidéo local
        const isFront = true; // Utilisez la caméra frontale
        const constraints = {
          audio: true,
          video: {
            mandatory: {
              minWidth: 500,
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
          },
        };

        const stream = await mediaDevices.getUserMedia(constraints);

        // Ajoutez le flux vidéo local au peer connection
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });

        // Gérez les événements de peer connection (ICE candidates, etc.)
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            // Envoyez l'ICE candidate au serveur
          }
        };

        // Obtenez l'offre de peer connection
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        // Envoyez l'offre au serveur
        // Attendez la réponse du serveur
        // Mettez à jour la description distante du peer connection

        // Créez une réponse RTCSessionDescription en utilisant la réponse du serveur
        const remoteDesc = new RTCSessionDescription({ type: 'answer', sdp: '...' });
        await pc.setRemoteDescription(remoteDesc);

        // Mettez à jour la description distante du peer connection

        // Le peer connection est maintenant établi et prêt à diffuser le flux vidéo
        setPeerConnection(pc);
      } else {
        console.log('Attente de l\'heure de début de la visioconférence...');
      }
    } catch (error) {
      console.error('Erreur lors de la création de la visioconférence :', error);
    }
  };

  const joinMeeting = (appointment) => {
    // Sélectionnez le rendez-vous auquel vous souhaitez participer
    setSelectedAppointment(appointment);

    // Initialisez la visioconférence
    initializeVideoCall();
  };

  return (
    <View>
      <Text>Mes rendez-vous approuvés</Text>
      {appointments.map((appointment) => (
        <View key={appointment._id}>
          <Text>Description : {appointment.description}</Text>
          <Text>Heure de début : {appointment.heureStart}</Text>
          {isMeetingTime(appointment.date, appointment.heureStart) ? (
            <Button title="Rejoindre la visioconférence" onPress={() => joinMeeting(appointment)} />
          ) : (
            <Text>Attente de l'heure de début</Text>
          )}
        </View>
      ))}
      {localStream && <RTCView streamURL={localStream.toURL()} style={{ width: 200, height: 200 }} />}
      {remoteStream && <RTCView streamURL={remoteStream.toURL()} style={{ width: 200, height: 200 }} />}
    </View>
  );
};

export default AppointmentsScreen;
