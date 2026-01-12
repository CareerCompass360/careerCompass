"use client"

import { useState, useMemo } from "react"
import { CounselorCard } from "./CounselorCard"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, X } from "lucide-react"

interface Counselor {
  id: string
  fullName: string
  profilePhoto?: string
  currentJobTitle: string
  currentOrganization: string
  totalYearsExperience: number
  primaryCareerDomain: string
  subSpecialization: string
  city: string
  country: string
  languagesSpoken: string[]
  topicsCanHelp: string[]
  studentTypes: string[]
  careerAreasCanCounsel: string[]
  wantToCharge: boolean
  pricePer30Min?: number
  pricePer60Min?: number
}

interface CounselorGridProps {
  counselors: Counselor[]
}

export function CounselorGrid({ counselors }: CounselorGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Extract unique domains for filtering
  const uniqueDomains = useMemo(() => {
    const domains = new Set(counselors.map(c => c.primaryCareerDomain))
    return Array.from(domains).sort()
  }, [counselors])

  // Filter counselors based on search and domain
  const filteredCounselors = useMemo(() => {
    return counselors.filter((counselor) => {
      const matchesSearch = searchQuery === "" || 
        counselor.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        counselor.currentJobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        counselor.primaryCareerDomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        counselor.city.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDomain = selectedDomain === null || counselor.primaryCareerDomain === selectedDomain

      return matchesSearch && matchesDomain
    })
  }, [counselors, searchQuery, selectedDomain])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedDomain(null)
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500" />
            <Input
              type="text"
              placeholder="Search by name, role, domain, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 border-amber-200 focus:border-amber-500 focus:ring-amber-500 text-base"
            />
          </div>

          {/* Filter Toggle Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`border-amber-200 hover:bg-amber-50 hover:border-amber-300 transition-colors ${
              selectedDomain ? "bg-amber-50 border-amber-300" : ""
            }`}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {selectedDomain && (
              <Badge variant="secondary" className="ml-2 bg-amber-600 text-white">
                1
              </Badge>
            )}
          </Button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="p-4 border border-amber-200 rounded-lg bg-amber-50/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-amber-900">Filter by Domain</h3>
              {selectedDomain && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {uniqueDomains.map((domain) => (
                <Badge
                  key={domain}
                  variant={selectedDomain === domain ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedDomain === domain
                      ? "bg-amber-600 text-white hover:bg-amber-700"
                      : "bg-white text-amber-800 border-amber-300 hover:bg-amber-100"
                  }`}
                  onClick={() => setSelectedDomain(selectedDomain === domain ? null : domain)}
                >
                  {domain}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between text-sm text-amber-700">
          <span>
            Showing <span className="font-semibold">{filteredCounselors.length}</span> of{" "}
            <span className="font-semibold">{counselors.length}</span> counselors
          </span>
          {(searchQuery || selectedDomain) && (
            <Button
              variant="link"
              onClick={clearFilters}
              className="text-amber-600 hover:text-amber-800 p-0 h-auto"
            >
              Clear all filters
            </Button>
          )}
        </div>
      </div>

      {/* Counselor Cards Grid */}
      {filteredCounselors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCounselors.map((counselor) => (
            <CounselorCard key={counselor.id} counselor={counselor} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
            <Search className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold text-amber-900 mb-2">No counselors found</h3>
          <p className="text-amber-700 mb-4">
            Try adjusting your search or filters to find more counselors
          </p>
          {(searchQuery || selectedDomain) && (
            <Button
              onClick={clearFilters}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
