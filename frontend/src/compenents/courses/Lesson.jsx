import { useState } from "react";
import { Link } from 'react-router-dom';

export default function Lesson({ lessonData, enrollmentId }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex flex-col gap-10 w-full max-w-[1400px] mx-auto py-4 px-6 border-2 border-neutral-300 rounded-4xl hover:transform hover:scale-101 transition-transform duration-300 hover:border-Hprimary ">
            <div className="flex justify-between gap-5 cursor-pointer" onClick={() => setIsOpen((prev) => !prev)}>
                <div>
                    <p className="text-md font-medium"><span className="text-primary">Lesson {lessonData.id}:</span> {lessonData.title}</p>
                    <p className="text-sm text-neutral-400 mb-2">{lessonData.titleDescription}</p>
                </div>
                <img src="icons\flech.svg" alt="" className={(isOpen) ? "rotate-180 w-10  transform transition-transform duration-300" : "w-10  transform transition-transform duration-300"} />
            </div>
            <div className={!isOpen && "hidden"}>
                <div className="w-full md:h-[80vh] h-[40vh] bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-10">

                </div>
                <div>
                    <p className="text-md font-medium">Module Description</p>
                    <p className="text-sm">{lessonData.moduleDescription}</p>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-md font-medium">Course Progress</p>
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-neutral-400">Overall Progress</p>
                        <p className="text-sm font-medium text-neutral-400">{lessonData.progress * 100}%</p>
                    </div>
                    <div className="w-full h-3 bg-neutral-300 rounded-full relative self-center">
                        <div
                            style={{ width: `${(lessonData.progress) * 100}%` }}
                            className="h-3 bg-Hprimary rounded-full absolute top-0 left-0 transition-all duration-300"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-md font-medium">Resources</p>
                    {lessonData.resources.map((resource) => (
                        <div key={resource.id} className="flex gap-4 items-center">
                            <div className="ml-4 md:p-4 p-2 rounded-lg bg-neutral-200 flex justify-center items-center">
                                <img src="icons/download.svg" alt="Download icon" className="w-5 h-5" />
                            </div>
                            <a
                                href={resource.url}
                                download
                                className="text-sm font-medium hover:text-Hprimary hover:cursor-pointer"
                            >
                                Download: {resource.name}
                            </a>
                        </div>
                    ))}
                    {lessonData.extraResources.map((extraResource) => (
                        <div key={extraResource.id} className="flex gap-4 items-center">
                            <div className="ml-4 md:p-4 p-2 rounded-lg bg-neutral-200 flex justify-center items-center">
                                <img src="icons/link.svg" alt="Download icon" className="w-5 h-5" />
                            </div>
                            <a
                                href={extraResource.url}
                                download
                                className="text-sm font-medium hover:text-Hprimary hover:cursor-pointer"
                            >
                                Link: {extraResource.name}
                            </a>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-3">
                    <p className="text-md font-medium">Lesson Quiz</p>
                    {lessonData.quizzes.map((quiz) => (
                        <div key={quiz.id} className="flex gap-4 items-center">
                            <div className="ml-4 md:p-4 p-2 rounded-lg bg-neutral-200 flex justify-center items-center">
                                <img src="icons/quiz.svg" alt="" className="w-5 h-5" />
                            </div>
                            <Link
                                to="/Quiz"
                                state={{
                                    quizData: quiz.questions,
                                    quizId: quiz.id,
                                    lessonId: lessonData.dbId,
                                    enrollmentId: enrollmentId
                                }}
                                className="text-sm font-medium hover:text-Hprimary hover:cursor-pointer bg-transparent border-none text-left"
                            >
                                {quiz.quizName}
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <p className="text-md font-medium mb-4">Reviews</p>
                    <div className="flex gap-10">
                        <div className="flex flex-col">
                            <p className="text-xl font-bold">{lessonData.reviews.averageRating}</p>
                            <div className="flex gap-2 mb-4">
                                {[1, 2, 3, 4, 5].map((num) => (
                                    <img
                                        key={num}
                                        src={
                                            lessonData.reviews.averageRating >= num
                                                ? "/public/icons/blackStar.svg"
                                                : "/public/icons/whiteStar.svg"
                                        }
                                        alt="star"
                                        className="w-8"
                                    />
                                ))}
                            </div>
                            <p className="text-sm font-medium">{lessonData.reviews.totalReviews} reviews</p>
                        </div>
                        <div className="flex flex-col gap-4 w-1/2">
                            {
                                lessonData.reviews.ratings.map((rate, index) =>
                                (
                                    <div className="flex gap-4">
                                        <p className="text-sm font-medium">{5 - index}</p>
                                        <div className="w-full h-3 bg-neutral-300 rounded-full relative self-center">
                                            <div
                                                style={{ width: `${(rate / lessonData.reviews.totalReviews) * 100}%` }}
                                                className="h-3 bg-Hprimary rounded-full absolute top-0 left-0 transition-all duration-300"
                                            />
                                        </div>
                                        <p className="text-sm font-medium text-neutral-400">{Math.floor(rate / lessonData.reviews.totalReviews * 100) < 10 ? ("0" + Math.floor(rate / lessonData.reviews.totalReviews * 100)) : Math.floor(rate / lessonData.reviews.totalReviews * 100)}%</p>
                                    </div>
                                )
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-md font-medium mb-4">Comments</p>
                    {lessonData.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4 items-center">
                            <div className="ml-4 flex justify-center items-center">
                                <img src={comment.profile} alt="Download icon" className="w-12" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">{comment.author}</p>
                                <p className="text-sm">{comment.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}