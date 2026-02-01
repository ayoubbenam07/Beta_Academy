import { useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
export default function Analytics({course, id}){
    const [isOpen, setIsOpen] = useState(false);
    const grades = course.lessons
    .flatMap(lesson => lesson.quizzes)
    .map(quiz => quiz.score * 100); 
    const labels = grades.map((_, index) => `Quiz ${index + 1}`);
    return(
        <div className="flex flex-col gap-10 w-full max-w-[1400px] mx-auto py-4 px-6 border-2 border-neutral-300 rounded-4xl hover:transform hover:scale-101 transition-transform duration-300 hover:border-Hprimary ">
            <div className="flex justify-between gap-5 cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
                <div>
                <p className="text-md font-medium"><span className="text-Hprimary">Course{id+1} Analytics:</span> {course.name}</p>
                <p className="text-sm text-neutral-400 mb-2">{}</p>
                </div>
                <img src="icons\flech.svg" alt="" className={(isOpen) ? "rotate-180 w-10  transform transition-transform duration-300" : "w-10  transform transition-transform duration-300" }/>
            </div>
            <div className={!isOpen && "hidden"}>
                <div className="flex flex-col gap-10">
                <div>
                    <p className="text-md font-medium mb-2">Course Progress</p>
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-neutral-400">Overall Progress</p>
                        <p className="text-sm font-medium text-neutral-400">{course.overallProgress * 100}%</p>
                    </div>
                    <div className="w-full h-3 bg-neutral-300 rounded-full relative self-center mt-1">
                    <div 
                        style={{width: `${(course.overallProgress) * 100}%`}} 
                        className="h-3 bg-Hprimary rounded-full absolute top-0 left-0 transition-all duration-300"
                    />
                    </div>
                </div>
                
                <div className="flex flex-col mb-10">
                <p className="text-md font-medium">Quizzes Grades</p>
                <div className="md:w-8/10 w-full mx-auto">
                    <Bar data={{
                        labels: labels,
                        datasets: [
                            {
                                label: "Quiz",
                                data: grades,
                                backgroundColor: ["oklch(55.8% 0.288 302.321)"],
                            }
                        ],
                    
                    }}/>
                </div>
                </div>
            </div>
            </div>
        </div>
    );
}