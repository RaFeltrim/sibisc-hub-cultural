import { createContext, useContext, useState } from 'react';

const ActiveFABContext = createContext(null);

export function ActiveFABProvider({ children }) {
  const [activeFAB, setActiveFAB] = useState(null); // null | 'feedback' | 'agents'
  return (
    <ActiveFABContext.Provider value={{ activeFAB, setActiveFAB }}>
      {children}
    </ActiveFABContext.Provider>
  );
}

export function useActiveFAB() {
  return useContext(ActiveFABContext);
}
