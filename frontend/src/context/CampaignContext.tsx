interface Campaign {
    tokenName: string;
    tokenTicker: string;
    description: string;
    image: string;
    posterUrl: string;
    tokenAddress: string;
    blockNumber: number;
  }  

import { createContext, useContext, useState, useEffect, SetStateAction, Dispatch } from "react";
import { getCampaignCreatedEvents } from "../utils/getEvents";

interface CampaignContextType {
    campaigns: Campaign[];
    setCampaigns: Dispatch<SetStateAction<Campaign[]>>;
  }

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider = ({ children }: any) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    async function fetchCampaigns() {
      const events = await getCampaignCreatedEvents();
      setCampaigns(events);
    }
    fetchCampaigns();
  }, []);

  return (
    <CampaignContext.Provider value={{ campaigns, setCampaigns }}>
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaigns = () => {
    const context = useContext(CampaignContext);
    if (!context) {
      throw new Error("useCampaigns must be used within a CampaignProvider");
    }
    return context;
  };
  
