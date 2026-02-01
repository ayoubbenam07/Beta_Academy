import { useState } from "react";
export default function Faq(){
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);
    return(
        <div className="flex flex-col w-9/10 max-w-[900px] mx-auto mb-20 ">
            <p className="text-lg font-extrabold mb-8 text-center textLinear animation">Frequently Asked Questions</p>
            <div className="flex flex-col gap-5">
                <div className="faqCard animation">
                    <div className="flex items-center justify-between px-4 mb-2 gap-auto hover:cursor-pointer" onClick={() => setIsOpen1((prev) => !prev)}>
                        <p className="text-sm font-medium">How do I enroll in a course?</p>
                        <img src="icons\flech.svg" alt="" className={`w-5 h-5 ${(isOpen1 === true) && "rotate-180"}`}/>
                    </div>
                    <p className={isOpen1 === false ? "hidden" : "text-sm text-neutral-500 px-4"}>
                        To enroll in a course, simply browse our course catalog, select the course you're interested in, and click the 'Enroll Now' button. Follow the prompts to complete the enrollment process.
                    </p>
                </div>
                <div className="faqCard animation">
                    <div className="flex items-center justify-between px-4 mb-2 gap-auto hover:cursor-pointer" onClick={() => setIsOpen2((prev) => !prev)}>
                        <p className="text-sm font-medium">What resources are available to students?</p>
                        <img src="public\icons\flech.svg" alt="" className={`w-5 h-5 ${(isOpen2 === true) && "rotate-180"}`}/>
                    </div>
                    <p className={isOpen2 === false ? "hidden" : "text-sm text-neutral-500 px-4"}>
                        Students have access to all enrolled courses, interactive quizzes, lesson materials, and teacher feedback—all organized in one easy-to-use dashboard.
                    </p>
                </div>
                <div className="faqCard animation">
                    <div className="flex items-center justify-between px-4 mb-2 gap-auto hover:cursor-pointer" onClick={() => setIsOpen3((prev) => !prev)}>
                        <p className="text-sm font-medium">How can I contact support?</p>
                        <img src="public\icons\flech.svg" alt="" className={`w-5 h-5 ${(isOpen3 === true) && "rotate-180"}`}/>
                    </div>
                    <p className={isOpen3 === false ? "hidden" : "text-sm text-neutral-500 px-4"}>
                        You can contact our support team through the “Help” section in your dashboard or by emailing us at support@betaeducation.com . We’ll respond as soon as possible to assist you.
                    </p>
                </div>
            </div>
        </div>
    );
}