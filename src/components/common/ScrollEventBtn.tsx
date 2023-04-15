import { Link } from "react-scroll";

export default function ScrollEventBtn() {
    return (
        <>
            <section className="text-gray-400 body-font">
                <div className="fixed z-30 right-0 bottom-0 w-20 h-20">
                    <Link
                        className="shadow-xl cursor-pointer"
                        activeClass="active"
                        to="section1"
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={700}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 bg-white rounded-full hover:text-gray-800">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm.53 5.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72v5.69a.75.75 0 001.5 0v-5.69l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </section>
        </>
    )
}