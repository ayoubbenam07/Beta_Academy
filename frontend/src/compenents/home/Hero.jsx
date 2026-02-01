import { Link } from "react-router-dom";
export default function Hero(){
    return(
        <div className="bg-gradient-to-b from-[#DAE6FF]/60 to-[#ffffff]/100">
            <div className="flex flex-col justify-end h-[80vh] w-9/10 max-w-[950px] mx-auto">
                <p className="text-xl font-extrabold mb-2 textLinear">Empowering Educators, Inspiring Learners</p>
                <p className="text-md text-neutral-500 mb-10">Beta Education provides innovative tools and resources to enhance teaching and learning experiences. Join our community of passionate educators and students.</p>
                <Link to="/Courses"><button className="buttonBlue w-fit md:ml-30 ml-10 md:mb-20 mb-10">Explore Courses</button></Link>
            </div>
        </div>
    );
}