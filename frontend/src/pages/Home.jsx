import Navbar from "../compenents/Navbar"
import Cta from "../compenents/home/Cta"
import Hero from "../compenents/home/Hero"
import Faq from "../compenents/home/Faq"
import CoursesSection from "../compenents/home/CoursesSection"
import Testimonials from "../compenents/home/Testimonials"
import About from "../compenents/home/About"
import { useCoursesStore } from "../compenents/stores/useCoursesStore"

function Home() {
    const {student} = useCoursesStore()
    return (
        <>
        {student.isRegisterd ? 
        <Navbar  number={2}/> :
        <Navbar  number={1}/>}
        <Hero />
        <About/>
        <CoursesSection/>
        <Testimonials/>
        <Faq />
        {!student.isRegisterd && <Cta />}
        </>
    )
}

export default Home