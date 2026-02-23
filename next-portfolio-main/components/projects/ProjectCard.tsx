import { project } from "@/types/main"
import Image from "next/image"
import Link from "next/link"
import { FaGithub, FaVideo } from "react-icons/fa"
import { BiLinkExternal } from "react-icons/bi"
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeInOut' as const } }
};

interface ProjectCardProps extends project {
    onClick?: () => void;
}

const Project = ({ name, image, category, keywords, links, onClick }: ProjectCardProps) => {

    const [ref, inView] = useInView({
        threshold: 0.2,
        triggerOnce: true
    });

    return (
        <motion.div
            ref={ref}
            variants={cardVariants}
            initial='hidden'
            animate={inView ? 'visible' : 'hidden'}
            whileHover={onClick ? { y: -4, transition: { duration: 0.2 } } : undefined}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
            className={`flex flex-col gap-2 bg-white dark:bg-grey-800 rounded-lg p-4 ${onClick ? "cursor-pointer" : ""}`}>

            <div className="relative group rounded-lg bg-blue-50">
                <Image alt={name} width={1000} height={1000} className="max-w-full h-48 max-h-full object-cover object-top rounded-lg" src={image} />
                {(links.visit.trim() || links.code.trim() || links.video.trim()) &&
                    <div className="absolute top-0 scale-x-0 group-hover:scale-100 transition-transform origin-left duration-200 ease-linear bg-gray-800 bg-opacity-60 w-full h-full rounded-lg flex items-center gap-4 justify-center">
                        {links.visit.trim() &&
                            <Link href={links.visit} target="_blank" onClick={(e) => e.stopPropagation()} className="btn-theme p-2 rounded-lg">
                                <BiLinkExternal size={20} />
                            </Link>
                        }
                        {links.code.trim() &&
                            <Link href={links.code} target="_blank" onClick={(e) => e.stopPropagation()} className="btn-theme p-2 rounded-lg">
                                <FaGithub size={20} />
                            </Link>
                        }
                        {links.video.trim() &&
                            <Link href={links.video} target="_blank" onClick={(e) => e.stopPropagation()} className="btn-theme p-2 rounded-lg">
                                <FaVideo size={20} />
                            </Link>
                        }
                    </div>
                }
            </div>

            <div className="my-2 flex flex-col gap-2">
                <h3 className="text-xl font-medium">{name}</h3>
                {keywords?.length ? (
                    <div className="flex flex-wrap gap-1.5">
                        {keywords.map((k) => (
                            <span
                                key={k}
                                className="px-2 py-0.5 text-xs rounded-md bg-gray-200 text-gray-800 dark:bg-grey-900 dark:text-gray-200"
                            >
                                {k}
                            </span>
                        ))}
                    </div>
                ) : null}
            </div>

        </motion.div>
    )
}

export default Project