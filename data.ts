export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  client: string;
  year: string;
  imageUrl: string;
  description: string;
  tags: string[];
}

// Generating 30+ works as requested
export const galleryItems: GalleryItem[] = Array.from({ length: 32 }).map((_, i) => {
  const categories = ["3D Visuals", "VFX", "Web Design", "Creative Coding", "Brand Identity"];
  const category = categories[i % categories.length];
  
  return {
    id: i,
    title: `Project ${category} ${i + 1}`,
    category: category,
    client: i % 2 === 0 ? "Global Tech Agency" : "Private Commission",
    year: "2024-2025",
    // Using Picsum with different sig to ensure unique images
    imageUrl: `https://picsum.photos/seed/${i + 45}/1200/800`,
    description: "An immersive exploration into digital aesthetics, combining procedural generation with human-centric design principles to create a unique visual experience.",
    tags: ["React", "Three.js", "Design", "Blender"]
  };
});