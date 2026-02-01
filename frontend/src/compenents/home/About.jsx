export default function About(){
    return(
        <div className="flex flex-col items-start w-9/10 max-w-[900px] mx-auto mb-40 ">
            <p className="text-lg font-extrabold mb-2 self-center textLinear animation">Unlock Your Potential with Beta</p>
            <p className="text-md text-neutral-500 mb-10 animation">Novexa provides a comprehensive learning experience tailored to your needs, ensuring you gain the skills and knowledge necessary for success in today's dynamic world.</p>
            <div className="flex md:flex-row flex-col flex-wrap gap-4 justify-between self-center ">
                <div className="featureCard animation">
                    <img src="icons\1.svg" alt="" className="w-10 h-10"/>
                    <p className="text-md font-bold">Expert Instructors</p>
                    <p className="text-sm text-neutral-500">Learn from industry-leading experts who bring real-world experience to the classroom.</p>
                </div>
                <div className="featureCard animation">
                    <img src="icons\2.svg" alt="" className="w-10 h-10"/>
                    <p className="text-md font-bold">Interactive Learning</p>
                    <p className="text-sm text-neutral-500">Engage with dynamic content, hands-on projects, and collaborative activities.</p>
                </div>
                <div className="featureCard animation">
                    <img src="icons\3.svg" alt="" className="w-10 h-10"/>
                    <p className="text-md font-bold">Community Support</p>
                    <p className="text-sm text-neutral-500">Connect with a vibrant community of learners and instructors for support and networking.</p>
                </div>
                <div className="featureCard animation">
                    <img src="icons\4.svg" alt="" className="w-10 h-10"/>
                    <p className="text-md font-bold">Global Reach</p>
                    <p className="text-sm text-neutral-500">Access courses from anywhere in the world, expanding your horizons and opportunities.</p>
                </div>
            </div>
        </div>
    );
}