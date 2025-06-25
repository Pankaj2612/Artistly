"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, CheckCircle, MessageCircle } from "lucide-react";

interface Artist {
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
}

interface ArtistCardProps {
  artist: Artist;
  layout?: "grid" | "list";
}

const ArtistCard = ({ artist, layout = "grid" }: ArtistCardProps) => {
  if (layout === "list") {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="relative w-full sm:w-48 h-48 sm:h-auto">
              <Image
                src={artist.image}
                alt={artist.name}
                fill
                className="object-cover"
              />
              {artist.verified && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="h-5 w-5 text-green-500 bg-white rounded-full" />
                </div>
              )}
            </div>
            <div className="flex-1 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{artist.name}</h3>
                    {artist.verified && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {artist.category.map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {artist.bio}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {artist.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {artist.rating} ({artist.reviews})
                    </div>
                  </div>

                  <div className="text-lg font-semibold text-primary">
                    {artist.feeRange}
                  </div>
                </div>

                <div className="mt-4 lg:mt-0 lg:ml-6 flex gap-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Ask for Quote
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={artist.image}
            alt={artist.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {artist.verified && (
            <div className="absolute top-3 right-3">
              <CheckCircle className="h-5 w-5 text-green-500 bg-white rounded-full" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex flex-wrap gap-1">
              {artist.category.map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs bg-white/90 text-black">
                  {cat}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-bold line-clamp-1">{artist.name}</h3>
            {artist.verified && (
              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
            )}
          </div>
          
          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
            {artist.bio}
          </p>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{artist.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {artist.rating} ({artist.reviews})
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-primary">
              {artist.feeRange}
            </div>
            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Ask Quote
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;