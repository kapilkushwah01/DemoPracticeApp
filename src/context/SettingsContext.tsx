import React, { createContext, useContext, useState } from 'react';

type Settings = {
  resolution: '720p' | '1080p' | '4K' | 'Auto';
  showLocation: boolean;
};

const SettingsContext = createContext<{
  settings: Settings;
  update: (s: Partial<Settings>) => void;
}>({
  settings: { resolution: '1080p', showLocation: true },
  update: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>({
    resolution: '1080p',
    showLocation: true,
  });

  const update = (s: Partial<Settings>) => setSettings(prev => ({ ...prev, ...s }));

  return (
    <SettingsContext.Provider value={{ settings, update }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
