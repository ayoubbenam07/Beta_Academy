import { useState, useEffect } from "react";
export default function Testimonials(){
    const [index, setIndex] = useState(0);
    useEffect(() => {
    const interval = setInterval(() => {
    setIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
    }, []);
    let testimonials = [{p : "Beta Education has transformed my learning experience. The courses are engaging, and the instructors are incredibly supportive.", s : "Sarah Miller, Data Science Student"}, 
        {p : "I've gained valuable skills and knowledge through Beta Education. The platform is user-friendly and offers a wide range of resources.", s : "David Chen, Calculus Student"},
        {p : "The community aspect of Beta Education is fantastic. I've connected with fellow students and learned so much from their experiences.", s : "Emily Rodriguez, Creative Writing Student"},
    ]
    return(
        <div className="flex flex-col items-center  w-9/10 max-w-[800px] mx-auto mb-20 ">
            <p className="text-lg font-extrabold mb-10 textLinear animation">Student Testimonials</p>
            <p className="text-md text-neutral-800 mb-4 text-center max-w-[800px] animation"><span className="text-2xl">“</span>{testimonials[index].p}<span className="text-2xl">“</span></p>
            <p className="text-md text-[#143D94] mb-10 animation">{testimonials[index].s}</p>
        </div>
    );
}