import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../Navbar";

import { useCoursesStore } from "../stores/useCoursesStore";
export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState({});
    const [showResults, setShowResults] = useState(false);
    const { saveQuizAttempt } = useCoursesStore();
    const location = useLocation();
    const quizData = location.state?.quizData || [];
    const quizId = location.state?.quizId;
    const enrollmentId = location.state?.enrollmentId;
    const lessonId = location.state?.lessonId;

    const QuizName = location.state?.quizName || "Quiz";

    const handleAnswerClick = (index) => {
        const isCorrect = index === quizData[currentQuestion - 1].correct;

        setAnsweredQuestions(prev => ({
            ...prev,
            [currentQuestion]: {
                selected: index,
                correct: quizData[currentQuestion - 1].correct,
                isCorrect: isCorrect
            }
        }));

        if (isCorrect && !answeredQuestions[currentQuestion]) {
            setScore(prev => prev + 1);
        } else if (!isCorrect && answeredQuestions[currentQuestion]?.isCorrect) {
            setScore(prev => prev - 1);
        } else if (isCorrect && answeredQuestions[currentQuestion] && !answeredQuestions[currentQuestion].isCorrect) {
            setScore(prev => prev + 1);
        }
    };

    const handleFinishQuiz = async () => {
        setShowResults(true);
        if (enrollmentId && quizId) {
            const passed = score / quizData.length >= 0.7; // Standard passing score
            await saveQuizAttempt(enrollmentId, {
                quizId: quizId,
                score: score,
                passed: passed,
                timeTakenSeconds: 0, // Could be tracked
                answers: Object.keys(answeredQuestions).map(k => ({
                    questionIndex: parseInt(k) - 1,
                    userAnswer: answeredQuestions[k].selected,
                    isCorrect: answeredQuestions[k].isCorrect
                }))
            });
        }
    };

    const isQuestionAnswered = () => {
        return answeredQuestions[currentQuestion] !== undefined;
    };

    const allQuestionsAnswered = () => {
        return Object.keys(answeredQuestions).length === quizData.length;
    };

    if (showResults) {
        return (
            <>
                <Navbar number={2} />
                <div className="flex flex-col md:w-9/12 w-full max-w-[1400px] mx-auto gap-6 mt-20 p-8 bg-white rounded-4xl border-2 border-neutral-300">
                    <h2 className="text-3xl font-bold text-center text-Hprimary">Quiz Complete!</h2>
                    <div className="text-center">
                        <p className="text-6xl font-bold text-Hprimary mb-2">{score}/{quizData.length}</p>
                        <p className="text-xl text-gray-600">Your Score</p>
                    </div>
                    <div className="space-y-4 mt-6">
                        <p className="text-lg font-semibold">Review Answers:</p>
                        {quizData.map((q, qIndex) => {
                            const userAnswer = answeredQuestions[qIndex + 1];
                            return (
                                <div key={qIndex} className="border rounded-lg p-4">
                                    <p className="font-semibold mb-2">
                                        {qIndex + 1}. {q.question}
                                    </p>
                                    <div className="space-y-1">
                                        {q.options.map((option, oIndex) => {
                                            const isCorrect = oIndex === q.correct;
                                            const isSelected = userAnswer?.selected === oIndex;
                                            return (
                                                <div
                                                    key={oIndex}
                                                    className={`p-2 rounded ${isCorrect ? 'bg-green-100 text-green-500' :
                                                            isSelected ? 'bg-red-100 text-red-500' :
                                                                'bg-gray-50'
                                                        }`}
                                                >
                                                    {option}
                                                    {isCorrect && ' ✓'}
                                                    {isSelected && !isCorrect && ' ✗'}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
                <Link to="/" className="mx-auto mt-4"><button className={"buttonBlue"}>Go to home</button></Link>
            </>
        );
    }

    return (
        <>
            <Navbar number={2} />
            <div className="flex flex-col md:w-9/12 w-full max-w-[1400px] mx-auto gap-4 mt-20 bg-white p-10 rounded-4xl border-2 border-neutral-300">
                <p className="text-lg text-Hprimary font-bold">
                    Quizzes / <span className="text-neutral-600">{QuizName}</span>
                </p>

                <div className="flex justify-between items-center">
                    <p className="text-md font-medium">
                        Question {currentQuestion} of {quizData.length}
                    </p>
                </div>

                <div className="w-full h-2 bg-neutral-300 rounded-full relative">
                    <div
                        style={{ width: `${(currentQuestion / quizData.length) * 100}%` }}
                        className="h-2 bg-Hprimary rounded-full absolute top-0 left-0 transition-all duration-300"
                    />
                </div>

                <div className="mt-6">
                    <p className="text-lg font-medium mb-6">
                        {quizData[currentQuestion - 1].question}
                    </p>

                    <div className="space-y-3">
                        {quizData[currentQuestion - 1].options.map((option, index) => {
                            const isSelected = answeredQuestions[currentQuestion]?.selected === index;
                            return (
                                <div
                                    onClick={() => handleAnswerClick(index)}
                                    key={index}
                                    className={`border-2 rounded-xl py-4 px-8 cursor-pointer transition-all duration-200 ${isSelected
                                            ? 'border-Hprimary bg-Hprimary text-white'
                                            : 'border-neutral-300 hover:bg-[#143c9420] hover:border-Hprimary'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">{option}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {!isQuestionAnswered() && (
                    <p className="text-sm text-gray-500 text-center mt-2">
                        Please select an answer to continue
                    </p>
                )}
                <div className="flex justify-between mt-8">
                    <button
                        className={
                            currentQuestion === 1
                                ? 'invisible'
                                : "buttonGrey"
                        }
                        onClick={() => setCurrentQuestion(prev => prev - 1)}
                        disabled={currentQuestion === 1}
                    >
                        Previous
                    </button>

                    {currentQuestion === quizData.length ? (
                        <button
                            className={
                                allQuestionsAnswered()
                                    ? 'buttonGreen'
                                    : 'buttonGrey'
                            }
                            onClick={handleFinishQuiz}
                            disabled={!allQuestionsAnswered()}
                        >
                            Finish Quiz
                        </button>
                    ) : (
                        <button
                            className="buttonBlue"
                            onClick={() => setCurrentQuestion(prev => prev + 1)}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}