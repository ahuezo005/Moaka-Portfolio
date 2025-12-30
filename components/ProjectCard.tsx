"use client";
import {motion} from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
}

export default function ProjectCard({ title, category, image }: ProjectCardProps) {
  return (
    <motion.div
        whileHover={{ y: -10 }} // Move up 10px on hover
        className="group relative h-96 w-full cursor-pointer overflow-hidden rounded-2xl bg-dark-800 border border-dark-800 hover:border-neon-pink transition-colors duration-300"
    >
        {/* Background Image */}
        <div className="absolute inset-0 h-full w-full">
            <Image
                src={image}
                alt={title}
                layout="fill"
                className="object-cover transistion-transform duration-500 group-hover:scale-110"
            />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors">
        </div>
        
        {/* Text Content */}
        <div className="absolute bottom-0 left-0 p-6 w-full">
            <p className="text-neon-cyan text-sm font-bold tracking-wider uppercase mb-2">
                {category}
            </p>
            <h3 className="text-3xl font-bold text-white group-hover:text-neon-pink transition-colors">
                {title}
            </h3>
        </div>
    </motion.div>
  );
}