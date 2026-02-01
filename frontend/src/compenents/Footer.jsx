import { Link } from "react-router-dom";

export default function Footer(){
    return (
        <div className="rounded-[50px] md:rounded-[100px] bg-white relative -top-20 z-10">
            <div className="w-9/10 max-w-[800px] mx-auto flex flex-col gap-10 pt-15 md:pt-20">
                <div className="flex md:flex-row flex-col gap-10 items-center justify-between">
                    <Link to="/"><p className="text-md text-neutral-400 textHover">Home</p></Link>
                    <Link to="/Courses"><p className="text-md text-neutral-400 textHover">Courses</p></Link>
                    <p className="text-md text-neutral-400 textHover">Contact</p>
                </div>
                <div className="flex items-center justify-center gap-10 mb-5">
                    <img src="icons\fb.svg" alt="" className="w-6"/>
                    <img src="icons\tw.svg" alt="" className="w-6"/>
                    <img src="icons\in.svg" alt="" className="w-6"/>
                    <img src="icons\li.svg" alt="" className="w-6"/>
                </div>
                <p className="text-md text-neutral-400 text-center mb-0">© 2025 Beta. All rights reserved.</p>
            </div>
        </div>
    );
}