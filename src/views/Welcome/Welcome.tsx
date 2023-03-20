// @ts-nocheck
import * as React from 'react';
import { Alert, Linking, Text } from 'react-native';

import { Button, Container } from '@app/components';
import { useChangeTheme } from '@app/context';

import styles, {
  StyledButtonContainer,
  StyledPrimaryText,
  StyledSecondaryText,
  StyledTitleContainer,
  StyledThemeSwitch,
} from './Welcome.styled';
import { WelcomeProps } from './Welcome.types';

const Welcome: React.FC<WelcomeProps> = ({ navigation }) => {
  const { isDarkTheme, setDarkTheme } = useChangeTheme();

  const handleLinkAbout = React.useCallback(() => {
    Linking.openURL('https://www.github.com/seyicoded');
  }, []);

  const fontSize: any = {
    fontSize: 13,
  };

  return (
    <Container style={styles.container}>
      <StyledThemeSwitch
        value={isDarkTheme}
        onChange={(value) => setDarkTheme(value)}
      />
      <StyledTitleContainer>
        <StyledPrimaryText font="Black">Tic</StyledPrimaryText>
        <StyledSecondaryText font="Black">Tac</StyledSecondaryText>
        <StyledPrimaryText font="Black">Toe</StyledPrimaryText>
      </StyledTitleContainer>
      <StyledButtonContainer>
        <Button
          style={styles.button}
          type="primary"
          onPress={() => navigation.replace('Game')}
        >
          <Text>
            Play Game <Text style={fontSize}>1 vs 1</Text>
          </Text>
        </Button>

        <Button
          style={styles.button}
          type="primary"
          onPress={() => navigation.replace('GameComputer')}
        >
          <Text>
            Play Game <Text style={fontSize}>1 vs computer</Text>
          </Text>
        </Button>

        <Button
          style={styles.button}
          type="primary"
          onPress={() => {
            Alert.alert('Select Game Mode', '', [
              {
                text: 'Create a Game',
                style: 'default',
              },
              {
                text: 'Join a Game',
                style: 'default',
              },
            ]);
          }}
        >
          <Text>
            Play Game <Text style={fontSize}>1 vs friend (OTA)</Text>
          </Text>
        </Button>

        <Button
          style={styles.button}
          type="secondary"
          onPress={handleLinkAbout}
        >
          About
        </Button>
      </StyledButtonContainer>
    </Container>
  );
};

export default Welcome;
