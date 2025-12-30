import FadeIn from "@/components/FadeIn";
import ProjectCard from "@/components/ProjectCard"; 
import Link from "next/link";

import {client} from "@/sanity/lib/client"; // Sanity client
import {urlFor} from "@/sanity/lib/image"; // Sanity image URL builder
//^^allows us to build image URLs for Sanity images


// general display tiles like on curr homepage for each project. Perhaps with categories/tags to filter by.
// ^^make clickable to view more details/images about each project, or just swipable for multiple pictures?


interface Project {
  _id: string;
  title: string;
  category: string;
  slug: { current: string };
  image: any; // Sanity image object
}

async function getProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc){
    _id,
    title,
    category,
    slug,
    image
  }`;
  const project_data = await client.fetch(query, {}, { next: { revalidate: 0 } }); //force fresh data on each request
  return project_data;
}

export default async function Portfolio() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-dark-900 text-white p-10">
      <FadeIn>
        <div className="text-center py-20">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-pink to-neon-cyan">
             Portfolio
            </span>{" "}
            
          </h1>
          <p className="text-gray-400 text-xl">
            testing
          </p>
        </div>
      </FadeIn>

      {/* loop for all available projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {projects.map((project: Project) => ( // Iterate over fetched projects (like a loop)
          <Link href={`/project/${project.slug.current}`} key={project._id} passHref>
            <ProjectCard 
              key={project._id}
              title={project.title}
              category={project.category}
              image={project.image ? urlFor(project.image).url() : "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} // image URL generated from Sanity image object
            />
          </Link>
        ))}
      </div>
    </main>
  );
}