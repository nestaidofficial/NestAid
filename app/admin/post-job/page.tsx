"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GooglePlacesAutocomplete } from '@/components/google-places-autocomplete';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface LocationData {
  formatted_address: string;
  zipcode: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

export default function PostJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLocation) {
      setSubmitResult({ success: false, message: 'Please select a location' });
      return;
    }

    if (!formData.title.trim() || !formData.description.trim()) {
      setSubmitResult({ success: false, message: 'Please fill in all required fields' });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          zipcode: selectedLocation.zipcode,
          city: selectedLocation.city,
          state: selectedLocation.state,
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult({ success: true, message: 'Job posted successfully!' });
        // Reset form
        setFormData({ title: '', description: '' });
        setSelectedLocation(null);
      } else {
        setSubmitResult({ success: false, message: data.error || 'Failed to post job' });
      }
    } catch (error) {
      setSubmitResult({ success: false, message: 'An error occurred while posting the job' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFDFB] py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-[#1A5463] text-center">
                Post a New Job
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-[#1A5463] mb-2">
                    Job Title *
                  </label>
                  <Input
                    id="title"
                    type="text"
                    value={formData.title}
                    onChange={handleInputChange('title')}
                    placeholder="e.g., Senior Caregiver, Companion Care Specialist"
                    className="border-2 border-gray-200 focus:border-[#275F48] focus:ring-0"
                    required
                  />
                </div>

                {/* Job Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-[#1A5463] mb-2">
                    Job Description *
                  </label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={handleInputChange('description')}
                    placeholder="Describe the job responsibilities, requirements, and benefits..."
                    className="border-2 border-gray-200 focus:border-[#275F48] focus:ring-0 min-h-[120px]"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-[#1A5463] mb-2">
                    Job Location *
                  </label>
                  <GooglePlacesAutocomplete
                    onLocationSelect={handleLocationSelect}
                    placeholder="Enter city, state, or ZIP code"
                  />
                  {selectedLocation && (
                    <div className="mt-2 p-3 bg-[#E4F2D4] rounded-lg">
                      <p className="text-sm text-[#275F48]">
                        <strong>Selected:</strong> {selectedLocation.formatted_address}
                      </p>
                      <p className="text-xs text-[#275F48] mt-1">
                        {selectedLocation.city}, {selectedLocation.state} {selectedLocation.zipcode}
                      </p>
                    </div>
                  )}
                </div>

                {/* Submit Result */}
                {submitResult && (
                  <div className={`flex items-center gap-2 p-3 rounded-lg ${
                    submitResult.success 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {submitResult.success ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span className="text-sm">{submitResult.message}</span>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#275F48] hover:bg-[#1f4a37] text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Posting Job...' : 'Post Job'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
