"use client"

import React, { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import Link from "next/link"
import AOS from 'aos'
import 'aos/dist/aos.css'
import { GooglePlacesAutocomplete } from "@/components/google-places-autocomplete"
import { JobDetailsModal } from "@/components/job-details-modal"
import { JobApplicationForm } from "@/components/job-application-form"

interface JobPosting {
  id: string;
  title: string;
  description: string;
  zipcode: string;
  city: string;
  state: string;
  lat?: number;
  lng?: number;
  created_at: string;
  updated_at: string;
}

interface LocationGroup {
  city: string;
  state: string;
  zipcode: string;
  distance?: number;
  jobs: JobPosting[];
}

function SearchResultsContent() {
  const searchParams = useSearchParams()
  const [locationGroups, setLocationGroups] = useState<LocationGroup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchLocation, setSearchLocation] = useState<string>("")
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false)

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const zipcode = searchParams.get('zipcode')
        const lat = searchParams.get('lat')
        const lng = searchParams.get('lng')
        const location = searchParams.get('location')

        if (location) {
          setSearchLocation(location)
        }

        let url = '/api/jobs'
        const params = new URLSearchParams()

        if (zipcode) {
          params.append('zipcode', zipcode)
          params.append('radius', '80.47') // 50 miles in km
        } else if (lat && lng) {
          params.append('lat', lat)
          params.append('lng', lng)
          params.append('radius', '80.47') // 50 miles in km
        }

        if (params.toString()) {
          url += `?${params.toString()}`
        }

        const response = await fetch(url)
        const data = await response.json()

        if (data.success) {
          // Group jobs by location and calculate distances
          const groupedJobs = groupJobsByLocation(data.jobs, lat ? parseFloat(lat) : undefined, lng ? parseFloat(lng) : undefined)
          setLocationGroups(groupedJobs)
        } else {
          setError('Failed to fetch jobs. Please try again.')
        }
      } catch (err) {
        setError('An error occurred while searching for jobs.')
        console.error('Error fetching jobs:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [searchParams])

  const groupJobsByLocation = (jobs: JobPosting[], searchLat?: number, searchLng?: number): LocationGroup[] => {
    const groups: { [key: string]: LocationGroup } = {}

    jobs.forEach(job => {
      const locationKey = `${job.city}-${job.state}`
      
      if (!groups[locationKey]) {
        let distance: number | undefined
        
        if (searchLat && searchLng && job.lat && job.lng) {
          distance = calculateDistance(searchLat, searchLng, job.lat, job.lng)
        }

        groups[locationKey] = {
          city: job.city,
          state: job.state,
          zipcode: job.zipcode,
          distance,
          jobs: []
        }
      }
      
      groups[locationKey].jobs.push(job)
    })

    // Convert to array and sort by distance
    return Object.values(groups).sort((a, b) => {
      if (a.distance === undefined && b.distance === undefined) return 0
      if (a.distance === undefined) return 1
      if (b.distance === undefined) return -1
      return a.distance - b.distance
    })
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const handleApplyToJob = (job: JobPosting) => {
    setSelectedJob(job)
    setIsDetailsModalOpen(false) // Close details modal
    setIsApplicationFormOpen(true) // Open application form
  }

  const handleGoBackToDetails = () => {
    setIsApplicationFormOpen(false) // Close application form
    setIsDetailsModalOpen(true) // Open details modal
  }

  const handleViewDetails = (job: JobPosting) => {
    setSelectedJob(job)
    setIsDetailsModalOpen(true)
  }

  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m away`
    } else if (distance < 10) {
      return `${distance.toFixed(1)}km away`
    } else {
      return `${Math.round(distance)}km away`
    }
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FCFDFB] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#275F48] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1A5463] text-lg">Searching for jobs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FCFDFB] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-[#1A5463] mb-2">Search Error</h2>
          <p className="text-[#1A5463] mb-6">{error}</p>
                          <Link href="/jobs/senior-care">
                  <Button className="bg-[#16803C] hover:bg-[#126030] text-white">
                    Back to Search
                  </Button>
                </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-[#FCFDFB] py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-80 md:h-80 lg:h-96 w-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('/images/bg-image/find-job-bg.jpg')`
                  }}
                >
                  {/* Overlay for better text readability */}
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section Below Hero */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-[#F8FBF8]">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="text-center max-w-5xl mx-auto">
            {/* Decorative elements */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-1 bg-gradient-to-r from-[#275F48] to-[#4A6741] rounded-full"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#1A5463] mb-8 leading-tight">
              Find Your Perfect Job
            </h1>
            
            <div className="relative">
              <p className="text-xl md:text-2xl lg:text-3xl font-serif mb-8 max-w-4xl mx-auto leading-relaxed text-[#1A5463]">
                {searchLocation 
                  ? (
                    <span className="relative">
                      Discover rewarding caregiver opportunities near{' '}
                      <span className="relative inline-block">
                        <span className="font-bold text-[#275F48] relative z-10">{searchLocation}</span>
                        <span className="absolute inset-0 bg-[#E8F5E8] transform -rotate-1 rounded-lg -z-10"></span>
                      </span>
                    </span>
                  )
                  : (
                    <span className="font-light">
                      Explore meaningful caregiver positions that match your skills and passion
                    </span>
                  )
                }
              </p>
            </div>
            

          </div>
        </div>
      </section>

      {/* Jobs Results Section */}
      <section className="py-16 md:py-24 bg-[#FAFDFA]">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          {locationGroups.length > 0 ? (
            <div className="space-y-8">


              {/* Location Groups */}
              {locationGroups.map((group, groupIndex) => (
                <div key={`${group.city}-${group.state}`} data-aos="fade-up" data-aos-delay={groupIndex * 100}>
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    {/* Location Header */}
                    <div className="bg-[#4B7682] px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-serif font-bold text-white">
                            <span className="font-bold">{group.city}, {group.state}</span>
                          </h3>
                          {group.distance !== undefined && (
                            <p className="text-white/80 text-sm">
                              {formatDistance(group.distance)} from your search
                            </p>
                          )}
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                          <span className="text-white font-semibold text-sm">
                            {group.jobs.length} position{group.jobs.length === 1 ? '' : 's'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Jobs List */}
                    <div className="divide-y divide-gray-100">
                      {group.jobs.map((job, jobIndex) => (
                        <div key={job.id} className="p-6 hover:bg-gray-50 transition-all duration-300">
                          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                            <div className="flex-1">
                              <h4 className="text-xl font-serif font-bold text-[#1A5463] mb-3">
                                {job.title}
                              </h4>
                              <p className="text-gray-600 text-base leading-relaxed mb-4 line-clamp-3">
                                {job.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                                <span className="font-medium">{job.zipcode}</span>
                                <span>Posted {formatDate(job.created_at)}</span>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 lg:flex-shrink-0">
                              <Button
                                onClick={() => handleViewDetails(job)}
                                variant="outline"
                                size="lg"
                                className="border-2 border-[#16803C] text-[#16803C] hover:bg-[#16803C] hover:text-white font-semibold px-6 rounded-full"
                              >
                                View Details
                              </Button>
                              <Button
                                onClick={() => handleApplyToJob(job)}
                                size="lg"
                                className="bg-[#16803C] hover:bg-[#126030] text-white font-semibold px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-full"
                              >
                                Apply Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 bg-gradient-to-br from-[#275F48] to-[#4A6741] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#1A5463] mb-4">No Jobs Found</h3>
                <p className="text-[#1A5463] text-lg mb-8 leading-relaxed">
                  We couldn't find any caregiver positions in this area. Try searching for a different location or check back later for new opportunities.
                </p>
                <Link href="/jobs/senior-care">
                  <Button 
                    size="lg"
                    className="bg-[#16803C] hover:bg-[#126030] text-white font-semibold px-8 py-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    Search Different Location
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Adjust Search Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-serif  md:text-3xl font-serif font-bold text-[#1A5463] mb-6">
              Adjust Your Search
            </h2>
            <p className="text-lg font-serif text-[#1A5463] mb-8">
              Type ZIP Code or City & State
            </p>
            
            <div className="w-full max-w-2xl space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <div className="relative flex-1 w-full sm:max-w-md">
                  <GooglePlacesAutocomplete
                    placeholder="Postal Code or City & State"
                    onLocationSelect={(locationData) => {
                      setSearchLocation(locationData.formatted_address);
                      // Auto-search when location is selected
                      const searchParams = new URLSearchParams();
                      if (locationData.zipcode) {
                        searchParams.append('zipcode', locationData.zipcode);
                      } else if (locationData.lat && locationData.lng) {
                        searchParams.append('lat', locationData.lat.toString());
                        searchParams.append('lng', locationData.lng.toString());
                      }
                      searchParams.append('location', locationData.formatted_address);
                      window.location.href = `/jobs/search-results?${searchParams.toString()}`;
                    }}
                  />
                </div>
                
                <Button 
                  onClick={() => {
                    if (searchLocation) {
                      const searchParams = new URLSearchParams();
                      searchParams.append('location', searchLocation);
                      window.location.href = `/jobs/search-results?${searchParams.toString()}`;
                    }
                  }}
                  disabled={!searchLocation}
                  className="h-14 bg-[#16803C] hover:bg-[#126030] text-white font-semibold text-base px-8 rounded-full transition-all duration-400 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Search Jobs
                </Button>
              </div>
            </div>
            
            <div className="mt-6">
              <Button
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        const { latitude, longitude } = position.coords;
                        const searchParams = new URLSearchParams();
                        searchParams.append('lat', latitude.toString());
                        searchParams.append('lng', longitude.toString());
                        window.location.href = `/jobs/search-results?${searchParams.toString()}`;
                      },
                      (error) => {
                        console.error('Error getting location:', error);
                        alert('Unable to get your current location. Please enter a location manually.');
                      }
                    );
                  } else {
                    alert('Geolocation is not supported by this browser. Please enter a location manually.');
                  }
                }}
                variant="outline"
                size="lg"
                className="border-2 border-[#16803C] text-[#16803C] hover:bg-[#16803C] hover:text-white font-semibold px-6 py-3 transition-all duration-300"
              >
                Use Current Location
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && (
        <JobDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false)
            setSelectedJob(null)
          }}
          job={selectedJob}
          onApply={handleApplyToJob}
        />
      )}

      {/* Job Application Form */}
      {selectedJob && (
        <JobApplicationForm
          isOpen={isApplicationFormOpen}
          onClose={() => {
            setIsApplicationFormOpen(false)
            setSelectedJob(null)
          }}
          onGoBack={handleGoBackToDetails}
          job={selectedJob}
          searchLocation={searchLocation}
        />
      )}
    </div>
  )
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FCFDFB] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#275F48] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1A5463] text-lg">Loading...</p>
        </div>
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  )
}
