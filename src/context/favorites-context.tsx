"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type FavoriteType = "product" | "company";

export interface FavoriteItem {
  id: string;
  type: FavoriteType;
  title: string;
  image: string;
}

interface FavoritesContextValue {
  favorites: FavoriteItem[];

  isFavorite: (id: string, type: FavoriteType) => boolean;

  toggleFavorite: (item: FavoriteItem) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const STORAGE_KEY = "coolerguru-favorites";

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed = JSON.parse(saved) as FavoriteItem[];

        setFavorites(parsed);
      }
    } catch (error) {
      console.error("Unable to load favorites:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Unable to save favorites:", error);
    }
  }, [favorites, loaded]);

  function isFavorite(id: string, type: FavoriteType) {
    return favorites.some((item) => item.id === id && item.type === type);
  }

  function toggleFavorite(item: FavoriteItem) {
    setFavorites((current) => {
      const exists = current.some((favorite) => favorite.id === item.id && favorite.type === item.type);

      if (exists) {
        return current.filter((favorite) => !(favorite.id === item.id && favorite.type === item.type));
      }

      return [...current, item];
    });
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used inside FavoritesProvider");
  }

  return context;
}
