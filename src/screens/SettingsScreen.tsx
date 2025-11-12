import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useSettings } from '../context/SettingsContext';

export default function SettingsScreen() {
  const { settings, update } = useSettings();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Show Location</Text>
      <Switch
        value={settings.showLocation}
        onValueChange={val => update({ showLocation: val })}
      />
      <Text style={styles.label}>Resolution: {settings.resolution}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 18, marginVertical: 12 }
});
