"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Calendar, Building } from 'lucide-react';

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

interface JobCardProps {
  job: JobPosting;
  onApply?: (jobId: string) => void;
}

export function JobCard({ job, onApply }: JobCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Posted today';
    } else if (diffDays < 7) {
      return `Posted ${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300 border-[#E4F2D4]">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-[#1A5463] mb-2">
              {job.title}
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-[#275F48]">
              <MapPin className="w-4 h-4" />
              <span>{job.city}, {job.state} {job.zipcode}</span>
            </div>
          </div>
          <Badge variant="secondary" className="bg-[#E4F2D4] text-[#275F48] border-[#275F48]">
            New
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-[#1A5463] text-sm leading-relaxed mb-4 line-clamp-3">
          {job.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-[#275F48]">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatDate(job.created_at)}</span>
            </div>
          </div>
          
          {onApply && (
            <Button 
              onClick={() => onApply(job.id)}
              className="bg-[#275F48] hover:bg-[#1f4a37] text-white text-sm px-4 py-2 rounded-full transition-all duration-200"
            >
              Apply Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
