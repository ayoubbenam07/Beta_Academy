import { Link } from "react-router-dom";

export default function Cta(){
    return(
        <div className="flex flex-col items-center  w-9/10 max-w-[1400px] mx-auto">
            <p className="text-lg font-extrabold mb-2 textLinear animation">Ready to start your learning journey?</p>
            <p className="text-sm text-neutral-500 mb-10 animation">Join Beta Education today and unlock your full potential.</p>
            <Link to="/Registration"><button className="buttonBlue animation">Get Started</button></Link>
        </div>
    );
}