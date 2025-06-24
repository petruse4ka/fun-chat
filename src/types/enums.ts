export enum Route {
  Login = '#/',
  About = '#/about',
  Chat = '#/chat',
  Error = '#/error',
}

export type ActionHandler = () => void;

export type Language = 'en' | 'ru';

export type Theme = 'light' | 'dark';

export enum AboutFeature {
  RealTimeChat = 'realTimeChat',
  UserAuthorisation = 'UserAuthorisation',
  ResponsiveDesign = 'ResponsiveDesign',
  MultiLanguage = 'multiLanguage',
  themeSelector = 'themeSelector',
}

export enum TechStack {
  HTML = 'html',
  CSS = 'css',
  TypeScript = 'typescript',
  SASS = 'sass',
  Vite = 'vite',
  ESLint = 'eslint',
  Prettier = 'prettier',
  Stylelint = 'stylelint',
}

export enum ConnectionErrorCondition {
  Lost = 'lost',
  Unavailable = 'unavailable',
}
