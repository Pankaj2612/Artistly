"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Grid, List, Search } from "lucide-react";
import ArtistCard from "@/components/artist-card";
import FilterPanel from "@/components/filter-panel";
import artists from "@/data/artist.json";

type Artist = {
  id: number;
  name: string;
  category: string[];
  bio: string;
  languages: string[];
  feeRange: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  verified: boolean;
};

export default function ArtistsPage() {
  const searchParams = useSearchParams();
  const [layout, setLayout] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    categories: [] as string[],
    location: "",
    feeRange: "",
    verified: false,
  });

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
      if (categoryName === "Dj") {
        setFilters((prev) => ({ ...prev, categories: ["DJ"] }));
      } else {
        setFilters((prev) => ({ ...prev, categories: [categoryName] }));
      }
    }
  }, [searchParams]);

  const filteredArtists = useMemo(() => {
    return artists.filter((artist: Artist) => {
      // Search query filter
      if (
        searchQuery &&
        !artist.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !artist.bio.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !artist.category.some((cat) =>
          cat.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ) {
        return false;
      }

      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.some((cat) => artist.category.includes(cat))
      ) {
        return false;
      }

      // Location filter
      if (
        filters.location &&
        !artist.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // Fee range filter (simplified matching)
      if (filters.feeRange) {
        // This is a simplified fee range matching - in a real app, you'd parse the ranges properly
        const artistFee = artist.feeRange.toLowerCase();
        const filterFee = filters.feeRange.toLowerCase();

        if (
          filterFee === "under $1,000" &&
          !artistFee.includes("$800") &&
          !artistFee.includes("$1,000")
        ) {
          return false;
        }
        // Add more sophisticated fee range matching logic here
      }

      // Verified filter
      if (filters.verified && !artist.verified) {
        return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      location: "",
      feeRange: "",
      verified: false,
    });
    setSearchQuery("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Find Your Perfect Artist
        </h1>
        <p className="text-xl text-muted-foreground">
          Browse our collection of {artists.length}+ verified performing artists
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search artists by name, category, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {filteredArtists.length} artists found
          </span>
          <div className="border-l pl-4 flex items-center gap-2">
            <Button
              variant={layout === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setLayout("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={layout === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setLayout("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="lg:w-80 flex-shrink-0">
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Artists Grid/List */}
        <div className="flex-1">
          {filteredArtists.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                No artists found matching your criteria
              </p>
              <Button onClick={handleClearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <div
              className={
                layout === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-6"
              }>
              {filteredArtists.map((artist: Artist) => (
                <ArtistCard key={artist.id} artist={artist} layout={layout} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
