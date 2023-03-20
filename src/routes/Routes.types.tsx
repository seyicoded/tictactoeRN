import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AppStackParamList = {
  Welcome: undefined;
  Game: undefined;
  GameComputer: undefined;
};

export type AppStackScreenProps<R extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, R>;
