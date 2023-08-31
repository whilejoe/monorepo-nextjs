import { useEffect, useRef, useState } from "react";
import { useDebounce } from "./useDebounce";

export type Suggestion = google.maps.places.AutocompletePrediction;
type AutocompleteService = google.maps.places.AutocompleteService;

export const usePlacesSuggestions = (inputValue: string) => {
  const [suggestions, setSuggestions] = useState<Suggestion[] | null>();
  const autocompleteService = useRef<AutocompleteService>();
  const debouncedValue = useDebounce(inputValue, 400);

  useEffect(() => {
    if (!autocompleteService.current) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, [autocompleteService]);

  useEffect(() => {
    let isFresh = true;

    if (autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        {
          input: debouncedValue,
          componentRestrictions: { country: "us" },
        },
        (results) => {
          if (isFresh) {
            setSuggestions(results);
          }
        }
      );
    }

    return () => {
      isFresh = false;
    };
  }, [autocompleteService, debouncedValue]);

  return { suggestions, setSuggestions };
};
