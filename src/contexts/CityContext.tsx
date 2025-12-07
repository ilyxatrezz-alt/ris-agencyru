import { createContext, useContext, ReactNode } from "react";
import { CityConfig } from "@/config/cities";

interface CityContextType {
  city: CityConfig | null;
  isLocalPage: boolean;
}

const CityContext = createContext<CityContextType>({
  city: null,
  isLocalPage: false,
});

export const useCityContext = () => useContext(CityContext);

interface CityProviderProps {
  city: CityConfig | null;
  children: ReactNode;
}

export const CityProvider = ({ city, children }: CityProviderProps) => {
  return (
    <CityContext.Provider value={{ city, isLocalPage: !!city }}>
      {children}
    </CityContext.Provider>
  );
};
