import { project } from "@/types/main";
import { useMemo, useState } from "react";
import { Link } from "react-scroll";
import SectionWrapper from "../SectionWrapper";
import ProjectCard from "./ProjectCard";

interface Props {
    projectsData: project[]
}

const Projects = ({ projectsData }: Props) => {

    const [projects] = useState([...projectsData].reverse());
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedKeywords, setSelectedKeywords] = useState<Set<string>>(new Set());

    const filterKeywords = useMemo(
        () => [...new Set(projects.flatMap((p) => p.keywords))].sort((a, b) => a.localeCompare(b)),
        [projects]
    );

    const filteredProjects = useMemo(() => {
        let result = projects;

        if (searchQuery.trim()) {
            const q = searchQuery.trim().toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(q) ||
                    p.techstack.toLowerCase().includes(q) ||
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
                            className={`p-1.5 md:p-2 text-sm md:text-base rounded-md cursor-pointer transition-all ${
                                selectedKeywords.has(keyword)
                                    ? "bg-blue-600 text-white"
                                    : "bg-white dark:bg-grey-800 hover:bg-gray-100 hover:dark:bg-grey-900"
                            }`}
                        >
                            {keyword}
                        </button>
                    ))}
                </div>
            </div>

            <div className="md:mx-6 lg:mx-auto lg:w-5/6 2xl:w-3/4 my-4 md:my-8 mx-auto grid md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
                {filteredProjects.map((p: project) => (
                    <ProjectCard key={p.name} {...p} />
                ))}
            </div>
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
                    <button onClick={handleClick} className={`bg-blue-600 text-white px-4 ${title === 'View All' ? 'animate-bounce' : 'animate-none'} py-1.5 rounded-md hover:shadow-xl transition-all`}>
                        {title}
                    </button>
                    :
                    <Link
                        to={scrollTo}
                        className={`bg-blue-600 text-white px-4 ${title === 'View All' ? 'animate-bounce' : 'animate-none'} cursor-pointer py-1.5 rounded-md hover:shadow-xl transition-all`}
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
