import React from "react"; 
import Link from "next/link";
import {client} from "@/sanity/lib/client"; 
import {urlFor} from "@/sanity/lib/image"; 

interface Project {
    _id: string;
    title: string;
    slug: { current: string };
    image: any;
}

async function getFeaturedProjects() {
    // Fetches 2 projects where the 'featured' toggle is ON
    const query = `*[_type == "project" && featured == true] | order(_createdAt desc)[0...2]{
        _id,
        title,
        slug,
        image
    }`;

    const projects = await client.fetch(query, {}, { next: { revalidate: 0 } });
    return projects;
}

export default async function homepage() {
  const projects = await getFeaturedProjects();

  return (
    <main className="bg-rose-100 min-h-screen selection:bg-yellow-400 selection:text-black">

        {/* Splash/welcome screen */}
        <section className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-200 rounded-full blur-[100px] opacity-40 animate-pulse"> </div>

            <div className="z-10 flex flex-col items-center gap-8">
                <div className="w-64 h-64 bg-gray-900 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] overflow-hidden shadow-2xl relative">
                {/* This is where splash photo goes. RN is placeholder gray box. */}
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/400)' }}></div>
                </div>
                {/* Name and title/brief description */}
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-gray-900 uppercase"> Name  <br/> Placeholder</h1>
                <p className="text-xl md:text-2xl font-medium text medium text-gray-500"> Multidisciplinary Artist</p>
            </div>

            {/* scroll indicator */}
            <div className="absolute bottom-10 animate-bounce">
                <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </section>


        {/* Portfolio Showcase */}
        <section className="py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-800">
                        Portfolio <br/> Highlights
                    </h2>
                    <Link href="/portfolio" className="text-gray-800 text-lg underline decoration-2 underline-offset-4 hover:text-blue-600 transition-colors">
                        View Full Portfolio &rarr;
                    </Link>
                </div>

                {/* showcase grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Loop replacing old hardcoded cards */}
                    {projects.length > 0 ? (
                        projects.map((project: Project, index: number) => (
                            <Link 
                                href={`/project/${project.slug.current}`} 
                                key={project._id}
                                // Logic to add 'md:mt-24' only to the second card (index 1) to keep your offset layout
                                className={`group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer ${index % 2 === 1 ? 'md:mt-24' : ''} bg-gray-200`}
                            >
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 bg-black/20">
                                    {project.title}
                                </div>
                                
                                {/* Background Image from Sanity */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ 
                                        backgroundImage: project.image 
                                            ? `url(${urlFor(project.image).url()})` 
                                            : 'none'
                                    }} 
                                />
                            </Link>
                        ))
                    ) : (
                        <p className="text-gray-500">No featured projects found...</p>
                    )}

                </div>
            </div>
        </section>

        {/* contact header */}
        <a
            href="mailto:contact@example.com"
            className="block w-full bg-black hover:bg-yellow-400 transition-colors duration-300 cursor-pointer py-32 md:py-48 group" 
        > 
            <div className="container mx-auto px-6 text-center">
                <p className="text-gray-400 group-hover:text-black mb-4 font-bold uppercase tracking-widest">
                    Have an idea?
                </p>
                <h2 className="text-5xl md:text-8xl font-black text-white group-hover:text-black transition-colors">
                    Let&apos;s Create <br/> Something Together!
                </h2>
                <div className="mt-8 inline-block overflow-hidden">
                    <span className="block translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-xl text-white group-hover:text-black font-bold">
                        Click to send me an email
                    </span>
                </div>
            </div>
        </a>
    
    </main>
  );
}