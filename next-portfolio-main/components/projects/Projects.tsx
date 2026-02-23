import { project } from "@/types/main";
import { useMemo, useState } from "react";
import { Link } from "react-scroll";
import LinkNext from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaVideo } from "react-icons/fa";
import { BiLinkExternal, BiX } from "react-icons/bi";
import SectionWrapper from "../SectionWrapper";
import ProjectCard from "./ProjectCard";

interface Props {
    projectsData: project[]
}

const Projects = ({ projectsData }: Props) => {

    const [projects] = useState([...projectsData].reverse());
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());
    const [selectedProject, setSelectedProject] = useState<project | null>(null);

    const filterKeywords = useMemo(
        () => Array.from(new Set(projects.flatMap((p) => p.keywords))).sort((a, b) => a.localeCompare(b)),
        [projects]
    );

    const filteredProjects = useMemo(() => {
        let result = projects;

        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.keywords.some((k) => k.toLowerCase().includes(q))
            );
        }

        if (selectedKeywords.size > 0) {
            result = result.filter((p) =>
                p.keywords.some((k) => selectedKeywords.has(k))
            );
        }

        return result;
    }, [projects, searchQuery, selectedKeywords]);

    const toggleKeyword = (keyword: string) => {
        setSelectedKeywords((prev) => {
            const next = new Set(prev);
            if (next.has(keyword)) next.delete(keyword);
            else next.add(keyword);
            return next;
        });
    };

    return (
        <SectionWrapper id="projects" className="mx-4 md:mx-0 min-h-screen">
            <h2 className="text-4xl text-center">Projects</h2>

            <div className="max-w-screen-sm mx-auto mt-6 space-y-4">
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-white dark:bg-grey-800 border border-gray-200 dark:border-grey-700 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <div className="flex flex-wrap gap-2 justify-center">
                    {filterKeywords.map((keyword) => (
                        <button
                            key={keyword}
                            type="button"
                            onClick={() => toggleKeyword(keyword)}
                            className={`p-1.5 md:p-2 text-sm md:text-base rounded-xl cursor-pointer transition-all ${
                                selectedKeywords.has(keyword)
                                    ? "btn-theme"
                                    : "bg-white dark:bg-grey-800 hover:bg-gray-100 hover:dark:bg-grey-900 border border-transparent"
                            }`}
                        >
                            {keyword}
                        </button>
                    ))}
                </div>
            </div>

            <div className="md:mx-6 lg:mx-auto lg:w-5/6 2xl:w-3/4 my-4 md:my-8 mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
                {filteredProjects.map((p: project) => (
                    <ProjectCard key={p.name} {...p} onClick={() => setSelectedProject(p)} />
                ))}
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="bg-white dark:bg-grey-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-xl"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative flex-shrink-0">
                                <div className="w-full h-40 md:aspect-video md:h-auto relative bg-blue-50 dark:bg-grey-700">
                                    <Image
                                        alt={selectedProject.name}
                                        src={selectedProject.image}
                                        fill
                                        className="object-cover object-top"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="absolute top-2 right-2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                                    onClick={() => setSelectedProject(null)}
                                    aria-label="Close"
                                >
                                    <BiX size={24} />
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto flex-1 min-h-0 space-y-4">
                                <h3 className="text-2xl font-medium">{selectedProject.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{selectedProject.category}</p>
                                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{selectedProject.description}</p>
                                {selectedProject.keywords.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.keywords.map((k) => (
                                            <span
                                                key={k}
                                                className="px-2 py-1 text-xs rounded-md bg-gray-200 text-gray-800 dark:bg-grey-900 dark:text-gray-200"
                                            >
                                                {k}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                {(selectedProject.links.visit.trim() || selectedProject.links.code.trim() || selectedProject.links.video.trim()) && (
                                    <div className="flex gap-3 pt-2">
                                        {selectedProject.links.visit.trim() && (
                                            <LinkNext href={selectedProject.links.visit} target="_blank" className="btn-theme flex items-center gap-2 px-4 py-2">
                                                <BiLinkExternal size={18} /> Visit
                                            </LinkNext>
                                        )}
                                        {selectedProject.links.code.trim() && (
                                            <LinkNext href={selectedProject.links.code} target="_blank" className="btn-theme flex items-center gap-2 px-4 py-2">
                                                <FaGithub size={18} /> Code
                                            </LinkNext>
                                        )}
                                        {selectedProject.links.video.trim() && (
                                            <LinkNext href={selectedProject.links.video} target="_blank" className="btn-theme flex items-center gap-2 px-4 py-2">
                                                <FaVideo size={18} /> Video
                                            </LinkNext>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionWrapper>
    );
};

export default Projects;

type MouseEventHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

export const ViewAll = ({ handleClick, title, scrollTo }: { handleClick: MouseEventHandler, title: string, scrollTo: string }) => {
    return (
        <>
            <div className="bg-white dark:bg-grey-900 w-4/5 mx-auto blur-xl z-20 -translate-y-14 h-16"></div>
            <div className="text-center -translate-y-24">
                {title === 'View All' ?
                    <button onClick={handleClick} className={`btn-theme px-4 ${title === 'View All' ? 'animate-bounce' : 'animate-none'} py-1.5`}>
                        {title}
                    </button>
                    :
                    <Link
                        to={scrollTo}
                        className={`btn-theme px-4 ${title === 'View All' ? 'animate-bounce' : 'animate-none'} cursor-pointer py-1.5`}
                        offset={-60}
                        smooth={true}
                        duration={500}
                        // @ts-ignore
                        onClick={() => handleClick()}
                    >{title}</Link>
                }
            </div>
        </>
    );
};
