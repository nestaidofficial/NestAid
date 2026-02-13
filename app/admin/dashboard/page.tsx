"use client"

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GooglePlacesAutocomplete } from '@/components/google-places-autocomplete';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  AlertCircle, CheckCircle, LogOut, Plus, Briefcase, MapPin, Calendar, 
  Users, FileText, Heart, Mail, Phone, Clock, Search, Filter, 
  Download, ArrowUpDown, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, Settings
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Playfair_Display, Inter } from "next/font/google";
import { signOutAdmin, getAdminSession } from '@/app/actions/admin-auth';

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
});

interface LocationData {
  formatted_address: string;
  zipcode: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

interface JobApplication {
  id: string;
  job_posting_id: string | null;
  looking_for: string;
  job_category: string | null;
  service_type: string | null;
  gender: string | null;
  has_experience: boolean | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  postal_code: string | null;
  job_title: string | null;
  search_location: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

interface CareApplication {
  id: string;
  looking_for: string;
  care_category: string | null;
  service_type: string | null;
  who_needs_care: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  postal_code: string;
  sms_consent: boolean;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

type TabType = 'post-job' | 'job-applications' | 'care-applications';

type SortField = 'date' | 'name' | 'status';
type SortDirection = 'asc' | 'desc';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('post-job');
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [radius, setRadius] = useState<number>(25);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [careApplications, setCareApplications] = useState<CareApplication[]>([]);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  
  // Filter and search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { isAdmin } = await getAdminSession();
      
      if (!isAdmin) {
        router.push('/admin/login');
        return;
      }
      setIsAuthenticated(true);
      fetchRecentJobs();
    };
    
    checkAuth();
  }, [router]);

  useEffect(() => {
    if (activeTab === 'job-applications') {
      fetchJobApplications();
    } else if (activeTab === 'care-applications') {
      fetchCareApplications();
    }
  }, [activeTab]);

  const fetchRecentJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      if (data.success) {
        setRecentJobs(data.jobs.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchJobApplications = async () => {
    setIsLoadingApplications(true);
    try {
      const response = await fetch('/api/applications/jobs');
      const data = await response.json();
      if (data.success) {
        setJobApplications(data.applications);
      }
    } catch (error) {
      console.error('Error fetching job applications:', error);
    } finally {
      setIsLoadingApplications(false);
    }
  };

  const fetchCareApplications = async () => {
    setIsLoadingApplications(true);
    try {
      const response = await fetch('/api/applications/care');
      const data = await response.json();
      if (data.success) {
        setCareApplications(data.applications);
      }
    } catch (error) {
      console.error('Error fetching care applications:', error);
    } finally {
      setIsLoadingApplications(false);
    }
  };

  // Filter and sort job applications
  const filteredAndSortedJobApps = useMemo(() => {
    let filtered = [...jobApplications];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        `${app.first_name} ${app.last_name}`.toLowerCase().includes(query) ||
        app.email.toLowerCase().includes(query) ||
        app.phone.includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(app => {
        const appDate = new Date(app.created_at);
        const daysDiff = Math.floor((now.getTime() - appDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (dateFilter) {
          case 'today':
            return daysDiff === 0;
          case 'week':
            return daysDiff <= 7;
          case 'month':
            return daysDiff <= 30;
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'date':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'name':
          comparison = `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [jobApplications, searchQuery, statusFilter, dateFilter, sortField, sortDirection]);

  // Filter and sort care applications
  const filteredAndSortedCareApps = useMemo(() => {
    let filtered = [...careApplications];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(app => 
        `${app.first_name} ${app.last_name}`.toLowerCase().includes(query) ||
        app.email.toLowerCase().includes(query) ||
        app.phone.includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === statusFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter(app => {
        const appDate = new Date(app.created_at);
        const daysDiff = Math.floor((now.getTime() - appDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (dateFilter) {
          case 'today':
            return daysDiff === 0;
          case 'week':
            return daysDiff <= 7;
          case 'month':
            return daysDiff <= 30;
          default:
            return true;
        }
      });
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'date':
          comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          break;
        case 'name':
          comparison = `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`);
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [careApplications, searchQuery, statusFilter, dateFilter, sortField, sortDirection]);

  // Pagination
  const paginatedJobApps = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedJobApps.slice(start, start + itemsPerPage);
  }, [filteredAndSortedJobApps, currentPage]);

  const paginatedCareApps = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedCareApps.slice(start, start + itemsPerPage);
  }, [filteredAndSortedCareApps, currentPage]);

  const totalPages = Math.ceil(
    (activeTab === 'job-applications' ? filteredAndSortedJobApps.length : filteredAndSortedCareApps.length) / itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const exportToCSV = (type: 'job' | 'care') => {
    const data = type === 'job' ? filteredAndSortedJobApps : filteredAndSortedCareApps;
    
    if (data.length === 0) return;

    let csv = '';
    
    if (type === 'job') {
      csv = 'Applicant Name,Email,Phone,Postal Code,Job Category,Service Type,Gender,Experience,Status,Date\n';
      data.forEach(app => {
        csv += `"${app.first_name} ${app.last_name}","${app.email}","${app.phone}","${app.postal_code || ''}","${app.job_category || ''}","${app.service_type || ''}","${app.gender || ''}","${app.has_experience ? 'Yes' : 'No'}","${app.status}","${new Date(app.created_at).toLocaleDateString()}"\n`;
      });
    } else {
      csv = 'Applicant Name,Email,Phone,Postal Code,Care Category,Service Type,Who Needs Care,SMS Consent,Status,Date\n';
      data.forEach(app => {
        csv += `"${app.first_name} ${app.last_name}","${app.email}","${app.phone}","${app.postal_code}","${app.care_category || ''}","${app.service_type || ''}","${app.who_needs_care || ''}","${app.sms_consent ? 'Yes' : 'No'}","${app.status}","${new Date(app.created_at).toLocaleDateString()}"\n`;
      });
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-applications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
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

    if (!formData.title.trim()) {
      setSubmitResult({ success: false, message: 'Please enter a job title' });
      return;
    }

    if (!formData.description.trim()) {
      setSubmitResult({ success: false, message: 'Please enter a job description' });
      return;
    }

    if (!selectedLocation.city || !selectedLocation.state) {
      setSubmitResult({ success: false, message: 'Please select a valid location with city and state' });
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
          title: formData.title.trim(),
          description: formData.description.trim(),
          zipcode: selectedLocation.zipcode || undefined,
          city: selectedLocation.city,
          state: selectedLocation.state,
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
          radius_miles: radius
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitResult({ success: true, message: `Job posted successfully! Visible within ${radius} miles of ${selectedLocation.city}.` });
        setFormData({ title: '', description: '' });
        setSelectedLocation(null);
        setRadius(25);
        fetchRecentJobs();
      } else {
        const errorMessage = data.error || 'Failed to post job';
        console.error('Job posting error:', errorMessage);
        setSubmitResult({ success: false, message: errorMessage });
      }
    } catch (error) {
      setSubmitResult({ success: false, message: 'An error occurred while posting the job' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await signOutAdmin();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusDot = (status: string) => {
    const colors: Record<string, string> = {
      'pending': '#F59E0B',
      'reviewed': '#3B82F6',
      'contacted': '#8B5CF6',
      'scheduled': '#6366F1',
      'hired': '#10B981',
      'completed': '#10B981',
      'rejected': '#EF4444',
      'cancelled': '#EF4444'
    };
    return colors[status] || '#6B7280';
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, dateFilter, sortField, sortDirection, activeTab]);

  if (!isAuthenticated) {
    return null;
  }

  const currentApps = activeTab === 'job-applications' ? paginatedJobApps : paginatedCareApps;
  const totalApps = activeTab === 'job-applications' ? filteredAndSortedJobApps.length : filteredAndSortedCareApps.length;
  const newRequests = (activeTab === 'job-applications' ? jobApplications : careApplications)
    .filter(app => app.status === 'pending').length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-[#E8E3D3]">
        <div className="container mx-auto px-4 md:px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="NestAid Logo"
                width={180}
                height={60}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className={`${inter.className} border-2 rounded-full px-6 py-2 transition-all duration-200`}
              style={{ 
                borderColor: '#275F48', 
                color: '#275F48',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#275F48';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#275F48';
              }}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-[#E8E3D3]">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('post-job')}
              className={`${inter.className} px-6 py-4 font-medium text-sm border-b-3 transition-all duration-200 ${
                activeTab === 'post-job' 
                  ? 'border-[#275F48] text-[#275F48]' 
                  : 'border-transparent text-[#6B6B6B] hover:text-[#1A5463]'
              }`}
              style={{ borderBottomWidth: activeTab === 'post-job' ? '3px' : '0px' }}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Post Job
            </button>
            <button
              onClick={() => setActiveTab('job-applications')}
              className={`${inter.className} px-6 py-4 font-medium text-sm border-b-3 transition-all duration-200 relative ${
                activeTab === 'job-applications' 
                  ? 'border-[#275F48] text-[#275F48]' 
                  : 'border-transparent text-[#6B6B6B] hover:text-[#1A5463]'
              }`}
              style={{ borderBottomWidth: activeTab === 'job-applications' ? '3px' : '0px' }}
            >
              <FileText className="w-4 h-4 inline mr-2" />
              Job Applications
              {newRequests > 0 && activeTab !== 'job-applications' && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#EF4444' }}>
                  {newRequests}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('care-applications')}
              className={`${inter.className} px-6 py-4 font-medium text-sm border-b-3 transition-all duration-200 relative ${
                activeTab === 'care-applications' 
                  ? 'border-[#275F48] text-[#275F48]' 
                  : 'border-transparent text-[#6B6B6B] hover:text-[#1A5463]'
              }`}
              style={{ borderBottomWidth: activeTab === 'care-applications' ? '3px' : '0px' }}
            >
              <Heart className="w-4 h-4 inline mr-2" />
              Care Applications
              {newRequests > 0 && activeTab !== 'care-applications' && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#EF4444' }}>
                  {newRequests}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-12 py-10">
        {/* Post Job Tab */}
        {activeTab === 'post-job' && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
              <Card className="shadow-xl border-0 rounded-3xl overflow-hidden" style={{ backgroundColor: 'white' }}>
                <CardHeader className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #275F48 0%, #1A5463 100%)' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                      <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                      <CardTitle className={`${playfair.className} text-2xl font-semibold text-white`}>
                        Post New Job
                      </CardTitle>
                      <p className={`${inter.className} text-white text-sm mt-1`} style={{ opacity: 0.9 }}>
                        Create a new caregiver position
                      </p>
                  </div>
                </div>
              </CardHeader>
                <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                      <label htmlFor="title" className={`${playfair.className} block text-base font-medium mb-3`} style={{ color: '#1A5463' }}>
                      Job Title *
                    </label>
                    <Input
                      id="title"
                      type="text"
                      value={formData.title}
                      onChange={handleInputChange('title')}
                      placeholder="e.g., Senior Caregiver, Companion Care Specialist"
                        className={`${inter.className} h-14 px-5 rounded-2xl border-2 text-base`}
                        style={{ 
                          borderColor: '#E8E3D3',
                          backgroundColor: 'hsl(var(--background))'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#275F48';
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#E8E3D3';
                          e.currentTarget.style.backgroundColor = 'hsl(var(--background))';
                        }}
                      required
                    />
                  </div>

                  <div>
                      <label htmlFor="description" className={`${playfair.className} block text-base font-medium mb-3`} style={{ color: '#1A5463' }}>
                      Job Description *
                    </label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange('description')}
                      placeholder="Describe the job responsibilities, requirements, and benefits..."
                        className={`${inter.className} px-5 py-4 rounded-2xl border-2 text-base min-h-[140px] resize-none`}
                        style={{ 
                          borderColor: '#E8E3D3',
                          backgroundColor: 'hsl(var(--background))'
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.borderColor = '#275F48';
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.borderColor = '#E8E3D3';
                          e.currentTarget.style.backgroundColor = 'hsl(var(--background))';
                        }}
                      required
                    />
                  </div>

                  <div>
                      <label className={`${playfair.className} block text-base font-medium mb-3`} style={{ color: '#1A5463' }}>
                      Job Location *
                    </label>
                    <GooglePlacesAutocomplete
                      onLocationSelect={handleLocationSelect}
                      placeholder="Enter city, state, or ZIP code"
                    />
                    {selectedLocation && (
                        <div className="mt-3 p-4 rounded-2xl" style={{ backgroundColor: '#E8F5F1', border: '1px solid #B8D4CB' }}>
                          <p className={`${inter.className} text-sm font-medium`} style={{ color: '#275F48' }}>
                          <strong>Selected:</strong> {selectedLocation.formatted_address}
                        </p>
                          <p className={`${inter.className} text-xs mt-1`} style={{ color: '#275F48', opacity: 0.8 }}>
                          {selectedLocation.city}, {selectedLocation.state} {selectedLocation.zipcode}
                        </p>
                      </div>
                    )}
                  </div>

                    <div>
                      <label className={`${playfair.className} block text-base font-medium mb-3`} style={{ color: '#1A5463' }}>
                        Job Visibility Radius (miles)
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="5"
                          max="100"
                          step="5"
                          value={radius}
                          onChange={(e) => setRadius(parseInt(e.target.value))}
                          className="flex-1 h-3 rounded-lg appearance-none cursor-pointer"
                          style={{ 
                            background: `linear-gradient(to right, #275F48 0%, #275F48 ${(radius - 5) / 95 * 100}%, #E8E3D3 ${(radius - 5) / 95 * 100}%, #E8E3D3 100%)`
                          }}
                        />
                        <div className="w-28 px-4 py-3 rounded-2xl text-center font-semibold text-white" style={{ backgroundColor: '#275F48' }}>
                          <span className={inter.className}>{radius} mi</span>
                        </div>
                      </div>
                      <p className={`${inter.className} text-xs mt-2`} style={{ color: '#6B6B6B' }}>
                        Job will be visible to applicants searching within {radius} miles of the location
                      </p>
                    </div>

                  {submitResult && (
                      <div className={`${inter.className} flex items-center gap-3 p-4 rounded-2xl border-2 ${
                      submitResult.success 
                          ? 'bg-[#E8F5F1] text-[#275F48] border-[#B8D4CB]' 
                          : 'bg-[#FEE2E2] text-[#B91C1C] border-[#FECACA]'
                    }`}>
                      {submitResult.success ? (
                          <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      ) : (
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      )}
                        <span className="text-sm font-medium">{submitResult.message}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                      className={`${playfair.className} w-full h-14 text-base font-semibold rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl`}
                      style={{ 
                        backgroundColor: '#275F48',
                        color: 'white'
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting) {
                          e.currentTarget.style.backgroundColor = '#1f4a37';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#275F48';
                      }}
                  >
                    {isSubmitting ? 'Posting Job...' : 'Post Job'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
              <Card className="shadow-xl border-0 rounded-3xl overflow-hidden" style={{ backgroundColor: 'white' }}>
                <CardHeader className="px-6 py-5" style={{ background: 'linear-gradient(135deg, #1A5463 0%, #275F48 100%)' }}>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                      <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                      <CardTitle className={`${playfair.className} text-xl font-semibold text-white`}>
                        Recent Jobs
                      </CardTitle>
                      <p className={`${inter.className} text-white text-xs mt-1`} style={{ opacity: 0.9 }}>
                        Latest postings
                      </p>
                  </div>
                </div>
              </CardHeader>
                <CardContent className="p-5">
                  <div className="space-y-3">
                  {recentJobs.length > 0 ? (
                    recentJobs.map((job) => (
                        <div 
                          key={job.id} 
                          className="p-4 rounded-2xl border-2 transition-all duration-200 hover:shadow-md"
                          style={{ 
                            backgroundColor: 'hsl(var(--background))',
                            borderColor: '#E8E3D3'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.borderColor = '#275F48';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'hsl(var(--background))';
                            e.currentTarget.style.borderColor = '#E8E3D3';
                          }}
                        >
                          <h4 className={`${playfair.className} font-semibold text-sm mb-2 line-clamp-1`} style={{ color: '#1A5463' }}>
                          {job.title}
                        </h4>
                          <div className={`${inter.className} flex items-center gap-2 text-xs mb-2`} style={{ color: '#6B6B6B' }}>
                            <MapPin className="w-3 h-3" style={{ color: '#275F48' }} />
                          <span>{job.city}, {job.state}</span>
                            {job.radius_miles && (
                              <span style={{ color: '#275F48' }}>• {job.radius_miles}mi radius</span>
                            )}
                        </div>
                          <p className={`${inter.className} text-xs line-clamp-2`} style={{ color: '#6B6B6B', opacity: 0.8 }}>
                          {job.description}
                        </p>
                      </div>
                    ))
                  ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#F5F1E8' }}>
                          <Users className="w-8 h-8" style={{ color: '#6B6B6B', opacity: 0.5 }} />
                        </div>
                        <p className={`${inter.className} text-sm`} style={{ color: '#6B6B6B' }}>No jobs posted yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        )}

        {/* Job Applications Tab - Table View */}
        {activeTab === 'job-applications' && (
          <Card className="shadow-xl border-0 rounded-3xl overflow-hidden" style={{ backgroundColor: 'white' }}>
            <CardHeader className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #275F48 0%, #1A5463 100%)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className={`${playfair.className} text-2xl font-semibold text-white`}>
                      Job Applications
                    </CardTitle>
                    <p className={`${inter.className} text-white text-sm mt-1`} style={{ opacity: 0.9 }}>
                      Manage and review incoming job applications
                    </p>
                  </div>
                </div>
                {newRequests > 0 && (
                  <Button
                    className={`${inter.className} rounded-full px-6 py-2 font-semibold text-white`}
                    style={{ backgroundColor: '#EF4444' }}
                  >
                    {newRequests} New Requests
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6B6B6B' }} />
                    <Input
                      placeholder="Search by applicant name, email, or phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`${inter.className} pl-12 h-12 rounded-2xl border-2`}
                      style={{ 
                        borderColor: '#E8E3D3',
                        backgroundColor: 'hsl(var(--background))'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#275F48';
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E8E3D3';
                        e.currentTarget.style.backgroundColor = 'hsl(var(--background))';
                      }}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className={`${inter.className} w-full md:w-[180px] h-12 rounded-2xl border-2`} style={{ borderColor: '#E8E3D3', backgroundColor: 'hsl(var(--background))' }}>
                      <Filter className="w-4 h-4 mr-2" style={{ color: '#6B6B6B' }} />
                      <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="reviewed">Reviewed</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="hired">Hired</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className={`${inter.className} w-full md:w-[180px] h-12 rounded-2xl border-2`} style={{ borderColor: '#E8E3D3', backgroundColor: 'hsl(var(--background))' }}>
                      <Calendar className="w-4 h-4 mr-2" style={{ color: '#6B6B6B' }} />
                      <SelectValue placeholder="Filter Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => exportToCSV('job')}
                    className={`${inter.className} h-12 px-6 rounded-2xl font-semibold`}
                    style={{ backgroundColor: '#275F48', color: 'white' }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>

              {/* Table */}
              {isLoadingApplications ? (
                <div className="text-center py-16">
                  <div className="w-12 h-12 border-4 rounded-full mx-auto mb-4 animate-spin" style={{ borderColor: '#275F48', borderTopColor: 'transparent' }}></div>
                  <p className={`${inter.className} text-sm`} style={{ color: '#6B6B6B' }}>Loading applications...</p>
                </div>
              ) : totalApps > 0 ? (
                <>
                  <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#E8E3D3' }}>
                    <Table>
                      <TableHeader>
                        <TableRow style={{ backgroundColor: 'hsl(var(--background))' }}>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>
                            <button
                              onClick={() => handleSort('name')}
                              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                            >
                              Applicant Name
                              {sortField === 'name' && (
                                sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                              )}
                              {sortField !== 'name' && <ArrowUpDown className="w-4 h-4 opacity-50" />}
                            </button>
                          </TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>Email</TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>Phone</TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>Job Category</TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>Service Type</TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>Gender</TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>Experience</TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>
                            <button
                              onClick={() => handleSort('status')}
                              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                            >
                              Status
                              {sortField === 'status' && (
                                sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                              )}
                              {sortField !== 'status' && <ArrowUpDown className="w-4 h-4 opacity-50" />}
                            </button>
                          </TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>
                            <button
                              onClick={() => handleSort('date')}
                              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                            >
                              Date
                              {sortField === 'date' && (
                                sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                              )}
                              {sortField !== 'date' && <ArrowUpDown className="w-4 h-4 opacity-50" />}
                            </button>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentApps.map((app) => (
                          <TableRow 
                            key={app.id}
                            className="hover:bg-background transition-colors"
                            style={{ borderColor: '#E8E3D3' }}
                          >
                            <TableCell className={`${inter.className} font-medium`} style={{ color: '#1A5463' }}>
                              {app.first_name} {app.last_name}
                            </TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>{app.email}</TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>{app.phone}</TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>
                              {app.job_category ? app.job_category.replace('_', ' ') : '-'}
                            </TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>
                              {app.service_type || '-'}
                            </TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>
                              {app.gender || '-'}
                            </TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>
                              {app.has_experience !== null ? (app.has_experience ? 'Yes' : 'No') : '-'}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: getStatusDot(app.status) }}
                                ></div>
                                <span className={inter.className} style={{ color: '#6B6B6B' }}>
                                  {getStatusLabel(app.status)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>
                              {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-6">
                    <p className={`${inter.className} text-sm`} style={{ color: '#6B6B6B' }}>
                      Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalApps)} of {totalApps} results
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`${inter.className} rounded-full`}
                        style={{ borderColor: '#E8E3D3', color: '#1A5463' }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className={`${inter.className} rounded-full min-w-[40px]`}
                            style={
                              currentPage === pageNum
                                ? { backgroundColor: '#275F48', color: 'white' }
                                : { borderColor: '#E8E3D3', color: '#1A5463' }
                            }
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <span className={`${inter.className} px-2`} style={{ color: '#6B6B6B' }}>...</span>
                      )}
                      {totalPages > 5 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(totalPages)}
                          className={`${inter.className} rounded-full`}
                          style={{ borderColor: '#E8E3D3', color: '#1A5463' }}
                        >
                          {totalPages}
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`${inter.className} rounded-full`}
                        style={{ borderColor: '#E8E3D3', color: '#1A5463' }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#F5F1E8' }}>
                    <FileText className="w-8 h-8" style={{ color: '#6B6B6B', opacity: 0.5 }} />
                  </div>
                  <p className={`${inter.className} text-base`} style={{ color: '#6B6B6B' }}>
                    {searchQuery || statusFilter !== 'all' || dateFilter !== 'all' 
                      ? 'No applications match your filters' 
                      : 'No job applications yet'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Care Applications Tab - Table View */}
        {activeTab === 'care-applications' && (
          <Card className="shadow-xl border-0 rounded-3xl overflow-hidden" style={{ backgroundColor: 'white' }}>
            <CardHeader className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className={`${playfair.className} text-2xl font-semibold text-white`}>
                      Care Applications
                    </CardTitle>
                    <p className={`${inter.className} text-white text-sm mt-1`} style={{ opacity: 0.9 }}>
                      Manage and review incoming care requests from clients
                    </p>
                  </div>
                </div>
                {newRequests > 0 && (
                  <Button
                    className={`${inter.className} rounded-full px-6 py-2 font-semibold text-white`}
                    style={{ backgroundColor: '#EF4444' }}
                  >
                    {newRequests} New Requests
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6B6B6B' }} />
                    <Input
                      placeholder="Search by applicant name, email, or phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`${inter.className} pl-12 h-12 rounded-2xl border-2`}
                      style={{ 
                        borderColor: '#E8E3D3',
                        backgroundColor: 'hsl(var(--background))'
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = '#8B5CF6';
                        e.currentTarget.style.backgroundColor = 'white';
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = '#E8E3D3';
                        e.currentTarget.style.backgroundColor = 'hsl(var(--background))';
                      }}
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className={`${inter.className} w-full md:w-[180px] h-12 rounded-2xl border-2`} style={{ borderColor: '#E8E3D3', backgroundColor: 'hsl(var(--background))' }}>
                      <Filter className="w-4 h-4 mr-2" style={{ color: '#6B6B6B' }} />
                      <SelectValue placeholder="Filter Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className={`${inter.className} w-full md:w-[180px] h-12 rounded-2xl border-2`} style={{ borderColor: '#E8E3D3', backgroundColor: 'hsl(var(--background))' }}>
                      <Calendar className="w-4 h-4 mr-2" style={{ color: '#6B6B6B' }} />
                      <SelectValue placeholder="Filter Date" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={() => exportToCSV('care')}
                    className={`${inter.className} h-12 px-6 rounded-2xl font-semibold`}
                    style={{ backgroundColor: '#8B5CF6', color: 'white' }}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </Button>
                </div>
              </div>

              {/* Table */}
              {isLoadingApplications ? (
                <div className="text-center py-16">
                  <div className="w-12 h-12 border-4 rounded-full mx-auto mb-4 animate-spin" style={{ borderColor: '#8B5CF6', borderTopColor: 'transparent' }}></div>
                  <p className={`${inter.className} text-sm`} style={{ color: '#6B6B6B' }}>Loading applications...</p>
                </div>
              ) : totalApps > 0 ? (
                <>
                  <div className="rounded-2xl border-2 overflow-hidden" style={{ borderColor: '#E8E3D3' }}>
                    <Table>
                      <TableHeader>
                        <TableRow style={{ backgroundColor: 'hsl(var(--background))' }}>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>
                            <button
                              onClick={() => handleSort('name')}
                              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                            >
                              Applicant Name
                              {sortField === 'name' && (
                                sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                              )}
                              {sortField !== 'name' && <ArrowUpDown className="w-4 h-4 opacity-50" />}
                            </button>
                          </TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>Email</TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>Phone</TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>Postal Code</TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>Care Category</TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>Service Type</TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>Who Needs Care</TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>SMS Consent</TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>
                            <button
                              onClick={() => handleSort('status')}
                              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                            >
                              Status
                              {sortField === 'status' && (
                                sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                              )}
                              {sortField !== 'status' && <ArrowUpDown className="w-4 h-4 opacity-50" />}
                            </button>
                          </TableHead>
                          <TableHead className={`${inter.className} font-semibold`} style={{ color: '#1A5463' }}>
                            <button
                              onClick={() => handleSort('date')}
                              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
                            >
                              Date
                              {sortField === 'date' && (
                                sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />
                              )}
                              {sortField !== 'date' && <ArrowUpDown className="w-4 h-4 opacity-50" />}
                            </button>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentApps.map((app) => (
                          <TableRow 
                            key={app.id}
                            className="hover:bg-background transition-colors"
                            style={{ borderColor: '#E8E3D3' }}
                          >
                            <TableCell className={`${inter.className} font-medium`} style={{ color: '#1A5463' }}>
                              {app.first_name} {app.last_name}
                            </TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>{app.email}</TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>{app.phone}</TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>{app.postal_code}</TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>
                              {app.care_category ? app.care_category.replace('_', ' ') : '-'}
                            </TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>
                              {app.service_type ? app.service_type.replace('_', ' ') : '-'}
                            </TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>
                              {app.who_needs_care ? app.who_needs_care.replace('_', ' ') : '-'}
                            </TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>
                              {app.sms_consent ? 'Yes' : 'No'}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: getStatusDot(app.status) }}
                                ></div>
                                <span className={inter.className} style={{ color: '#6B6B6B' }}>
                                  {getStatusLabel(app.status)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className={inter.className} style={{ color: '#6B6B6B' }}>
                              {new Date(app.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  <div className="flex items-center justify-between mt-6">
                    <p className={`${inter.className} text-sm`} style={{ color: '#6B6B6B' }}>
                      Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalApps)} of {totalApps} results
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className={`${inter.className} rounded-full`}
                        style={{ borderColor: '#E8E3D3', color: '#1A5463' }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return (
                          <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(pageNum)}
                            className={`${inter.className} rounded-full min-w-[40px]`}
                            style={
                              currentPage === pageNum
                                ? { backgroundColor: '#8B5CF6', color: 'white' }
                                : { borderColor: '#E8E3D3', color: '#1A5463' }
                            }
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                      {totalPages > 5 && currentPage < totalPages - 2 && (
                        <span className={`${inter.className} px-2`} style={{ color: '#6B6B6B' }}>...</span>
                      )}
                      {totalPages > 5 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage(totalPages)}
                          className={`${inter.className} rounded-full`}
                          style={{ borderColor: '#E8E3D3', color: '#1A5463' }}
                        >
                          {totalPages}
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className={`${inter.className} rounded-full`}
                        style={{ borderColor: '#E8E3D3', color: '#1A5463' }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#F5F1E8' }}>
                    <Heart className="w-8 h-8" style={{ color: '#6B6B6B', opacity: 0.5 }} />
                  </div>
                  <p className={`${inter.className} text-base`} style={{ color: '#6B6B6B' }}>
                    {searchQuery || statusFilter !== 'all' || dateFilter !== 'all' 
                      ? 'No applications match your filters' 
                      : 'No care applications yet'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
