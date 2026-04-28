import React, { useState, createContext, useContext, useEffect } from 'react';
import { ZeroData, Initial2024, Initial2025 } from './constants';

type AppContextType = {
  user: any | null;
  setUser: (user: any | null) => void;
  data: {
    [year: string]: any;
  };
  setData: (year: string, data: any) => void;
  currentLevel: 'PAUD' | 'SD' | 'SMP';
  setCurrentLevel: (level: 'PAUD' | 'SD' | 'SMP') => void;
  currentYear: string;
  setCurrentYear: (year: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  customApiKey: string;
  setCustomApiKey: (key: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'mutuponti_analysis_data_v3';
const LEVEL_KEY = 'mutuponti_current_level';
const YEAR_KEY = 'mutuponti_current_year';
const TAB_KEY = 'mutuponti_active_tab';
const USER_KEY = 'mutuponti_user';
const API_KEY_STORE = 'mutuponti_api_key';

const InitialMultiYearData = {
  "2024": JSON.parse(JSON.stringify(Initial2024)),
  "2025": JSON.parse(JSON.stringify(Initial2025))
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any | null>(() => {
    const saved = localStorage.getItem(USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [data, setAllData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : InitialMultiYearData;
    } catch (e) {
      console.error("Failed to load saved data", e);
      return InitialMultiYearData;
    }
  });
  const [currentLevel, setCurrentLevel] = useState<'PAUD' | 'SD' | 'SMP'>(() => {
    const saved = localStorage.getItem(LEVEL_KEY);
    return (saved as any) || 'SD';
  });
  const [currentYear, setCurrentYear] = useState<string>(() => {
    return localStorage.getItem(YEAR_KEY) || '2025';
  });
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem(TAB_KEY) || 'dashboard';
  });
  const [customApiKey, setCustomApiKey] = useState(() => {
    return localStorage.getItem(API_KEY_STORE) || '';
  });

  const setData = (year: string, newData: any) => {
    setAllData(prev => ({
      ...prev,
      [year]: newData
    }));
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save data", e);
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem(LEVEL_KEY, currentLevel);
  }, [currentLevel]);

  useEffect(() => {
    localStorage.setItem(YEAR_KEY, currentYear);
  }, [currentYear]);

  useEffect(() => {
    localStorage.setItem(TAB_KEY, activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem(API_KEY_STORE, customApiKey);
  }, [customApiKey]);

  return (
    <AppContext.Provider value={{ 
      user, setUser, 
      data, setData, 
      currentLevel, setCurrentLevel,
      currentYear, setCurrentYear,
      activeTab, setActiveTab,
      customApiKey, setCustomApiKey
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
