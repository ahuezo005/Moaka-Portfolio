'use client';
import Link from "next/link";
import { usePathname } from "next/navigation"; //hook to get current path

const Navbuttons = () => {
    const pathname = usePathname();
    if (pathname && pathname.startsWith('/sanity-studio')) {
        return null; // Don't render nav buttons on studio pages
    }

    const navItems = [
        { name: "Home",
            path: "/",
            color: 'bg-yellow-400 hover:bg-yellow-300',
            shape: 'rounded-[60%_40%_30%_70%/60%_30%_70%_40%]', // Amoeba Blob
            isSticker: false,
        },
        { name: "Shop", 
            path: "/shop",
            color: 'bg-blue-600 hover:bg-blue-500',
            shape: 'rounded-[30%_70%_70%_30%/30%_30%_70%_70%]', // Oval Blob
            isSticker: false, 
        },
        { name: "Portfolio",
             path: "/portfolio",
            color: 'bg-green-600 hover:bg-green-500',
            shape: 'rounded-[40%_60%_60%_40%/40%_40%_60%_60%]', // Heart Blob
            isSticker: false,
        },
        { name: "About",
             path: "/about",
            color: 'bg-purple-600 hover:bg-purple-500',
            shape: 'rounded-[50%_50%_50%_50%/50%_50%_50%_50%]', // Circle Blob
            isSticker: false,
        },
    ];

    return (
    <nav className="fixed z-50 flex gap-4 
      /* Mobile: Bottom-right, vertical stack */
      bottom-4 right-4 flex-col-reverse 
      
      /* Desktop: Top-right, horizontal row */
      md:top-6 md:right-6 md:bottom-auto md:flex-row"
    >
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          // If it is a sticker, use clipPath. If not, use nothing (shape class handles it)
          style={item.isSticker ? { clipPath: item.shape } : {}}
          className={`
            ${item.color}
            ${!item.isSticker ? item.shape : ''} 
            
            /* Sizing */
            w-16 h-16 md:w-20 md:h-20
            
            /* Flex Alignment */
            flex items-center justify-center
            
            /* Typography */
            text-white font-bold text-sm tracking-wide
            
            /* Interaction */
            shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-3
          `}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navbuttons;