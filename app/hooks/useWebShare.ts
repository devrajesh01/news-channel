"use client";
import { useState, useEffect } from "react";
import { ShareData } from "../components/services/share/types";
export const useWebShare = () => {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const share = async (data: ShareData) => {
    if (!navigator.share) return false;
    try {
      await navigator.share(data);
      return true;
    } catch {
      // User cancelled the share sheet — not an error worth surfacing
      return false;
    }
  };

  return { isSupported, share };
};