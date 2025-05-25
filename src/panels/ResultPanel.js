import { Panel, PanelHeader, Div, Title, Text, Button, Image } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useEffect, useState } from 'react';


export const ResultPanel = ({ id }) => {
  const routeNavigator = useRouteNavigator();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedResult = localStorage.getItem('smeshariki_result');
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      routeNavigator.replace('/smeshariki');
    }
  }, []);

  if (!result) return null;

  return (
    <Panel id={id}>
      <PanelHeader>Твой результат</PanelHeader>
      <Div style={{ textAlign: 'center' }}>
        {result.image && (
          <Image
            src={result.image}
            alt={result.character}
            size={150}
            style={{ borderRadius: '50%', margin: '0 auto' }}
          />
        )}
        <Title level="1" style={{ marginTop: 16 }}>
          Ты – {result.character}!
        </Title>
        <Text style={{ marginTop: 8 }}>{result.description}</Text>
        <Text style={{ marginTop: 8, fontStyle: 'italic' }}>
          «{result.memeText}»
        </Text>
        
        <Button 
          size="l" 
          style={{ marginTop: 24 }}
          onClick={() => routeNavigator.push('/smeshariki')}
        >
          Пройти ещё раз
        </Button>
      </Div>
    </Panel>
  );
};