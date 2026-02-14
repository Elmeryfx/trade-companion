import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserProfile } from "@/types/profile";

interface ProfileContextType {
  profiles: UserProfile[];
  activeProfile: UserProfile | null;
  setActiveProfileId: (id: string) => void;
  addProfile: (profile: Omit<UserProfile, "id">) => UserProfile;
  updateProfile: (profile: UserProfile) => void;
  deleteProfile: (id: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem("profiles");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeId, setActiveId] = useState<string | null>(() => {
    return localStorage.getItem("activeProfileId");
  });

  useEffect(() => {
    localStorage.setItem("profiles", JSON.stringify(profiles));
  }, [profiles]);

  useEffect(() => {
    if (activeId) localStorage.setItem("activeProfileId", activeId);
    else localStorage.removeItem("activeProfileId");
  }, [activeId]);

  const activeProfile = profiles.find((p) => p.id === activeId) || null;

  const addProfile = (profile: Omit<UserProfile, "id">) => {
    const newProfile: UserProfile = { ...profile, id: crypto.randomUUID() };
    setProfiles((prev) => [...prev, newProfile]);
    setActiveId(newProfile.id);
    return newProfile;
  };

  const updateProfile = (profile: UserProfile) => {
    setProfiles((prev) => prev.map((p) => (p.id === profile.id ? profile : p)));
  };

  const deleteProfile = (id: string) => {
    setProfiles((prev) => prev.filter((p) => p.id !== id));
    if (activeId === id) {
      const remaining = profiles.filter((p) => p.id !== id);
      setActiveId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const setActiveProfileId = (id: string) => setActiveId(id);

  return (
    <ProfileContext.Provider value={{ profiles, activeProfile, setActiveProfileId, addProfile, updateProfile, deleteProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
};
