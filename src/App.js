import React, { useState, useEffect } from 'react';

export default function App() {
	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [scoreHistory, setScoreHistory] = useState([]);

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    if (currentQuestion === questions.length - 1) {
      setIsFinished(true);
      return;
    }
    setCurrentQuestion(currentQuestion + 1);
  }

  useEffect(() => {
    if (isFinished) {
      setScoreHistory([...scoreHistory, score]);
    }
  }, [isFinished])

  const handleResetButton = () => {
    setCurrentQuestion(0);
    setIsFinished(false);
    setScore(0);
  }

	return (
		<div className='app'>
      {isFinished ? (
        <div className='score-section'>
          <p>You scored {score} out of {questions.length}</p>
          <p className='previousScore'>Previous score : {scoreHistory.length > 1 ? scoreHistory[scoreHistory.length - 2] : 'None'}</p>
          <button onClick={handleResetButton}>Reset</button>
        </div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
                <span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption, idx) => {
                return <button key={idx} onClick={() => handleAnswerClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
            })}
					</div>
				</>
			)}
		</div>
	);
}
