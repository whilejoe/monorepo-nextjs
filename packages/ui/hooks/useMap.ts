import { useCallback, useState } from "react";

// Heavily borrowed from https://usehooks-ts.com/react-hook/use-map

export type MapOrEntries<K, V> = Map<K, V> | [K, V][];

export interface Actions<K, V> {
  add: (key: K, value: V) => void;
  addAll: (entries: MapOrEntries<K, V>) => void;
  delete: (key: K) => void;
  deleteAll: Map<K, V>["clear"];
}

// Hide setters from the returned map to prevent mutations that won't trigger a state update
type Return<K, V> = [
  Omit<Map<K, V>, "set" | "clear" | "delete">,
  Actions<K, V>
];

export const useMap = <K, V>(
  initialState: MapOrEntries<K, V> | (() => MapOrEntries<K, V>)
): Return<K, V> => {
  const [map, setMap] = useState(() => {
    return new Map(
      typeof initialState === "function" ? initialState() : initialState
    );
  });

  const actions: Actions<K, V> = {
    add: useCallback((key, value) => {
      setMap((prev) => {
        const copy = new Map(prev);
        copy.set(key, value);
        return copy;
      });
    }, []),

    addAll: useCallback((entries) => {
      setMap(() => new Map(entries));
    }, []),

    delete: useCallback((key) => {
      setMap((prev) => {
        const copy = new Map(prev);
        copy.delete(key);
        return copy;
      });
    }, []),

    deleteAll: useCallback(() => {
      setMap(() => new Map());
    }, []),
  };

  return [map, actions];
};
