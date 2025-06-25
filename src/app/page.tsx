import { BackgroundLines } from "@/components/ui/background";

import { Button } from "@/components/ui/button";

import { LucideLightbulb, ArrowRight, Star } from "lucide-react";
import { FocusCards } from "@/components/ui/focus-cards";

import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const cards = [
  {
    id: "singer",
    title: "Singer",
    src: "/categories/singer.jpg",
  },
  {
    id: "dancer",
    title: "Dancer",
    src: "/categories/dancer2.jpg",
  },
  {
    id: "dj",
    title: "DJ",
    src: "/categories/dj.jpg",
  },
  {
    id: "speaker",
    title: "Speaker",
    src: "/categories/speaker2.jpg",
  },
  {
    id: "guitarist",
    title: "The road not taken",
    src: "https://images.unsplash.com/photo-1507041957456-9c397ce39c97?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Event Planner",
    content:
      "Artistly made finding the perfect performer for our corporate event seamless. The quality of artists is exceptional!",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Wedding Coordinator",
    content:
      "The platform's filtering system helped us find exactly what our clients needed. Professional and reliable service.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Festival Director",
    content:
      "We've booked multiple artists through Artistly. The booking process is smooth and the artists are top-notch.",
    rating: 5,
  },
];

export default function Home() {
  return (
    <div>
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted>
        <source src="/3941289-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Header Section */}

      <div>
        <BackgroundLines className="flex items-center justify-center  flex-col px-4">
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-r from-yellow-500 to-yellow-300 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            Connect with Artists <br />
            <ContainerTextFlip
              words={["Singer", "Dancer", "DJ", "Performer"]}
            />
          </h2>
          <div className="mt-3 flex space-x-4 z-20">
            <Button
              variant="myTypeGhost"
              size="lg"
              className="rounded-full text-lg h-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700  text-white">
              <LucideLightbulb />
              Learn More
            </Button>
            <Button
              variant="myTypeGhost"
              size="lg"
              className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg h-auto">
              Get Started <ArrowRight />
            </Button>
          </div>
        </BackgroundLines>
      </div>

      {/* Browse by Category */}
      <section className="py-20 bg-black relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Browse by Category
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect performer for your event from our diverse
              categories of talented artists.
            </p>
          </div>
          <FocusCards cards={cards} />
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Book your perfect performer in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Browse Artists</h3>
              <p className="text-muted-foreground">
                Explore our curated collection of verified performers across
                multiple categories
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Request Quote</h3>
              <p className="text-muted-foreground">
                Contact artists directly and receive personalized quotes for
                your event
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Book & Enjoy</h3>
              <p className="text-muted-foreground">
                Secure your booking and enjoy an unforgettable performance at
                your event
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by event planners and artists worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    `&quote{testimonial.content}&quote`
                  </p>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Find Your Perfect Performer?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of event planners who trust Artistly for their
            entertainment needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto"
              asChild>
              <Link href="/artists">Start Browsing</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 h-auto"
              asChild>
              <Link href="/onboard">Join as Artist</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
