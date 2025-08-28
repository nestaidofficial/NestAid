"use client"

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface LocationData {
  formatted_address: string;
  zipcode: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

interface SimpleLocationInputProps {
  onLocationSelect: (location: LocationData) => void;
  placeholder?: string;
  className?: string;
}

export function SimpleLocationInput({ 
  onLocationSelect, 
  placeholder = "Enter city, state, or ZIP code",
  className = ""
}: SimpleLocationInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    // Simple parsing for common formats
    const value = inputValue.trim();
    
    // Try to extract ZIP code if present
    const zipMatch = value.match(/\b\d{5}\b/);
    const zipcode = zipMatch ? zipMatch[0] : '';
    
    // Extract city and state
    let city = '';
    let state = '';
    
    if (zipcode) {
      // Remove ZIP from the input for city/state parsing
      const withoutZip = value.replace(/\b\d{5}\b/, '').trim();
      const parts = withoutZip.split(',').map(part => part.trim());
      
      if (parts.length >= 2) {
        city = parts[0];
        state = parts[1];
      } else {
        city = withoutZip;
        state = 'MA'; // Default to Massachusetts
      }
    } else {
      const parts = value.split(',').map(part => part.trim());
      if (parts.length >= 2) {
        city = parts[0];
        state = parts[1];
      } else {
        city = value;
        state = 'MA'; // Default to Massachusetts
      }
    }

    // Create a mock location data object
    const locationData: LocationData = {
      formatted_address: value,
      zipcode: zipcode || '02144', // Default ZIP if not found
      city: city || 'Somerville',
      state: state || 'MA',
      lat: 42.3995, // Default coordinates for Somerville
      lng: -71.1225
    };

    onLocationSelect(locationData);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Create location data with coordinates
          const locationData: LocationData = {
            formatted_address: 'Current Location',
            zipcode: '02144', // Default
            city: 'Somerville',
            state: 'MA',
            lat: latitude,
            lng: longitude
          };
          
          setInputValue('Current Location');
          onLocationSelect(locationData);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to default location
          const locationData: LocationData = {
            formatted_address: 'Somerville, MA',
            zipcode: '02144',
            city: 'Somerville',
            state: 'MA',
            lat: 42.3995,
            lng: -71.1225
          };
          setInputValue('Somerville, MA');
          onLocationSelect(locationData);
        }
      );
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="h-14 px-4 pr-12 border-2 border-gray-300 rounded-full text-base bg-white focus:border-[#275F48] focus:ring-0 shadow-sm"
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
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
      
      <div className="mt-2 text-xs text-gray-500">
        Examples: "Somerville, MA", "02144", "Boston, Massachusetts"
      </div>
    </div>
  );
}
