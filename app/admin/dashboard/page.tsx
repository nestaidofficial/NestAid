"use client"

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GooglePlacesAutocomplete } from '@/components/google-places-autocomplete';
import { AlertCircle, CheckCircle, LogOut, Plus, Briefcase, MapPin, Calendar, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LocationData {
  formatted_address: string;
  zipcode: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const cookies = document.cookie.split(';');
    const adminCookie = cookies.find(cookie => cookie.trim().startsWith('adminAuthenticated='));
    const authStatus = adminCookie?.split('=')[1];
    
    if (authStatus !== 'true') {
      router.push('/admin/login');
      return;
    }
    setIsAuthenticated(true);
    
    // Fetch recent jobs
    fetchRecentJobs();
  }, [router]);

  const fetchRecentJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      if (data.success) {
        setRecentJobs(data.jobs.slice(0, 5)); // Get latest 5 jobs
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

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
        // Refresh recent jobs
        fetchRecentJobs();
      } else {
        setSubmitResult({ success: false, message: data.error || 'Failed to post job' });
      }
    } catch (error) {
      setSubmitResult({ success: false, message: 'An error occurred while posting the job' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    document.cookie = 'adminAuthenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/admin/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FBF8] to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#275F48] rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#1A5463]">NestAid Admin</h1>
                <p className="text-sm text-[#1A5463]/70">Job Management Dashboard</p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-[#275F48] text-[#275F48] hover:bg-[#275F48] hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Job Posting Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-[#275F48] to-[#4A6741] text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Post New Job</CardTitle>
                    <p className="text-white/80 text-sm">Create a new caregiver position</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
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

          {/* Sidebar - Recent Jobs */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-[#4A6741] to-[#8B5A3C] text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Recent Jobs</CardTitle>
                    <p className="text-white/80 text-sm">Latest postings</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {recentJobs.length > 0 ? (
                    recentJobs.map((job) => (
                      <div key={job.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                        <h4 className="font-semibold text-[#1A5463] text-sm mb-1 line-clamp-1">
                          {job.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#1A5463]/70">
                          <MapPin className="w-3 h-3" />
                          <span>{job.city}, {job.state}</span>
                        </div>
                        <p className="text-xs text-[#1A5463]/60 mt-1 line-clamp-2">
                          {job.description}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-[#1A5463]/60">
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No jobs posted yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
