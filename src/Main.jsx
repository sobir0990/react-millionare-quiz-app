import './App.css';
import React, {useState, useEffect} from 'react';
import Trivia from './components/Trivia';
import Timer from './components/Timer';
import Start from './components/Start';

function Main() {

    const [username, setUsername] = useState(null);
    const [questionNumber, setQuestionNumber] = useState(1);
    const [stop, setStop] = useState(false);
    const [earned, setEarned] = useState("$ 0");

    const data = [
        {
            id: 1,
            question: "Rolex - bu qaysi turdagi mahsulotlarga ixtisoslashgan kompaniya?",
            answers: [
                {
                    text: "Telefon",
                    correct: false,
                },
                {
                    text: "Soat",
                    correct: true,
                },
                {
                    text: "Ovqat",
                    correct: false,
                },
                {
                    text: "Kosmetika",
                    correct: false,
                },
            ],
        },

        {
            id: 2,
            question: "Facebook sayti qachon ochilgan?",
            answers: [
                {
                    text: "2004",
                    correct: true,
                },
                {
                    text: "2005",
                    correct: false,
                },
                {
                    text: "2006",
                    correct: false,
                },
                {
                    text: "2007",
                    correct: false,
                },
            ],
        },
        {
            id: 3,
            question: "Merining otasining beshta qizi bor. Ularning ismlari Chacha, Cheche, Chichi, Chocho… Beshinchi qizining ismi nima bo’lishi mumkin?",
            answers: [
                {
                    text: "Cheche",
                    correct: false,
                },
                {
                    text: "Chichi",
                    correct: false,
                },
                {
                    text: "Chacha",
                    correct: false,
                },
                {
                    text: "Albatta Meri",
                    correct: true,
                },
            ],
        },
        {
            id: 4,
            question: "Kichkina, kulranggina, filga o’xshaydi.",
            answers: [
                {
                    text: "Bulut",
                    correct: false,
                },
                {
                    text: "Filning bolasi.",
                    correct: true,
                },
                {
                    text: "Begemot",
                    correct: false,
                },
                {
                    text: "Delfin",
                    correct: false,
                },
            ],
        },
        {
            id: 5,
            question: "Undan qanchalik ko’p olaversangiz, u shunchalik kattalashib boraveradi. U nima?",
            answers: [
                {
                    text: "Tog'",
                    correct: false,
                },
                {
                    text: "Chuqur",
                    correct: true,
                },
                {
                    text: "Suv",
                    correct: false,
                },
                {
                    text: "G'or",
                    correct: false,
                },
            ],
        },
        {
            id: 6,
            question: "Daraxtning shoxida qarg’a o’tiribdi. Qarg’ani cho’chitib yubormasdan shoxni arralash uchun nima qilish kerak?",
            answers: [
                {
                    text: "Qarg’ani uchirib yuborish",
                    correct: false,
                },
                {
                    text: "Qarg’aning o’zi uchib ketishini kutish",
                    correct: true,
                },
                {
                    text: "Qarg'ani o\'ldirish kerak",
                    correct: false,
                },
                {
                    text: "Daraxtni arralash kerak",
                    correct: false,
                },
            ],
        },
        {
            id: 7,
            question: "Kishiga uch marta beriladi: birinchi ikki marta bepul, ammo uchinchi marta yoki undan keyin pul to’lash kerak bo’ladi. U nima?",
            answers: [
                {
                    text: "Hotin",
                    correct: false,
                },
                {
                    text: "Tishlar",
                    correct: true,
                },
                {
                    text: "Mashina",
                    correct: false,
                },
                {
                    text: "Uy",
                    correct: false,
                },
            ],
        },
        {
            id: 7,
            question: "Qaysi yegulikni pishirishda qancha tuz solsa ham, u sho’r bo’lib ketmaydi?",
            answers: [
                {
                    text: "Tuxum",
                    correct: false,
                },
                {
                    text: "Qaynatilgan tuxumni.",
                    correct: true,
                },
                {
                    text: "Kartoshka",
                    correct: false,
                },
                {
                    text: "Guruch",
                    correct: false,
                },
            ],
        },
        {
            id: 8,
            question: "Bir kishi olmalarni 500 so’mdan sotib olib, ularni 300 so’mdan sotardi.\n" +
                "Bir muncha vaqt o’tgach, u kishi millionerga aylandi. Buning sababi nimada?",
            answers: [
                {
                    text: "Kop olma sotgan",
                    correct: false,
                },
                {
                    text: "U odam dastavval milliarder bo’lgan.",
                    correct: true,
                },
                {
                    text: "Olma zavodi bolgan",
                    correct: false,
                },
                {
                    text: "Olma eksport qilgan",
                    correct: false,
                },
            ],
        },

    ];

    const moneyPyramid = [
        {id: 1, amount: "$ 100"},
        {id: 2, amount: "$ 200"},
        {id: 3, amount: "$ 300"},
        {id: 4, amount: "$ 500"},
        {id: 5, amount: "$ 1.000"},
        {id: 6, amount: "$ 2.000"},
        {id: 7, amount: "$ 4.000"},
        {id: 8, amount: "$ 8.000"},
        {id: 9, amount: "$ 16.000"},
        {id: 10, amount: "$ 32.000"},
        {id: 11, amount: "$ 64.000"},
        {id: 12, amount: "$ 125.000"},
        {id: 13, amount: "$ 250.000"},
        {id: 14, amount: "$ 500.000"},
        {id: 15, amount: "$ 1.000.000"},
    ].reverse();

    useEffect(() => {
        questionNumber > 1 && setEarned(moneyPyramid.find(m => m.id === questionNumber - 1).amount)
    }, [moneyPyramid, questionNumber]);

    return (
        <div className="app">
            {username ? (
                <>
                    <div className="main">
                        {stop ? <h1 className='endText'>Hurmatli {username} siz {earned} qolga kiritdingiz</h1> : (
                            <>
                                <div className="top">
                                    <div className="timer"><Timer setStop={setStop} questionNumber={questionNumber}/>
                                    </div>
                                </div>
                                <div className="bottom">
                                    {
                                        questionNumber === data.length + 1 ? setStop(true) : (
                                            <Trivia
                                                data={data}
                                                setStop={setStop}
                                                questionNumber={questionNumber}
                                                setQuestionNumber={setQuestionNumber}
                                            />
                                        )
                                    }

                                </div>
                            </>
                        )}

                    </div>
                    <div className="pyramid">
                        <ul className="moneyList">
                            {moneyPyramid.map((m) => (
                                <li key={m.id}
                                    className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
                                    <span className='moneyListItemNumber'>{m.id}</span>
                                    <span className='moneyListItemNumber'>{m.amount}</span>
                                </li>
                            ))}


                        </ul>
                    </div>
                </>
            ) : <Start setUsername={setUsername}/>}


        </div>
    );
}

export default Main;
