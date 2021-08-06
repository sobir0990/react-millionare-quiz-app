import React, {useState, useEffect} from 'react';
import play from '../sounds/play.mp3';
import correct from '../sounds/correct.mp3';
import wait from '../sounds/wait.mp3';
import wrong from '../sounds/wrong.mp3';
import useSound from "use-sound";

export default function Trivia({
                                   data,
                                   setStop,
                                   questionNumber,
                                   setQuestionNumber
                               }) {

    const [question, setQuestion] = useState(null);
    const [selectAnswer, setSelectAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [letsWait] = useSound(wait);
    const [wrongAnswer] = useSound(wrong);

    useEffect(() => {
        letsPlay()
    }, [letsPlay]);


    useEffect(() => {
        setQuestion(data[questionNumber - 1])
    }, [data, questionNumber]);


    const delay  = (duration, callback) => {
        setTimeout(() => {
            callback()
        }, duration)
    };

    const handleClickTest = (a) => {
        console.log('handleClick', a);
        setSelectAnswer(a);
        setClassName("answer active");
        setTimeout(() => {
            console.log('a.correct', a.correct);
            setClassName(a.correct ? "answer correct" : "answer wrong")
        }, 3000)
    };


    const handleClick = (a) => {
        setSelectAnswer(a);
        setClassName("answer active");
        delay(3000, () => setClassName(a.correct ? "answer correct" : "answer wrong"));
        delay(6000, () => {
            if (a.correct) {
                    correctAnswer();
                    setQuestionNumber((prev) => prev + 1);
                    setSelectAnswer(null);
            } else {
                wrongAnswer();
                    setStop(true)
            }
        })
    };

    return (
        <div className='trivia'>
            <div className="question">{question?.question}</div>
            <div className="answers">
                {
                    question?.answers.map((a) => (
                        <div key={a.id} className={selectAnswer === a ? className : "answer"}
                             onClick={() => handleClick(a)}>{a.text}</div>
                    ))
                }
            </div>
        </div>
    )
}

