import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Link as ScrollLink } from 'react-scroll'
import Typewriter from 'typewriter-effect';
import { IoIosArrowForward } from 'react-icons/io';
import wavingHand from '@/public/waving-hand.gif';
import { main } from '@/types/main';

interface HeroProps {
    mainData: main
}

const Hero = ({ mainData }: HeroProps) => {

    const [mounted, setMounted] = useState(false)
    const { theme } = useTheme()
    const { name, titles, heroImage, shortDesc } = mainData

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section id='home' className="relative min-h-screen w-full mx-auto overflow-hidden">

            <div className="absolute -z-10 min-h-screen h-full w-full">
                <Image
                    src={mounted && theme === 'dark' ? '/hero_background_dark.png' : '/hero_background_light.png'}
                    layout="fill"
                    objectFit="cover"
                    loading='lazy'
                    className='object-bottom'
                    quality={100} alt={''} />
            </div>

            {/* Fade to next section background — above hero image, below text/button/avatar */}
            <div
                className="absolute bottom-0 left-0 right-0 z-[1] h-[45%] min-h-[240px] pointer-events-none bg-gradient-to-t from-white to-transparent dark:from-grey-900"
                aria-hidden="true"
            />

            <div className="relative z-[2] py-16 lg:py-48 flex flex-col-reverse lg:flex-row justify-around gap-10 lg:gap-0">

                <div className="flex flex-col gap-4 md:gap-6 text-left lg:w-3/5 2xl:w-1/2 mx-4 md:mx-6 xl:mx-0">
                    <div className="flex items-center gap-1">
                        <Image unoptimized={true} alt='waving-hand' width={30} height={30} src={wavingHand} />
                        <p className="text-lg md:text-xl mt-2 md:mt-1.5">
                            Hey
                        </p>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold relative">
                        I&apos;m {name}
                    </h1>
                    <div className="flex flex-row items-start md:items-center gap-1.5">
                        <h2 className="text-lg md:text-2xl">
                            I am into
                        </h2>
                        <Typewriter
                            options={{
                                strings: titles,
                                autoStart: true,
                                loop: true,
                                deleteSpeed: 50,
                                delay: 50,
                                wrapperClassName: "text-blue-700 dark:text-blue-600 text-lg md:text-2xl font-medium",
                                cursorClassName: "text-blue-700 dark:text-blue-600 text-lg md:text-2xl"
                            }}
                        />
                    </div>

                    <p className='text-sm md:text-base text-gray-600 dark:text-gray-300 lg:w-3/5 2xl:w-1/2'>
                        {shortDesc}
                    </p>

                    {/* <a href="https://sppuprep.tech" target="_blank" rel="noopener noreferrer" className="relative whitespace-nowrap before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:origin-bottom before:scale-y-[0.35] hover:before:scale-y-100 before:transition-transform before:ease-in-out before:duration-500 before:bg-blue-300 dark:before:bg-blue-600">
                        <span className="relative">SPPU Prep</span>
                    </a> */}

                    <ScrollLink
                        className="btn-theme w-fit text-sm md:text-base py-2 px-4 cursor-pointer flex items-center gap-1 group"
                        to={'about'}
                        offset={-60}
                        smooth={true}
                        duration={500}
                        isDynamic={true}
                    >
                        About Me
                        <IoIosArrowForward className='group-hover:translate-x-1 transition-transform' />
                    </ScrollLink>
                </div>

                <div className="relative mx-auto lg:mx-0 mt-12 md:mt-16 lg:mt-0">
                    <div className="w-56 h-56 md:w-80 md:h-80 lg:-translate-x-16">
                        <Image alt='avatar' width={1000} height={1000} className="rounded-full w-full h-full object-cover" src={heroImage} />
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Hero