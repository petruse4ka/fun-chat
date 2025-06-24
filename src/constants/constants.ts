import { LanguageSelectorUtility } from '@/locales/language-selector';
import type { AboutFeature, Language, TechStack } from '@/types/enums';
import { Route } from '@/types/enums';
import type { MenuItem } from '@/types/interfaces';

export const DEFAULT_LANGUAGE: Language = 'en';

const languageSelector = new LanguageSelectorUtility(DEFAULT_LANGUAGE);
let language = languageSelector.getTranslations();

document.addEventListener('languageChange', () => {
  language = languageSelector.getTranslations();
});

export const GITHUB_URL: string = 'https://github.com/petruse4ka';
export const SCHOOL_URL: string = 'https://rs.school/courses/javascript';

export const AUTHOR_NAME: string = language.author;

export const SCHOOL_NAME: string = 'RS School';

export const COPYRIGHT_TEXT: string = '© 2025';

export const APP_NAME: string = language.appName;

export const BUTTON_TITLES: {
  home: string;
  login: string;
  logout: string;
  signin: string;
  send: string;
  edit: string;
  delete: string;
} = {
  home: language.home,
  login: language.login,
  logout: language.logout,
  signin: language.signin,
  send: language.send,
  edit: language.edit,
  delete: language.delete,
};

export const THEME_OPTIONS: { darkTheme: string; lightTheme: string } = {
  darkTheme: language.dark,
  lightTheme: language.light,
};

export const MENU_ITEMS: MenuItem[] = [
  { name: language.menuChat, route: Route.Chat },
  { name: language.menuAbout, route: Route.About },
];

export const PAGE_TITLES: { login: string; about: string; chat: string; error: string } = {
  login: language.loginPageTitle,
  about: language.aboutPageTitle,
  chat: language.chatPageTitle,
  error: language.errorPageTitle,
};

export const ERROR_PAGE_MESSAGE: string = language.errorPageMessage;

export const SIGNIN_FORM: {
  username: string;
  password: string;
  usernamePlaceholder: string;
  passwordPlaceholder: string;
} = {
  username: language.username,
  password: language.password,
  usernamePlaceholder: language.usernamePlaceholder,
  passwordPlaceholder: language.passwordPlaceholder,
};

export const TOOLTIP_TEXT: { username: string; password: string } = {
  username: language.usernameTooltip,
  password: language.passwordTooltip,
};

export const ERROR_TEXT: { username: string; password: string } = {
  username: language.usernameError,
  password: language.passwordError,
};

export const ABOUT_PAGE_TEXT: {
  introductionText: string;
  featuresTitle: string;
  stackTitle: string;
  features: { [key in AboutFeature]: string };
  techStack: { [key in TechStack]: string };
} = {
  introductionText: language.aboutIntroductionText,
  featuresTitle: language.aboutFeaturesTitle,
  stackTitle: language.aboutStackTitle,
  features: language.aboutFeatures,
  techStack: {
    html: 'HTML5',
    css: 'CSS3',
    typescript: 'TypeScript',
    sass: 'SASS',
    vite: 'Vite',
    eslint: 'ESLint',
    prettier: 'Prettier',
    stylelint: 'Stylelint',
  },
};

export const CHAT_TEXT: {
  searchPlaceholder: string;
  messagePlaceholder: string;
  noOtherUser: string;
  selectUserMessage: string;
  userOnline: string;
  userOffline: string;
  emptyChat: string;
  editedMessage: string;
  notDeliveredMessage: string;
  deliveredMessage: string;
  readMessage: string;
  dividerText: string;
} = {
  searchPlaceholder: language.searchPlaceholder,
  messagePlaceholder: language.messagePlaceholder,
  noOtherUser: language.noOtherUser,
  selectUserMessage: language.selectUserMessage,
  userOnline: language.userOnline,
  userOffline: language.userOffline,
  emptyChat: language.emptyChat,
  editedMessage: language.editedMessage,
  notDeliveredMessage: language.notDeliveredMessage,
  deliveredMessage: language.deliveredMessage,
  readMessage: language.readMessage,
  dividerText: language.dividerText,
};

export const SERVER_ERROR_MODAL: { errorTitle: string; errorMessage: string } = {
  errorTitle: language.serverErrorModalTitle,
  errorMessage: language.serverErrorModalMessage,
};

export const CONNECTION_ERROR_MODAL: {
  connectionErrorModalTitle: string;
  connectionUnavailableModalMessage: string;
  connectionLostModalMessage: string;
  maxReconnectAttempts: number;
  reconnectInterval: number;
} = {
  connectionErrorModalTitle: language.connectionErrorModalTitle,
  connectionLostModalMessage: language.connectionLostModalMessage,
  connectionUnavailableModalMessage: language.connectionUnavailableModalMessage,
  maxReconnectAttempts: 20,
  reconnectInterval: 5000,
};
