import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCameraDevice, Camera } from 'react-native-vision-camera';
import Geolocation from '@react-native-community/geolocation';
import RNFS from 'react-native-fs';
import { useSettings } from '../context/SettingsContext';

export default function CameraScreen({ navigation }: any) {
  const device = useCameraDevice('front');
  const camera = useRef<Camera>(null);
  const { settings } = useSettings();

  const [recording, setRecording] = useState(false);
  const [location, setLocation] = useState<{lat:number, lon:number}|null>(null);

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermission();
      await Camera.requestMicrophonePermission();
    })();

    if (settings.showLocation) {
      Geolocation.requestAuthorization();
      Geolocation.getCurrentPosition(
        pos => setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
        e => console.warn(e),
        { enableHighAccuracy: true }
      );
    }
  }, [settings.showLocation]);

  if (!device) return <Text>Loading camera…</Text>;

  const handleRecord = async () => {
    if (recording) {
      camera.current?.stopRecording();
      setRecording(false);
    } else {
      const folder = `${RNFS.ExternalStorageDirectoryPath}/CameraApp`;
      if (!(await RNFS.exists(folder))) await RNFS.mkdir(folder);
      const filePath = `${folder}/video_${Date.now()}.mp4`;

      setRecording(true);
      await camera.current?.startRecording({
        fileType: 'mp4',
        flash: 'off',
        onRecordingFinished: (video) => {
          console.log('Video saved:', video.path);
        },
        onRecordingError: (err) => console.error(err),
      });
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive
        video
      />
      <View style={styles.overlay}>
        <Text style={styles.stamp}>{new Date().toLocaleString()}</Text>
        {settings.showLocation && location && (
          <Text style={styles.stamp}>
            Lat: {location.lat.toFixed(4)} | Lon: {location.lon.toFixed(4)}
          </Text>
        )}
      </View>

      <TouchableOpacity style={[styles.shutter, recording && { backgroundColor: 'gray' }]} onPress={handleRecord}>
        <Text style={{ color: '#fff', fontSize: 20 }}>{recording ? '■' : '●'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingsBtn} onPress={() => navigation.navigate('Settings')}>
        <Text style={{ color: '#fff' }}>⚙</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  overlay: { position: 'absolute', top: 40, left: 20 },
  stamp: { color: '#fff', fontSize: 16 },
  shutter: {
    position: 'absolute', bottom: 40, alignSelf: 'center',
    width: 70, height: 70, borderRadius: 35, backgroundColor: 'red',
    alignItems: 'center', justifyContent: 'center'
  },
  settingsBtn: { position: 'absolute', top: 40, right: 20 }
});
