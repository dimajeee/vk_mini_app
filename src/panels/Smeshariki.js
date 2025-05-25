import { Panel, PanelHeader, Button, Div, Group, Header, Progress } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import questions from '../assets/smeshariki/questions';
import results from '../assets/smeshariki/results';

export const Smeshariki = ({ id }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const calculateResult = (answers) => {
    const stats = {};
    answers.forEach(char => (stats[char] = (stats[char] || 0) + 1));
    return Object.keys(stats).reduce((a, b) => (stats[a] > stats[b] ? a : b));
  };

  const handleAnswer = (character) => {
    const newAnswers = [...answers, character];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const result = calculateResult(newAnswers);
      const { description, memeText } = results[result];
      alert(`🎉 Ты - ${result}!\n\n${description}\n\n«${memeText}»`);
      
      // Сброс теста
      setTimeout(() => {
        setCurrentQuestion(0);
        setAnswers([]);
      }, 1000);
    }
  };

  return (
    <Panel id={id}>
      <PanelHeader>Какой ты Смешарик?</PanelHeader>
      <Group header={<Header size="s">Вопрос {currentQuestion + 1} из {questions.length}</Header>}>
        <Div>
          <Progress value={(currentQuestion / questions.length) * 100} style={{ marginBottom: 15 }} />
          <h3 style={{ marginBottom: 20 }}>{questions[currentQuestion].text}</h3>
          
          {questions[currentQuestion].options.map((option, idx) => (
            <Button
              key={idx}
              stretched
              size="l"
              mode="secondary"
              style={{ marginTop: 10 }}
              onClick={() => handleAnswer(option.character)}
            >
              {option.text}
            </Button>
          ))}
        </Div>
      </Group>
    </Panel>
  );
};

Smeshariki.propTypes = {
  id: PropTypes.string.isRequired,
};