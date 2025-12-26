"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

interface LocationData {
  formatted_address: string;
  zipcode: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

interface GooglePlacesAutocompleteProps {
  onLocationSelect: (location: LocationData) => void;
  placeholder?: string;
  className?: string;
}

declare global {
  interface Window {
    google: any;
    googleMapsLoaded: boolean;
    googleMapsLoading: boolean;
  }
}

// Global script loading state
let scriptLoadingPromise: Promise<void> | null = null;

const loadGoogleMapsAPI = (): Promise<void> => {
  // If already loaded, return resolved promise
  if (window.google && window.google.maps) {
    return Promise.resolve();
  }

  // If already loading, return existing promise
  if (scriptLoadingPromise) {
    return scriptLoadingPromise;
  }

  // If script is already in the DOM, wait for it to load
  const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
  if (existingScript) {
    scriptLoadingPromise = new Promise((resolve) => {
      const checkLoaded = () => {
        if (window.google && window.google.maps) {
          resolve();
        } else {
          setTimeout(checkLoaded, 100);
        }
      };
      checkLoaded();
    });
    return scriptLoadingPromise;
  }

  // Load the script
  scriptLoadingPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('✅ Google Maps API script loaded');
      resolve();
    };
    script.onerror = () => {
      console.error('❌ Failed to load Google Maps API script');
      scriptLoadingPromise = null;
      reject(new Error('Failed to load Google Maps API'));
    };
    document.head.appendChild(script);
  });

  return scriptLoadingPromise;
};

export function GooglePlacesAutocomplete({ 
  onLocationSelect, 
  placeholder = "Enter city, state, or ZIP code",
  className = ""
}: GooglePlacesAutocompleteProps) {
  const [inputValue, setInputValue] = useState('');
  const [predictions, setPredictions] = useState<any[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiLoaded, setApiLoaded] = useState(false);
  const autocompleteService = useRef<any>(null);
  const placesService = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initializeAPI = async () => {
      try {
        await loadGoogleMapsAPI();
        
        if (window.google && window.google.maps) {
          console.log('✅ Google Maps API initialized');
          autocompleteService.current = new window.google.maps.places.AutocompleteService();
          placesService.current = new window.google.maps.places.PlacesService(
            document.createElement('div')
          );
          setApiLoaded(true);
        }
      } catch (error) {
        console.error('❌ Failed to initialize Google Maps API:', error);
      }
    };

    initializeAPI();
  }, []);

  const getPlacePredictions = (input: string) => {
    if (!apiLoaded || !autocompleteService.current || !input.trim()) {
      setPredictions([]);
      setShowPredictions(false);
      return;
    }

    setIsLoading(true);
    
    autocompleteService.current.getPlacePredictions(
      {
        input,
        componentRestrictions: { country: 'us' },
        types: ['(regions)']
      },
      (predictions: any[], status: string) => {
        setIsLoading(false);
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          // Limit to 4 suggestions
          setPredictions(predictions.slice(0, 4));
          setShowPredictions(true);
        } else {
          setPredictions([]);
          setShowPredictions(false);
        }
      }
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    getPlacePredictions(value);
  };

  const handlePredictionSelect = (prediction: any) => {
    if (!apiLoaded || !placesService.current) return;

    placesService.current.getDetails(
      {
        placeId: prediction.place_id,
        fields: ['address_components', 'formatted_address', 'geometry']
      },
      (place: any, status: string) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          const locationData = extractLocationData(place);
          setInputValue(locationData.formatted_address);
          setShowPredictions(false);
          setPredictions([]);
          onLocationSelect(locationData);
        }
      }
    );
  };

  const extractLocationData = (place: any): LocationData => {
    let zipcode = '';
    let city = '';
    let state = '';

    // Extract address components
    place.address_components.forEach((component: any) => {
      const types = component.types;
      
      if (types.includes('postal_code')) {
        zipcode = component.long_name;
      } else if (types.includes('locality')) {
        city = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        state = component.short_name;
      }
    });

    return {
      formatted_address: place.formatted_address,
      zipcode,
      city,
      state,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
  };

  const handleUseCurrentLocation = () => {
    if (!apiLoaded || !navigator.geolocation) return;
    
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocode to get address
        if (placesService.current) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode(
            { location: { lat: latitude, lng: longitude } },
            (results: any[], status: string) => {
              setIsLoading(false);
              if (status === 'OK' && results[0]) {
                const locationData = extractLocationData(results[0]);
                setInputValue(locationData.formatted_address);
                onLocationSelect(locationData);
              }
            }
          );
        }
      },
      (error) => {
        setIsLoading(false);
        console.error('Error getting location:', error);
      }
    );
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="h-14 px-4 pr-12 border-2 border-gray-300 rounded-full text-base bg-white focus:border-[#275F48] focus:ring-0 shadow-sm"
          style={{ fontSize: '16px' }}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {isLoading && (
            <div className="w-4 h-4 border-2 border-[#275F48] border-t-transparent rounded-full animate-spin"></div>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleUseCurrentLocation}
            className="p-1 h-8 w-8 text-[#275F48] hover:text-[#1f4a37]"
          >
            <MapPin className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Predictions Dropdown */}
      {showPredictions && predictions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto overflow-x-hidden">
          {predictions.map((prediction) => (
            <button
              key={prediction.place_id}
              onClick={() => handlePredictionSelect(prediction)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm">{prediction.description}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
