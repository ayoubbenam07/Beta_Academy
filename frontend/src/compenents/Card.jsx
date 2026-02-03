import { useNavigate } from "react-router-dom";
import { BookOpen } from 'lucide-react';
import { useCoursesStore } from "./stores/useCoursesStore";

export default function Card({ course }) {
    const navigate = useNavigate();
    const { student } = useCoursesStore();

    const { name, description, image, price } = course
    const isRegisterd = false
    const profname = course.expertProfile.name
    const averageRating = course.reviews.averageRating

    const handlePaymentClick = (e) => {
        e.stopPropagation();
        navigate("/Payment", { state: course });
    };

    const handleContinueClick = (e) => {
        e.stopPropagation();
        navigate("/Course", { state: course });
    };

    const handleCardClick = (e, course) => {
        (course.isRegisterd) ?
            navigate("/Course", { state: course })
            :
            navigate("/PreviewCourse", { state: course })
    };

    return (
        <div onClick={(e) => handleCardClick(e, course)} className=" bg-white border border-neutral-300 overflow-hidden rounded-xl max-w-[320px] hover:transform hover:scale-103 transition-transform duration-300 hover:border-[#143D94]">
            <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <BookOpen className="w-16 h-16 text-white opacity-50" />
            </div>
            <div className="flex flex-col items-start gap-1 justify-between p-6">
                <p className="text-md font-medium">{name}</p>
                <p className="text-sm font-medium text-green-300">{profname}</p>
                <p className="text-sm text-neutral-500">{description}</p>
                <div className="flex mt-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                        <img
                            key={num}
                            src={
                                averageRating >= num
                                    ? "icons/blackStar.svg"
                                    : "icons/whiteStar.svg"
                            }
                            alt="star"
                            className="w-6"
                        />
                    ))}
                </div>
                {!isRegisterd &&
                    <div>
                        <p className="text-md font-bold text-neutral-700">{price}</p>
                        <button
                            onClick={handlePaymentClick}
                            disabled={!student.isRegisterd}
                            className={`py-2 px-8 rounded-xl text-sm font-medium mt-2 ${student.isRegisterd
                                    ? "text-white bg-primary hover:bg-Hprimary cursor-pointer"
                                    : "text-gray-500 bg-gray-200 cursor-not-allowed"
                                }`}
                        >
                            {student.isRegisterd ? "Register" : "Sign in to Register"}
                        </button>
                    </div>
                }
                {isRegisterd &&
                    <button onClick={handleContinueClick} className="text-white bg-primary hover:bg-Hprimary py-2 px-8 rounded-xl text-sm cursor-pointer font-medium mt-6">Complete course</button>
                }
            </div>
        </div>
    );
}