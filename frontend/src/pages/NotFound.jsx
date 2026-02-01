import Navbar from "../compenents/Navbar";
import { Link } from "react-router-dom";
export default function NotFound() {
    return (
        <>
            <Navbar />
            <div class="flex flex-col items-center max-w-[1400px] w-9/10 mx-auto mt-20">
                <div class="flex max-w-4xl flex-col items-center text-center">
                    <img src="../../public/images/NotFound.png" alt="" className="md:w-64 w-48 md:h-64 h-48 rounded-xl mb-5" />
                    <p class="font-extrabold text-xl">Oops! Page Not Found</p>
                    <p class="text-md mb-10">We can't seem to find the page you're looking for. It might have been moved, deleted, or perhaps you've discovered a new corner of our universe!</p>
                    <Link to="/"><button class="buttonBlue">Return to Homepage</button></Link>
                </div>
            </div>
        </>
    );
}


