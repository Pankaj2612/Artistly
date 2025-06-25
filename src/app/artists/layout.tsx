import { Suspense } from "react";

export default function ArtistsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<div>Loading artists...</div>}>
        {children}
      </Suspense>
    </div>
  );
}
