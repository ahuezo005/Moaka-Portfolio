import {client} from "@/sanity/lib/client"; // Sanity client
import {urlFor} from "@/sanity/lib/image"; // Sanity image URL builder
import Image from "next/image";
import { notFound } from "next/navigation"; // 404/error page
import { PortableText } from "@portabletext/react"; // Rich text renderer for Sanity

async function getProject(slug: string) {   //async allows us to use await inside function
    const query = `*[_type == "project" && slug.current == $slug][0]{
    title,
    category,
    image,
    content
}`;
    
    const project = await client.fetch(query, { slug }, { next: { revalidate: 0 } }); //force fresh data on each request
    return project;
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
    const project = await getProject(params.slug);

    if (!project) {
        return notFound(); // Show 404 page if project not found
    }

    const ptComponents = { // tells the PortableText component how to style the database content
      block: { 
        h1: ({ children }: any) => <h1 className="text-3xl font-bold text-neon-pink mt-8 mb-4">{children}</h1>, 
        h2: ({ children }: any) => <h2 className="text-2xl font-bold text-neon-lime mt-8 mb-4">{children}</h2>, 
        h3: ({ children }: any) => <h3 className="text-xl font-bold text-neon-cyan mt-6 mb-3">{children}</h3>, 
        normal: ({ children }: any) => <p className="text-gray-300 text-lg leading-relaxed mb-6">{children}</p>, 
      }, 
      list: { 
        bullet: ({ children }: any) => <ul className="list-disc ml-5 text-gray-300 space-y-2 mb-6">{children}</ul>, 
        number: ({ children }: any) => <ol className="list-decimal ml-5 text-gray-300 space-y-2 mb-6">{children}</ol>, 
      }, 
    }; 

    return (
        <main className="min-h-screen bg-dark-900 text-white p-10 flex flex-col items-center">
            <div className="max-w-4xl w-full">
                <a href="/" className="text-neon-cyan hover:underline mb-6 inline-block">
                    &larr; Back to Projects
                </a>

                <div className="mb-10">
                    <p className="text-neon-pink font-bold uppercase tracking-wider mb-2">
                        {project.category}
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {project.title}
                    </h1>
                </div>

                <div className="w-full h-96 relative mb-10 border border-dark-800 rounded-2xl overflow-hidden"> 
                    <Image
                        src={project.image ? urlFor(project.image).url() : "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"} //stock image for error fallback
                        alt={project.title}
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="prose prose-invert max-w-none">
                    {/* If content exists, render using our custom styles. If not, show the placeholder. */}
                    {project.content ? (
                        <PortableText value={project.content} components={ptComponents} />
                    ) : ( 
                        <p>Place holder description here for {project.title} project. Testing...</p>
                    )} 
                </div>
            </div>
        </main>
    );
}