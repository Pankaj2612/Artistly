"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Filter, X } from "lucide-react";

interface FilterPanelProps {
  filters: {
    categories: string[];
    location: string;
    feeRange: string;
    verified: boolean;
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
}

const FilterPanel = ({ filters, onFiltersChange, onClearFilters }: FilterPanelProps) => {
  const categories = ["Singer", "Dancer", "DJ", "Speaker", "Producer", "Guitarist", "Choreographer", "MC", "Performer"];
  const feeRanges = [
    "Under $1,000",
    "$1,000 - $2,500", 
    "$2,500 - $5,000",
    "$5,000 - $10,000",
    "Over $10,000"
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked 
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const activeFiltersCount = 
    filters.categories.length + 
    (filters.location ? 1 : 0) + 
    (filters.feeRange ? 1 : 0) + 
    (filters.verified ? 1 : 0);

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-8 px-2 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Categories</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => 
                    handleCategoryChange(category, checked as boolean)
                  }
                />
                <Label htmlFor={category} className="text-sm cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location" className="text-sm font-medium mb-3 block">
            Location
          </Label>
          <Input
            id="location"
            placeholder="Enter city or state..."
            value={filters.location}
            onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
          />
        </div>

        {/* Fee Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Fee Range</Label>
          <Select
            value={filters.feeRange}
            onValueChange={(value) => onFiltersChange({ ...filters, feeRange: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select fee range" />
            </SelectTrigger>
            <SelectContent>
              {feeRanges.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Verified Only */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="verified"
            checked={filters.verified}
            onCheckedChange={(checked) => 
              onFiltersChange({ ...filters, verified: checked as boolean })
            }
          />
          <Label htmlFor="verified" className="text-sm cursor-pointer">
            Verified artists only
          </Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterPanel;