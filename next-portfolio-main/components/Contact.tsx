import SectionWrapper from "./SectionWrapper"
import Link from "next/link";

const Contact = () => {
    return (
        <SectionWrapper id="contact" className="mb-16 mx-4 lg:mx-0">
            <h2 className="text-center text-4xl">Contact Me</h2>

            <div className="w-full lg:w-5/6 2xl:w-3/4 mt-10 md:mt-16 mx-auto rounded-xl">
                <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-2xl">Get in touch</h3>
                    <p className="text-gray-400 mb-6 text-base md:text-lg leading-relaxed max-w-lg mx-auto">Feel free to reach out</p>

                    <div className="flex flex-col gap-4 w-full">
                        <Link
                            href="https://linkedin.com/in/arthurdelossantos"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-theme contact-btn w-full py-3.5 px-5 text-center"
                        >
                            LinkedIn
                        </Link>
                        <a
                            href="mailto:adls@mit.edu"
                            className="btn-theme contact-btn w-full py-3.5 px-5 text-center"
                        >
                            adls@mit.edu
                        </a>
                        <a
                            href="mailto:arthurdls04@gmail.com"
                            className="btn-theme contact-btn w-full py-3.5 px-5 text-center"
                        >
                            arthurdls04@gmail.com
                        </a>
                    </div>

                    {/* <form onSubmit={handleSubmit} className="text-left flex flex-col gap-4 rounded-xl">
                        <input onChange={handleChange} required value={values.name} name="name" type="text" placeholder='Full Name *' className="outline-none bg-gray-100 dark:bg-grey-800 placeholder-gray-400 rounded-lg py-3 px-4" />
                        <input onChange={handleChange} required value={values.email} name="email" type="email" placeholder='Email *' className="outline-none bg-gray-100 dark:bg-grey-800 placeholder-gray-400 rounded-lg py-3 px-4" />
                        <textarea onChange={handleChange} required value={values.message} name="message" rows={4} placeholder='Message *' className="outline-none resize-none bg-gray-100 dark:bg-grey-800 placeholder-gray-400 rounded-lg py-3 px-4" />
                        <button disabled={loading} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded-lg disabled:cursor-not-allowed self-end">
                            {loading ? <span className="flex items-center gap-2">Submitting <BiLoaderAlt className="animate-spin" /></span> : "Submit"}
                        </button>
                    </form> */}
                </div>
            </div>
        </SectionWrapper >
    )
}

export default Contact
