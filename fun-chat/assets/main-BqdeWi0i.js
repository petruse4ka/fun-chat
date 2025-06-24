var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const aboutImage = "" + new URL("about-DsPaPbqr.jpg", import.meta.url).href;
class ElementBuilder {
  constructor(parameters) {
    __publicField(this, "element");
    this.element = document.createElement(parameters.tag);
    this.applyCssClasses(parameters.className);
    this.applyTextContent(parameters.textContent);
    this.applyCallback(parameters.callback, parameters.eventType);
    this.applyAttributes(parameters.attributes);
  }
  getElement() {
    return this.element;
  }
  removeElement() {
    this.element.remove();
  }
  applyCssClasses(className) {
    if (className) {
      if (Array.isArray(className)) {
        this.element.classList.add(...className);
      } else {
        this.element.classList.add(className);
      }
    }
  }
  applyTextContent(text) {
    if (text) {
      this.element.textContent = text;
    }
  }
  applyAttributes(attributes) {
    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        this.element.setAttribute(key, value);
      }
    }
  }
  applyCallback(callback, eventType = "click") {
    if (callback) {
      this.element.addEventListener(eventType, callback);
    }
  }
}
class Component {
  constructor(parameters) {
    __publicField(this, "container");
    this.container = new ElementBuilder(parameters).getElement();
  }
  getElement() {
    return this.container;
  }
  remove() {
    this.container.remove();
  }
}
const en = {
  author: "Konstantin Petrov",
  appName: "Fun Chat",
  login: "Login",
  logout: "Logout",
  signin: "Sign In",
  send: "Send",
  edit: "edit",
  delete: "delete",
  home: "Go to Homepage",
  dark: "Dark theme",
  light: "Light theme",
  menuChat: "Chat",
  menuAbout: "About",
  chatPageTitle: "Chat",
  loginPageTitle: "Authorisation",
  aboutPageTitle: "About App",
  errorPageTitle: "Page Not Found",
  errorPageMessage: "Something went wrong! The page does not exist.",
  username: "Username",
  password: "Password",
  usernamePlaceholder: "Fill in the username",
  passwordPlaceholder: "Fill in the password",
  usernameTooltip: "Username must be 5-15 characters long",
  passwordTooltip: "Password must be 8-20 characters long, include at least one uppercase letter of Latin alphabet, one number, and one special symbol. Example: Crazy99Dancer!",
  usernameError: "Username length does not match the requirements",
  passwordError: "Password is not strong enough",
  aboutIntroductionText: "My name is Konstantin Petrov, and this is my Fun Chat App for the JavaScript/Front-end 2024Q4 course of RS School.",
  aboutFeaturesTitle: "App Features",
  aboutStackTitle: "Tech Stack",
  aboutFeatures: {
    realTimeChat: "Real-time chat functionality",
    UserAuthorisation: "User authentication system",
    ResponsiveDesign: "Modern and responsive design",
    multiLanguage: "Multi-language support",
    themeSelector: "Theme mode selector"
  },
  searchPlaceholder: "Search users...",
  messagePlaceholder: "Type message...",
  noOtherUser: "No users available for chatting",
  selectUserMessage: "Select a user to start chatting",
  userOnline: "online",
  userOffline: "offline",
  editedMessage: "edited",
  notDeliveredMessage: "not delivered",
  deliveredMessage: "delivered",
  readMessage: "read",
  dividerText: "Unread messages",
  emptyChat: "This is the beginning of your conversation",
  serverErrorModalTitle: "Server Error",
  serverErrorModalMessage: "Unfortunately, the server refused your request",
  connectionErrorModalTitle: "Connection Error",
  connectionLostModalMessage: "Connection to the server has been lost. Attempting to reconnect.",
  connectionUnavailableModalMessage: "There is no connection to the server. Refresh the page and try again"
};
const ru = {
  author: "Константин Петров",
  appName: "Веселый Чат",
  login: "Войти",
  logout: "Выйти",
  signin: "Авторизоваться",
  send: "Отправить",
  edit: "изменить",
  delete: "удалить",
  home: "На домашнюю страницу",
  dark: "Темная тема",
  light: "Светлая тема",
  menuChat: "Чат",
  menuAbout: "Инфо",
  chatPageTitle: "Чат",
  loginPageTitle: "Авторизация",
  aboutPageTitle: "Информация о приложении",
  errorPageTitle: "Страница не найдена",
  errorPageMessage: "Что-то пошло не так! Страница не существует.",
  username: "Имя пользователя",
  password: "Пароль",
  usernamePlaceholder: "Введите имя пользователя",
  passwordPlaceholder: "Введите пароль",
  usernameTooltip: "Имя пользователя должно состоять из 5-15 символов",
  passwordTooltip: "Пароль должен состоять из 8-20 символов, содержать как минимум одну заглавную букву латинского алфавита, одну цифру и один специальный символ. Пример: Crazy99Dancer!",
  usernameError: "Длина имени пользователя не соответствует требованиям",
  passwordError: "Пароль не достаточно сложный",
  aboutIntroductionText: "Меня зовут Константин Петров и это мое приложение Веселый Чатик, сделанное для курса JavaScript/Front-end 2024Q4 в RS School.",
  aboutFeaturesTitle: "Функционал Приложения",
  aboutStackTitle: "Технологический стек",
  aboutFeatures: {
    realTimeChat: "Обмен сообщениями в реальном времени",
    UserAuthorisation: "Система аутентификации пользователей",
    ResponsiveDesign: "Современный и адаптивный дизайн",
    multiLanguage: "Поддержка нескольких языков",
    themeSelector: "Переключатель темы"
  },
  searchPlaceholder: "Поиск пользователей...",
  messagePlaceholder: "Введите сообщение...",
  noOtherUser: "Нет пользователей, доступных для общения",
  selectUserMessage: "Выберите пользователя для начала общения",
  userOnline: "онлайн",
  userOffline: "офлайн",
  editedMessage: "изменено",
  notDeliveredMessage: "не доставлено",
  deliveredMessage: "доставлено",
  readMessage: "прочитано",
  dividerText: "Непрочитанные сообщения",
  emptyChat: "Это начало вашей беседы",
  serverErrorModalTitle: "Серверная ошибка",
  serverErrorModalMessage: "К сожалению, сервер отверг ваш запрос",
  connectionErrorModalTitle: "Ошибка Соединения",
  connectionLostModalMessage: "Соединение с сервером было потеряно. Пытаемся соединиться повторно.",
  connectionUnavailableModalMessage: "Соединение с сервером отсутствует. Обновите страницу браузера и повторите попытку снова."
};
class LanguageSelectorUtility {
  constructor(defaultLanguage = "en") {
    __publicField(this, "currentLanguage");
    const savedLanguage = localStorage.getItem("fun-chat-konstantin-language");
    this.currentLanguage = savedLanguage === "en" || savedLanguage === "ru" ? savedLanguage : defaultLanguage;
  }
  setLanguage(lang) {
    this.currentLanguage = lang;
    localStorage.setItem("fun-chat-konstantin-language", lang);
    document.dispatchEvent(new CustomEvent("languageChange", { detail: { language: lang } }));
  }
  getLanguage() {
    return this.currentLanguage;
  }
  getTranslations() {
    return this.currentLanguage === "en" ? en : ru;
  }
}
var Route = /* @__PURE__ */ ((Route2) => {
  Route2["Login"] = "#/";
  Route2["About"] = "#/about";
  Route2["Chat"] = "#/chat";
  Route2["Error"] = "#/error";
  return Route2;
})(Route || {});
var AboutFeature = /* @__PURE__ */ ((AboutFeature2) => {
  AboutFeature2["RealTimeChat"] = "realTimeChat";
  AboutFeature2["UserAuthorisation"] = "UserAuthorisation";
  AboutFeature2["ResponsiveDesign"] = "ResponsiveDesign";
  AboutFeature2["MultiLanguage"] = "multiLanguage";
  AboutFeature2["themeSelector"] = "themeSelector";
  return AboutFeature2;
})(AboutFeature || {});
var TechStack = /* @__PURE__ */ ((TechStack2) => {
  TechStack2["HTML"] = "html";
  TechStack2["CSS"] = "css";
  TechStack2["TypeScript"] = "typescript";
  TechStack2["SASS"] = "sass";
  TechStack2["Vite"] = "vite";
  TechStack2["ESLint"] = "eslint";
  TechStack2["Prettier"] = "prettier";
  TechStack2["Stylelint"] = "stylelint";
  return TechStack2;
})(TechStack || {});
var ConnectionErrorCondition = /* @__PURE__ */ ((ConnectionErrorCondition2) => {
  ConnectionErrorCondition2["Lost"] = "lost";
  ConnectionErrorCondition2["Unavailable"] = "unavailable";
  return ConnectionErrorCondition2;
})(ConnectionErrorCondition || {});
const DEFAULT_LANGUAGE = "en";
const languageSelector = new LanguageSelectorUtility(DEFAULT_LANGUAGE);
let language = languageSelector.getTranslations();
document.addEventListener("languageChange", () => {
  language = languageSelector.getTranslations();
});
const GITHUB_URL = "https://github.com/petruse4ka";
const SCHOOL_URL = "https://rs.school/courses/javascript";
const AUTHOR_NAME = language.author;
const SCHOOL_NAME = "RS School";
const COPYRIGHT_TEXT = "© 2025";
const APP_NAME = language.appName;
const BUTTON_TITLES = {
  home: language.home,
  login: language.login,
  logout: language.logout,
  signin: language.signin,
  send: language.send,
  edit: language.edit,
  delete: language.delete
};
const THEME_OPTIONS = {
  darkTheme: language.dark,
  lightTheme: language.light
};
const MENU_ITEMS = [
  { name: language.menuChat, route: Route.Chat },
  { name: language.menuAbout, route: Route.About }
];
const PAGE_TITLES = {
  login: language.loginPageTitle,
  about: language.aboutPageTitle,
  chat: language.chatPageTitle,
  error: language.errorPageTitle
};
const ERROR_PAGE_MESSAGE = language.errorPageMessage;
const SIGNIN_FORM = {
  username: language.username,
  password: language.password,
  usernamePlaceholder: language.usernamePlaceholder,
  passwordPlaceholder: language.passwordPlaceholder
};
const TOOLTIP_TEXT = {
  username: language.usernameTooltip,
  password: language.passwordTooltip
};
const ERROR_TEXT = {
  username: language.usernameError,
  password: language.passwordError
};
const ABOUT_PAGE_TEXT = {
  introductionText: language.aboutIntroductionText,
  featuresTitle: language.aboutFeaturesTitle,
  stackTitle: language.aboutStackTitle,
  features: language.aboutFeatures,
  techStack: {
    html: "HTML5",
    css: "CSS3",
    typescript: "TypeScript",
    sass: "SASS",
    vite: "Vite",
    eslint: "ESLint",
    prettier: "Prettier",
    stylelint: "Stylelint"
  }
};
const CHAT_TEXT = {
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
  dividerText: language.dividerText
};
const SERVER_ERROR_MODAL = {
  errorTitle: language.serverErrorModalTitle,
  errorMessage: language.serverErrorModalMessage
};
const CONNECTION_ERROR_MODAL = {
  connectionErrorModalTitle: language.connectionErrorModalTitle,
  connectionLostModalMessage: language.connectionLostModalMessage,
  connectionUnavailableModalMessage: language.connectionUnavailableModalMessage,
  maxReconnectAttempts: 20,
  reconnectInterval: 5e3
};
class ImageBuilder extends ElementBuilder {
  constructor(parameters) {
    super({ ...parameters });
    this.applySource(parameters.source);
    this.applyAlt(parameters.alt);
  }
  applySource(source) {
    if (source && this.element instanceof HTMLImageElement) {
      this.element.src = source;
    }
  }
  applyAlt(alt) {
    if (alt && this.element instanceof HTMLImageElement) {
      this.element.alt = alt;
    }
  }
}
class AboutPage extends Component {
  constructor() {
    super({ tag: "main", className: "about" });
    this.render();
  }
  static createFeaturesList() {
    const featuresTitle = new ElementBuilder({
      tag: "h2",
      className: ["about__subtitle"],
      textContent: ABOUT_PAGE_TEXT.featuresTitle
    }).getElement();
    const featuresList = new ElementBuilder({
      tag: "ul",
      className: ["about__feature-list"]
    }).getElement();
    for (const feature of Object.values(AboutFeature)) {
      const listItem = new ElementBuilder({
        tag: "li",
        className: ["about__feature-item"],
        textContent: ABOUT_PAGE_TEXT.features[feature]
      }).getElement();
      featuresList.append(listItem);
    }
    const container = new ElementBuilder({
      tag: "div",
      className: ["about__features-container"]
    }).getElement();
    container.append(featuresTitle, featuresList);
    return container;
  }
  static createTechStack() {
    const stackTitle = new ElementBuilder({
      tag: "h2",
      className: ["about__subtitle"],
      textContent: ABOUT_PAGE_TEXT.stackTitle
    }).getElement();
    const stackIconsContainer = new ElementBuilder({
      tag: "div",
      className: ["about__stack-icons-container"]
    }).getElement();
    for (const tech of Object.values(TechStack)) {
      const iconContainer = new ElementBuilder({
        tag: "div",
        className: ["about__stack-item"]
      }).getElement();
      const icon2 = new ImageBuilder({
        tag: "img",
        className: ["about__stack-icon"],
        source: `./assets/svg/${tech}.svg`,
        alt: `${ABOUT_PAGE_TEXT.techStack[tech]} icon`
      }).getElement();
      iconContainer.append(icon2);
      stackIconsContainer.append(iconContainer);
    }
    const container = new ElementBuilder({
      tag: "div",
      className: ["about__stack-container"]
    }).getElement();
    container.append(stackTitle, stackIconsContainer);
    return container;
  }
  render() {
    const title = new ElementBuilder({
      tag: "h1",
      className: ["about__title"],
      textContent: PAGE_TITLES.about
    }).getElement();
    const contentContainer = new ElementBuilder({
      tag: "div",
      className: ["about__container"]
    }).getElement();
    const heroImage = new ImageBuilder({
      tag: "img",
      className: ["about__image"],
      source: aboutImage,
      alt: "Two people chatting behind the PC"
    }).getElement();
    const introductionText = new ElementBuilder({
      tag: "p",
      className: ["about__introduction"],
      textContent: ABOUT_PAGE_TEXT.introductionText
    }).getElement();
    contentContainer.append(
      heroImage,
      introductionText,
      AboutPage.createFeaturesList(),
      AboutPage.createTechStack()
    );
    this.container.append(title, contentContainer);
  }
}
class InputBuilder extends ElementBuilder {
  constructor(parameters) {
    super({ ...parameters });
    this.setInputProperties(
      parameters.type,
      parameters.value,
      parameters.placeholder,
      parameters.readonly
    );
  }
  getValue() {
    if (this.element instanceof HTMLInputElement) {
      return this.element.value;
    }
    return "";
  }
  setValue(value) {
    if (this.element instanceof HTMLInputElement) {
      this.element.value = value;
    }
  }
  setInputProperties(type, value, placeholder, readonly) {
    if (this.element instanceof HTMLInputElement) {
      this.element.type = type;
    }
    if (value && this.element instanceof HTMLInputElement) {
      this.element.value = value;
    }
    if (placeholder && this.element instanceof HTMLInputElement) {
      this.element.placeholder = placeholder;
    }
    if (readonly && this.element instanceof HTMLInputElement) {
      this.element.readOnly = true;
    }
  }
}
const connectionError = "" + new URL("connection-error-ftMEj5de.png", import.meta.url).href;
class ButtonBuilder extends ElementBuilder {
  constructor(parameters) {
    super({ ...parameters });
    this.setButtonType(parameters.type);
  }
  disableButton() {
    this.element.classList.add("button--disabled");
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = true;
    }
  }
  enableButton() {
    this.element.classList.remove("button--disabled");
    if (this.element instanceof HTMLButtonElement) {
      this.element.disabled = false;
    }
  }
  setButtonType(type) {
    if (type && this.element instanceof HTMLInputElement) {
      this.element.type = type;
    }
  }
}
class Modal extends Component {
  constructor(className) {
    super({ tag: "dialog", className: ["modal", ...className] });
    __publicField(this, "modalContent");
    __publicField(this, "isOpen", false);
    __publicField(this, "closeButton");
    this.modalContent = new ElementBuilder({
      tag: "div",
      className: "modal__content"
    }).getElement();
    this.closeButton = new ButtonBuilder({
      type: "button",
      tag: "button",
      className: "modal__close-button",
      textContent: "×",
      callback: () => this.close()
    }).getElement();
    this.container.addEventListener("click", (event) => {
      if (event.target === this.container) {
        this.close();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.isOpen) {
        this.close();
      }
    });
    this.render();
  }
  open() {
    if (!this.isOpen) {
      document.body.append(this.container);
      document.body.style.overflow = "hidden";
      if (this.container instanceof HTMLDialogElement) {
        this.container.showModal();
      }
      this.isOpen = true;
    }
  }
  close() {
    if (this.isOpen) {
      if (this.container instanceof HTMLDialogElement) {
        this.container.close();
      }
      document.body.style.overflow = "";
      this.container.remove();
      this.isOpen = false;
    }
  }
  render() {
    this.modalContent.append(this.closeButton);
    this.container.append(this.modalContent);
  }
}
class ConnectionErrorModal extends Modal {
  constructor(errorCondition) {
    super(["connection-error-modal"]);
    __publicField(this, "errorCondition");
    __publicField(this, "messageContainer", null);
    this.errorCondition = errorCondition;
    this.renderChildren();
  }
  renderChildren() {
    this.messageContainer = new ElementBuilder({
      tag: "div",
      className: "connection-error-modal__message"
    }).getElement();
    const heading = new ElementBuilder({
      tag: "h2",
      className: "connection-error-modal__heading",
      textContent: CONNECTION_ERROR_MODAL.connectionErrorModalTitle
    }).getElement();
    const image = new ImageBuilder({
      tag: "img",
      className: "connection-error-modal__image",
      source: connectionError,
      alt: "Person in yellow builder helmet"
    }).getElement();
    const text = new ElementBuilder({
      tag: "p",
      className: "connection-error-modal__text",
      textContent: this.errorCondition === ConnectionErrorCondition.Lost ? CONNECTION_ERROR_MODAL.connectionLostModalMessage : CONNECTION_ERROR_MODAL.connectionUnavailableModalMessage
    }).getElement();
    this.messageContainer.append(heading, image, text);
    this.modalContent.append(this.messageContainer);
  }
}
const serverError = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='iso-8859-1'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20viewBox='0%200%20280%20280'%20xml:space='preserve'%3e%3cg%20id='XMLID_12_'%3e%3cpath%20id='XMLID_441_'%20style='fill:%23FFDA44;'%20d='M30.678,265.068c-27.33,0-38.511-19.365-24.846-43.034l109.322-189.35%20c13.665-23.669,36.026-23.669,49.691,0l109.322,189.35c13.665,23.669,2.484,43.034-24.846,43.034H30.678z'/%3e%3cpath%20id='XMLID_443_'%20style='fill:%23FF9811;'%20d='M274.168,222.034L164.846,32.684C158.014,20.849,149.006,14.949,140,14.95v250.118%20h109.322C276.652,265.068,287.833,245.703,274.168,222.034z'/%3e%3cpolygon%20id='XMLID_444_'%20style='fill:%23FFFFFF;'%20points='140,175.068%20120,175.068%20110,95.068%20140,95.068%20150,135.068%20'/%3e%3cpolygon%20id='XMLID_445_'%20style='fill:%23FFDA44;'%20points='160,175.068%20140,175.068%20140,95.068%20170,95.068%20'/%3e%3cpolygon%20id='XMLID_446_'%20style='fill:%23FFFFFF;'%20points='140,235.068%20120,235.068%20120,195.068%20140,195.068%20150,215.068%20'/%3e%3crect%20id='XMLID_447_'%20x='140'%20y='195.068'%20style='fill:%23FFDA44;'%20width='20'%20height='40'/%3e%3c/g%3e%3c/svg%3e";
class ServerErrorModal extends Modal {
  constructor(message) {
    super(["server-error-modal"]);
    __publicField(this, "errorMessage");
    __publicField(this, "messageContainer", null);
    this.errorMessage = message;
    this.renderChildren();
  }
  renderChildren() {
    this.messageContainer = new ElementBuilder({
      tag: "div",
      className: "server-error-modal__message"
    }).getElement();
    const heading = new ElementBuilder({
      tag: "h2",
      className: "server-error-modal__heading",
      textContent: SERVER_ERROR_MODAL.errorTitle
    }).getElement();
    const image = new ImageBuilder({
      tag: "img",
      className: "server-error-modal__image",
      source: serverError,
      alt: "Sever Error"
    }).getElement();
    const text = new ElementBuilder({
      tag: "p",
      className: "server-error-modal__text",
      textContent: SERVER_ERROR_MODAL.errorMessage
    }).getElement();
    const error2 = new ElementBuilder({
      tag: "p",
      className: "server-error-modal__error-text",
      textContent: this.errorMessage
    }).getElement();
    this.messageContainer.append(heading, image, text, error2);
    this.modalContent.append(this.messageContainer);
  }
}
function isLanguageChangeEvent(event) {
  return event instanceof CustomEvent && "language" in event.detail;
}
function isWebSocketMessage(message) {
  return typeof message === "object" && message !== null && "payload" in message;
}
function isLoggedUser(data) {
  return typeof data === "object" && data !== null && "username" in data && "password" in data;
}
function isWebSocketMessageWithPayload(message, type, payloadProperty) {
  return typeof message === "object" && message !== null && message.type === type && typeof message.payload === "object" && message.payload !== null && payloadProperty in message.payload;
}
const _WebSocketService = class _WebSocketService {
  constructor() {
    __publicField(this, "socket");
    __publicField(this, "url", "ws://localhost:4000");
    __publicField(this, "loginHandlers", []);
    __publicField(this, "logoutHandlers", []);
    __publicField(this, "otherUsersLoginHandler", null);
    __publicField(this, "otherUsersLogoutHandler", null);
    __publicField(this, "activeUsersHandler", null);
    __publicField(this, "inactiveUsersHandler", null);
    __publicField(this, "userMessageHandlers", []);
    __publicField(this, "messageHistoryHandlers", []);
    __publicField(this, "messageDeleteHandlers", []);
    __publicField(this, "messageEditHandler", null);
    __publicField(this, "messageDeliverHandler", null);
    __publicField(this, "messageReadHandlers", []);
    __publicField(this, "currentUser", null);
    __publicField(this, "userPassword", "");
    __publicField(this, "connectionLostModal");
    __publicField(this, "connectionUnavailableModal");
    __publicField(this, "reconnectAttempts", 0);
    __publicField(this, "maxReconnectAttempts", CONNECTION_ERROR_MODAL.maxReconnectAttempts);
    __publicField(this, "reconnectInterval", CONNECTION_ERROR_MODAL.reconnectInterval);
    __publicField(this, "reconnectModalShown", false);
    __publicField(this, "handleSocketOpenEvent", () => {
      this.reconnectAttempts = 0;
      this.reconnectModalShown = false;
      this.connectionLostModal.close();
      const loggedUser = sessionStorage.getItem("loggedUser");
      if (loggedUser) {
        try {
          const parsedData = JSON.parse(loggedUser);
          if (isLoggedUser(parsedData)) {
            this.sendLoginRequest(parsedData.username, parsedData.password);
          }
        } catch (error2) {
          console.error("Error", error2);
        }
      }
    });
    __publicField(this, "handleMessageEvent", (event) => {
      try {
        const message = JSON.parse(event.data);
        if (isWebSocketMessage(message)) {
          this.handleMessage(message);
        }
      } catch (error2) {
        console.error("Error", error2);
      }
    });
    __publicField(this, "handleSocketCloseEvent", () => {
      const user = this.currentUser;
      this.currentUser = null;
      if (user) {
        for (const handler of this.logoutHandlers) {
          handler({ login: user.login, isLogined: false });
        }
      }
      document.dispatchEvent(new CustomEvent("connectionLost"));
      if (!this.reconnectModalShown) {
        this.connectionLostModal.open();
        this.reconnectModalShown = true;
      }
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        this.reconnectAttempts++;
        setTimeout(() => this.connect(), this.reconnectInterval);
      }
    });
    this.connect();
    this.connectionLostModal = new ConnectionErrorModal(ConnectionErrorCondition.Lost);
    this.connectionUnavailableModal = new ConnectionErrorModal(
      ConnectionErrorCondition.Unavailable
    );
  }
  static getInstance() {
    if (!_WebSocketService.instance) {
      _WebSocketService.instance = new _WebSocketService();
    }
    return _WebSocketService.instance;
  }
  setLoginHandler(callback) {
    this.loginHandlers.push(callback);
  }
  setLogoutHandler(callback) {
    this.logoutHandlers.push(callback);
  }
  setOtherUsersLoginHandler(callback) {
    this.otherUsersLoginHandler = callback;
  }
  setOtherUsersLogoutHandler(callback) {
    this.otherUsersLogoutHandler = callback;
  }
  setActiveUsersHandler(callback) {
    this.activeUsersHandler = callback;
  }
  setInactiveUsersHandler(callback) {
    this.inactiveUsersHandler = callback;
  }
  setUserMessagesHandler(callback) {
    this.userMessageHandlers.push(callback);
  }
  setMessageHistoryHandler(callback) {
    this.messageHistoryHandlers.push(callback);
  }
  setMessageDeleteHandler(callback) {
    this.messageDeleteHandlers.push(callback);
  }
  setMessageEditHandler(callback) {
    this.messageEditHandler = callback;
  }
  setMessageDeliverHandler(callback) {
    this.messageDeliverHandler = callback;
  }
  setMessageReadHandler(callback) {
    this.messageReadHandlers.push(callback);
  }
  getCurrentUser() {
    return this.currentUser ? { login: this.currentUser.login, isLogined: true } : null;
  }
  sendLoginRequest(username, password) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.connectionUnavailableModal.open();
      throw new Error("Local server is unavailable");
    }
    this.userPassword = password;
    sessionStorage.setItem("loggedUser", JSON.stringify({ username, password }));
    const message = {
      id: crypto.randomUUID(),
      type: "USER_LOGIN",
      payload: {
        user: {
          login: username,
          password
        }
      }
    };
    this.socket.send(JSON.stringify(message));
  }
  sendLogoutRequest() {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }
    if (!this.currentUser) {
      throw new Error("No user is currently logged in");
    }
    const message = {
      id: crypto.randomUUID(),
      type: "USER_LOGOUT",
      payload: {
        user: {
          login: this.currentUser.login,
          password: this.currentUser.password
        }
      }
    };
    this.socket.send(JSON.stringify(message));
    sessionStorage.removeItem("loggedUser");
  }
  requestAllUsers() {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }
    const activeMessage = {
      id: crypto.randomUUID(),
      type: "USER_ACTIVE",
      payload: null
    };
    const inactiveMessage = {
      id: crypto.randomUUID(),
      type: "USER_INACTIVE",
      payload: null
    };
    this.socket.send(JSON.stringify(activeMessage));
    this.socket.send(JSON.stringify(inactiveMessage));
  }
  sendMessage(receiver, text) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.connectionUnavailableModal.open();
      throw new Error("WebSocket is not connected");
    }
    const message = {
      id: crypto.randomUUID(),
      type: "MSG_SEND",
      payload: {
        message: {
          to: receiver,
          text
        }
      }
    };
    this.socket.send(JSON.stringify(message));
  }
  editMessage(messageId, newText) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }
    const message = {
      id: crypto.randomUUID(),
      type: "MSG_EDIT",
      payload: {
        message: {
          id: messageId,
          text: newText
        }
      }
    };
    this.socket.send(JSON.stringify(message));
  }
  deleteMessage(messageId) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }
    const message = {
      id: crypto.randomUUID(),
      type: "MSG_DELETE",
      payload: {
        message: {
          id: messageId
        }
      }
    };
    this.socket.send(JSON.stringify(message));
  }
  fetchMessageHistory(userLogin) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }
    const request = {
      id: crypto.randomUUID(),
      type: "MSG_FROM_USER",
      payload: {
        user: {
          login: userLogin
        }
      }
    };
    this.socket.send(JSON.stringify(request));
  }
  readMessage(messageId) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error("WebSocket is not connected");
    }
    const message = {
      id: crypto.randomUUID(),
      type: "MSG_READ",
      payload: {
        message: {
          id: messageId
        }
      }
    };
    this.socket.send(JSON.stringify(message));
  }
  connect() {
    this.socket = new WebSocket(this.url);
    this.addEventListeners();
  }
  addEventListeners() {
    if (!this.socket) return;
    this.socket.addEventListener("open", this.handleSocketOpenEvent);
    this.socket.addEventListener("message", this.handleMessageEvent);
    this.socket.addEventListener("close", this.handleSocketCloseEvent);
  }
  handleMessage(message) {
    this.handleAuthMessages(message);
    this.handleUserMessages(message);
    this.handleErrorMessage(message);
  }
  handleAuthMessages(message) {
    if (isWebSocketMessageWithPayload(message, "USER_LOGIN", "user")) {
      this.handleLogin(message.payload.user);
      return;
    }
    if (isWebSocketMessageWithPayload(message, "USER_LOGOUT", "user")) {
      this.handleLogout(message.payload.user);
      return;
    }
    if (isWebSocketMessageWithPayload(
      message,
      "USER_EXTERNAL_LOGIN",
      "user"
    )) {
      this.handleOtherUserLogin(message.payload.user);
      return;
    }
    if (isWebSocketMessageWithPayload(
      message,
      "USER_EXTERNAL_LOGOUT",
      "user"
    )) {
      this.handleOtherUsersLogout(message.payload.user);
      return;
    }
  }
  handleUserMessages(message) {
    this.handleUserStatusMessages(message);
    this.handleMessageDeliveryMessages(message);
    this.handleMessageStatusMessages(message);
  }
  handleUserStatusMessages(message) {
    if (isWebSocketMessageWithPayload(message, "USER_ACTIVE", "users")) {
      this.handleActiveUsers(message.payload.users);
      return;
    }
    if (isWebSocketMessageWithPayload(message, "USER_INACTIVE", "users")) {
      this.handleInactiveUsers(message.payload.users);
      return;
    }
  }
  handleMessageDeliveryMessages(message) {
    if (isWebSocketMessageWithPayload(
      message,
      "MSG_FROM_USER",
      "messages"
    )) {
      this.handleMessageHistory(message.payload.messages);
      return;
    }
    if (isWebSocketMessageWithPayload(message, "MSG_SEND", "message")) {
      this.handleUserMessageSent(message.payload.message);
      return;
    }
  }
  handleMessageStatusMessages(message) {
    if (isWebSocketMessageWithPayload(
      message,
      "MSG_DELETE",
      "message"
    )) {
      this.handleMessageDelete(message.payload.message);
      return;
    }
    if (isWebSocketMessageWithPayload(message, "MSG_EDIT", "message")) {
      this.handleMessageEdit(message.payload.message);
      return;
    }
    if (isWebSocketMessageWithPayload(
      message,
      "MSG_DELIVER",
      "message"
    )) {
      this.handleMessageDelivered(message.payload.message);
      return;
    }
    if (isWebSocketMessageWithPayload(message, "MSG_READ", "message")) {
      this.handleMessageRead(message.payload.message);
      return;
    }
  }
  handleErrorMessage(message) {
    if (isWebSocketMessageWithPayload(message, "ERROR", "error")) {
      this.handleError(message.payload);
      return;
    }
  }
  handleLogin(user) {
    if (this) {
      this.currentUser = {
        login: user.login,
        password: this.userPassword
      };
      for (const handler of this.loginHandlers) handler(user);
    }
  }
  handleLogout(user) {
    if (this) {
      this.currentUser = null;
      for (const handler of this.logoutHandlers) handler(user);
      document.dispatchEvent(new CustomEvent("userLogout"));
    }
  }
  handleError(error2) {
    if (this) {
      console.error("Error received:", error2);
      const modal = new ServerErrorModal(error2.error.toUpperCase());
      modal.open();
    }
  }
  handleOtherUserLogin(user) {
    if (this.otherUsersLoginHandler) {
      this.otherUsersLoginHandler(user);
    }
  }
  handleOtherUsersLogout(user) {
    if (this.otherUsersLogoutHandler) {
      this.otherUsersLogoutHandler(user);
    }
  }
  handleActiveUsers(users) {
    if (this.activeUsersHandler) {
      this.activeUsersHandler(users);
    }
  }
  handleInactiveUsers(users) {
    if (this.inactiveUsersHandler) {
      this.inactiveUsersHandler(users);
    }
  }
  handleUserMessageSent(message) {
    if (this) {
      for (const handler of this.userMessageHandlers) {
        handler(message);
      }
    }
  }
  handleMessageHistory(messages) {
    if (this) {
      for (const handler of this.messageHistoryHandlers) {
        handler(messages);
      }
    }
  }
  handleMessageDelete(message) {
    if (this) {
      for (const handler of this.messageDeleteHandlers) {
        handler(message);
      }
    }
  }
  handleMessageEdit(message) {
    if (this.messageEditHandler) {
      this.messageEditHandler(message);
    }
  }
  handleMessageDelivered(message) {
    if (this.messageDeliverHandler) {
      this.messageDeliverHandler(message);
    }
  }
  handleMessageRead(message) {
    if (this) {
      for (const handler of this.messageReadHandlers) {
        handler(message);
      }
    }
  }
};
__publicField(_WebSocketService, "instance");
let WebSocketService = _WebSocketService;
class Button extends Component {
  constructor(parameters) {
    super({ tag: "div", className: "button-container" });
    __publicField(this, "button");
    this.button = new ButtonBuilder({
      tag: "button",
      type: "button",
      className: ["button", ...parameters.className],
      textContent: parameters.textContent,
      callback: parameters.callback
    });
    this.render();
  }
  disable() {
    this.button.disableButton();
  }
  enable() {
    this.button.enableButton();
  }
  render() {
    this.container.append(this.button.getElement());
  }
}
class ChatItem extends Component {
  constructor(message, wsService) {
    var _a;
    super({
      tag: "div",
      className: "chat-item",
      attributes: {
        "data-message-id": message.id
      }
    });
    __publicField(this, "message");
    __publicField(this, "wsService");
    __publicField(this, "currentUser");
    __publicField(this, "contentContainer");
    this.message = message;
    this.wsService = wsService;
    this.currentUser = ((_a = wsService.getCurrentUser()) == null ? void 0 : _a.login) || "";
    this.contentContainer = ChatItem.createContentContainer();
    this.render();
    this.addEventListeners();
  }
  static createContentContainer() {
    return new ElementBuilder({
      tag: "div",
      className: "chat-item__content-container"
    }).getElement();
  }
  render() {
    const messageContainer = new ElementBuilder({
      tag: "div",
      className: this.message.from === this.currentUser ? ["chat-item__container", "chat-item__container--own"] : ["chat-item__container"]
    }).getElement();
    this.contentContainer.append(this.createContent());
    messageContainer.append(this.createHeader(), this.contentContainer, this.createFooter());
    this.container.append(messageContainer);
  }
  addEventListeners() {
    this.wsService.setMessageDeleteHandler((deletedMessage) => {
      if (deletedMessage.id === this.message.id) {
        this.container.remove();
      }
    });
    this.wsService.setMessageReadHandler((readMessage) => {
      if (readMessage.id === this.message.id) {
        this.message.status.isReaded = true;
      }
    });
  }
  createHeader() {
    const messageHeader = new ElementBuilder({
      tag: "div",
      className: "chat-item__header"
    }).getElement();
    const messageSender = new ElementBuilder({
      tag: "span",
      className: "chat-item__sender",
      textContent: this.message.from
    }).getElement();
    const messageTime = new ElementBuilder({
      tag: "span",
      className: "chat-item__time",
      textContent: new Date(this.message.datetime).toLocaleTimeString()
    }).getElement();
    messageHeader.append(messageSender, messageTime);
    return messageHeader;
  }
  createContent() {
    const content = new ElementBuilder({
      tag: "div",
      className: "chat-item__content"
    }).getElement();
    const text = new ElementBuilder({
      tag: "p",
      className: "chat-item__text",
      textContent: this.message.text
    }).getElement();
    content.append(text);
    if (this.message.status.isEdited) {
      const editedText = new ElementBuilder({
        tag: "div",
        className: "chat-item__edited",
        textContent: CHAT_TEXT.editedMessage
      }).getElement();
      content.append(text, editedText);
    }
    return content;
  }
  createEditForm() {
    const form = new ElementBuilder({
      tag: "div",
      className: "chat-item__edit-form"
    }).getElement();
    const input = new InputBuilder({
      tag: "input",
      className: ["chat-list__input", "input__field"],
      type: "text",
      value: this.message.text,
      placeholder: CHAT_TEXT.messagePlaceholder
    }).getElement();
    const confirmButton = new Button({
      className: ["button", "button--confirm"],
      textContent: "✓",
      callback: () => {
        if (input instanceof HTMLInputElement) this.confirmEditMessage(input.value);
      }
    }).getElement();
    const cancelButton = new Button({
      className: ["button", "button--cancel"],
      textContent: "✕",
      callback: () => this.cancelEditMessage()
    }).getElement();
    form.append(input, confirmButton, cancelButton);
    return form;
  }
  createStatusContainer() {
    const statusContainer = new ElementBuilder({
      tag: "div",
      className: "chat-item__status-container"
    }).getElement();
    if (!this.message.status.isDelivered) {
      const notDeliveredStatus = new ElementBuilder({
        tag: "span",
        className: "chat-item__status-not-delivered",
        textContent: CHAT_TEXT.notDeliveredMessage
      }).getElement();
      statusContainer.append(notDeliveredStatus);
    } else if (this.message.status.isReaded) {
      const readStatus = new ElementBuilder({
        tag: "span",
        className: "chat-item__status-read",
        textContent: CHAT_TEXT.readMessage
      }).getElement();
      statusContainer.append(readStatus);
    } else {
      const deliveredStatus = new ElementBuilder({
        tag: "span",
        className: "chat-item__status-delivered",
        textContent: CHAT_TEXT.deliveredMessage
      }).getElement();
      statusContainer.append(deliveredStatus);
    }
    return statusContainer;
  }
  createButtonsContainer() {
    const buttonsContainer = new ElementBuilder({
      tag: "div",
      className: "chat-item__buttons-container"
    }).getElement();
    const editButton = new Button({
      className: ["button", "button--edit"],
      textContent: BUTTON_TITLES.edit,
      callback: () => this.editMessage()
    }).getElement();
    const deleteButton = new Button({
      className: ["button", "button--delete"],
      textContent: BUTTON_TITLES.delete,
      callback: () => this.deleteMessage()
    }).getElement();
    buttonsContainer.append(editButton, deleteButton);
    return buttonsContainer;
  }
  createFooter() {
    const footer = new ElementBuilder({
      tag: "div",
      className: "chat-item__footer"
    }).getElement();
    if (this.message.from === this.currentUser) {
      footer.append(this.createStatusContainer(), this.createButtonsContainer());
    }
    return footer;
  }
  editMessage() {
    while (this.contentContainer.firstChild) {
      this.contentContainer.firstChild.remove();
    }
    const editForm = this.createEditForm();
    this.contentContainer.append(editForm);
  }
  cancelEditMessage() {
    while (this.contentContainer.firstChild) {
      this.contentContainer.firstChild.remove();
    }
    const content = this.createContent();
    this.contentContainer.append(content);
  }
  confirmEditMessage(newText) {
    if (newText.trim() === this.message.text) {
      this.cancelEditMessage();
      return;
    }
    if (newText.trim() === "") {
      this.cancelEditMessage();
      return;
    }
    this.wsService.editMessage(this.message.id, newText);
    this.message.text = newText;
    this.cancelEditMessage();
  }
  deleteMessage() {
    this.wsService.deleteMessage(this.message.id);
  }
}
class ChatList extends Component {
  constructor() {
    super({ tag: "div", className: "chat-list" });
    __publicField(this, "messageContainer");
    __publicField(this, "messageInput");
    __publicField(this, "sendButton");
    __publicField(this, "selectedUser");
    __publicField(this, "wsService");
    __publicField(this, "messages", []);
    __publicField(this, "unreadMessagesCount", /* @__PURE__ */ new Map());
    __publicField(this, "isRead", false);
    __publicField(this, "isManualScrolling", false);
    this.wsService = WebSocketService.getInstance();
    this.messageContainer = ChatList.createMessageContainer();
    this.messageInput = ChatList.createMessageInput();
    this.sendButton = this.createSendButton();
    this.selectedUser = null;
    this.render();
    this.addEventListeners();
    this.addWebSocketHandlers();
  }
  static createMessageContainer() {
    return new ElementBuilder({
      tag: "div",
      className: ["chat-list__list"]
    }).getElement();
  }
  static createMessageInput() {
    return new InputBuilder({
      tag: "input",
      className: ["chat-list__input", "input__field"],
      type: "text",
      value: "",
      placeholder: CHAT_TEXT.messagePlaceholder,
      readonly: false
    });
  }
  static createEmptyChat() {
    const emptyChat = new ElementBuilder({
      tag: "div",
      className: ["chat-list__empty"]
    }).getElement();
    const message = new ElementBuilder({
      tag: "p",
      className: ["chat-list__empty-message"],
      textContent: CHAT_TEXT.emptyChat
    }).getElement();
    emptyChat.append(message);
    return emptyChat;
  }
  static createDividerLine() {
    const divider = new ElementBuilder({
      tag: "div",
      className: ["chat-list__divider"]
    }).getElement();
    const line = new ElementBuilder({
      tag: "div",
      className: ["chat-list__divider-line"]
    }).getElement();
    const text = new ElementBuilder({
      tag: "span",
      className: ["chat-list__divider-text"],
      textContent: CHAT_TEXT.dividerText
    }).getElement();
    divider.append(line, text);
    return divider;
  }
  setSelectedUser(user) {
    this.selectedUser = user;
    this.isRead = false;
    if (user) {
      this.fetchMessageHistory(user.login);
    } else {
      this.messages = [];
      this.renderMessages();
    }
    this.messageInput.setValue("");
    this.messageInput.getElement().classList.remove("input__field--error");
    this.render();
  }
  getUnreadMessagesCounter(userLogin) {
    return this.unreadMessagesCount.get(userLogin) || 0;
  }
  updateUnreadMessagesCounter(userLogin, newCount) {
    const currentMessagesCounter = this.unreadMessagesCount.get(userLogin) || 0;
    const newMessagesCounter = currentMessagesCounter + newCount;
    if (newCount === 0) {
      this.unreadMessagesCount.delete(userLogin);
    } else {
      this.unreadMessagesCount.set(userLogin, newMessagesCounter);
    }
    document.dispatchEvent(new CustomEvent("unreadMessagesCounterUpdated"));
  }
  countUnreadMessages(messages) {
    if (messages.length === 0) return;
    const currentUser = this.wsService.getCurrentUser();
    if (!currentUser) return;
    let unreadMessagesCounter = 0;
    for (const message of messages) {
      if (message.to === currentUser.login && !message.status.isReaded) {
        unreadMessagesCounter += 1;
      }
    }
    if (this.selectedUser) {
      this.unreadMessagesCount.set(this.selectedUser.login, unreadMessagesCounter);
    }
    document.dispatchEvent(new CustomEvent("unreadMessagesCounterUpdated"));
  }
  render() {
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }
    const userInfo = this.createUserInfo();
    this.container.append(userInfo);
    const chatContainer = new ElementBuilder({
      tag: "div",
      className: ["chat-list__container"]
    }).getElement();
    if (this.messageContainer.children.length === 0) {
      const emptyChat = ChatList.createEmptyChat();
      this.messageContainer.append(emptyChat);
    }
    chatContainer.append(this.messageContainer);
    const chatControls = new ElementBuilder({
      tag: "div",
      className: ["chat-list__controls"]
    }).getElement();
    chatControls.append(this.messageInput.getElement(), this.sendButton.getElement());
    chatContainer.append(chatControls);
    this.container.append(chatContainer);
  }
  fetchMessageHistory(userLogin) {
    this.wsService.fetchMessageHistory(userLogin);
  }
  createUserInfo() {
    const userInfo = new ElementBuilder({
      tag: "div",
      className: ["chat-list__user-info"]
    }).getElement();
    if (this.selectedUser) {
      const userName = new ElementBuilder({
        tag: "span",
        className: ["chat-list__username"],
        textContent: this.selectedUser.login
      }).getElement();
      const userStatus = new ElementBuilder({
        tag: "span",
        className: [
          "chat-list__user-status",
          this.selectedUser.isOnline ? "chat-list__user-status--online" : "chat-list__user-status--offline"
        ],
        textContent: this.selectedUser.isOnline ? CHAT_TEXT.userOnline : CHAT_TEXT.userOffline
      }).getElement();
      userInfo.append(userName, userStatus);
    }
    return userInfo;
  }
  createSendButton() {
    return new Button({
      className: ["button--send"],
      textContent: BUTTON_TITLES.send,
      callback: () => this.SendMessage()
    });
  }
  addEventListeners() {
    this.messageInput.getElement().addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        this.SendMessage();
      }
    });
    this.messageInput.getElement().addEventListener("input", () => {
      this.messageInput.getElement().classList.remove("input__field--error");
    });
    this.messageInput.getElement().addEventListener("focus", () => {
      this.messageInput.getElement().classList.remove("input__field--error");
    });
    this.messageContainer.addEventListener(
      "wheel",
      () => {
        this.isManualScrolling = true;
        this.ReadMessages();
        setTimeout(() => {
          this.isManualScrolling = false;
        }, 1e3);
      },
      { passive: true }
    );
    this.messageContainer.addEventListener("click", () => {
      this.ReadMessages();
    });
    globalThis.addEventListener("popstate", () => {
      this.setSelectedUser(null);
    });
    document.addEventListener("userLogout", () => {
      this.messages = [];
      this.unreadMessagesCount.clear();
    });
    document.addEventListener("connectionLost", () => {
      this.messages = [];
      this.unreadMessagesCount.clear();
    });
  }
  addUserMessageHandlers() {
    this.wsService.setUserMessagesHandler((newMessage) => {
      if (this.selectedUser && (newMessage.from === this.selectedUser.login || newMessage.to === this.selectedUser.login)) {
        const index = this.messages.find((previousMessage) => previousMessage.id === newMessage.id);
        if (index === void 0) {
          this.messages.push(newMessage);
          if (this.isRead) {
            this.ReadMessages();
          }
          this.renderMessages();
        }
      }
    });
    this.wsService.setMessageHistoryHandler((messages) => {
      this.messages = messages;
      this.renderMessages();
      const currentUser = this.wsService.getCurrentUser();
      if (currentUser) {
        const unreadMessages = /* @__PURE__ */ new Map();
        for (const message of messages) {
          if (message.to === currentUser.login && !message.status.isReaded) {
            const currentUnreadMessagesCount = unreadMessages.get(message.from) || 0;
            unreadMessages.set(message.from, currentUnreadMessagesCount + 1);
          }
        }
        for (const [sender, count] of unreadMessages.entries()) {
          this.unreadMessagesCount.set(sender, count);
        }
        document.dispatchEvent(new CustomEvent("unreadMessagesCounterUpdated"));
      }
    });
  }
  addUserMessageStatusHandlers() {
    this.wsService.setMessageDeleteHandler((deletedMessage) => {
      this.messages = this.messages.filter((message) => message.id !== deletedMessage.id);
      this.renderMessages();
    });
    this.wsService.setMessageEditHandler((editedMessage) => {
      const index = this.messages.findIndex((message) => message.id === editedMessage.id);
      if (index !== -1) {
        this.messages[index].text = editedMessage.text;
        this.messages[index].status.isEdited = true;
        this.renderMessages();
      }
    });
    this.wsService.setMessageDeliverHandler((deliveredMessage) => {
      const index = this.messages.findIndex((message) => message.id === deliveredMessage.id);
      if (index !== -1) {
        this.messages[index].status.isDelivered = true;
        this.renderMessages();
      }
    });
    this.wsService.setMessageReadHandler((readMessage) => {
      const index = this.messages.findIndex((message) => message.id === readMessage.id);
      if (index !== -1) {
        this.messages[index].status.isReaded = true;
        this.renderMessages();
      }
    });
  }
  addWebSocketHandlers() {
    this.addUserMessageHandlers();
    this.addUserMessageStatusHandlers();
  }
  renderMessages() {
    while (this.messageContainer.firstChild) {
      this.messageContainer.firstChild.remove();
    }
    if (this.messages.length === 0) {
      const emptyChat = ChatList.createEmptyChat();
      this.messageContainer.append(emptyChat);
      return;
    }
    const currentUser = this.wsService.getCurrentUser();
    if (!currentUser) return;
    let hasUnreadMessages = false;
    let wasDividerShown = false;
    let dividerElement = null;
    if (this.isRead) {
      for (const message of this.messages) {
        const chatItem = new ChatItem(message, this.wsService);
        this.messageContainer.append(chatItem.getElement());
      }
    } else {
      for (const message of this.messages) {
        if (!wasDividerShown && message.to === currentUser.login && !message.status.isReaded) {
          hasUnreadMessages = true;
          const divider = ChatList.createDividerLine();
          this.messageContainer.append(divider);
          wasDividerShown = true;
          dividerElement = divider;
        }
        const chatItem = new ChatItem(message, this.wsService);
        this.messageContainer.append(chatItem.getElement());
      }
    }
    if (hasUnreadMessages && dividerElement) {
      dividerElement.scrollIntoView({ behavior: "instant", block: "start" });
    } else {
      if (!this.isManualScrolling) {
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
      }
    }
  }
  SendMessage() {
    if (!this.selectedUser) return;
    const currentUser = this.wsService.getCurrentUser();
    if (!currentUser) return;
    const inputElement = this.messageInput.getElement();
    if (inputElement instanceof HTMLInputElement) {
      const message = inputElement.value.trim();
      if (message.length === 0) {
        inputElement.classList.add("input__field--error");
        return;
      }
      this.wsService.sendMessage(this.selectedUser.login, message);
      inputElement.value = "";
      this.ReadMessages();
      this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }
  }
  ReadMessages() {
    const currentUser = this.wsService.getCurrentUser();
    if (!currentUser || !this.selectedUser) return;
    const unreadMessages = this.messages.filter(
      (message) => {
        var _a;
        return message.from === ((_a = this.selectedUser) == null ? void 0 : _a.login) && message.to === currentUser.login && !message.status.isReaded;
      }
    );
    if (unreadMessages.length > 0) {
      for (const message of unreadMessages) {
        this.wsService.readMessage(message.id);
      }
    }
    this.isRead = true;
  }
}
const chatPreviewImage = "" + new URL("users-CaB8K89L.png", import.meta.url).href;
class ChatPreview extends Component {
  constructor() {
    super({ tag: "div", className: "chat-preview" });
    this.render();
  }
  render() {
    const container = new ElementBuilder({
      tag: "div",
      className: "chat-preview__container"
    }).getElement();
    const icon2 = new ImageBuilder({
      tag: "img",
      className: "chat-preview__icon",
      source: chatPreviewImage,
      alt: "Icons of several users"
    }).getElement();
    const message = new ElementBuilder({
      tag: "p",
      className: "chat-preview__message",
      textContent: CHAT_TEXT.selectUserMessage
    }).getElement();
    container.append(icon2, message);
    this.container.append(container);
  }
}
class User extends Component {
  constructor(user, callback, unreadCount = 0) {
    super({ tag: "div", className: "user-list__user" });
    __publicField(this, "user");
    __publicField(this, "selectUser");
    __publicField(this, "unreadMessagesCounter");
    this.user = user;
    this.selectUser = callback;
    this.unreadMessagesCounter = unreadCount;
    this.render();
    this.addEventListeners();
  }
  render() {
    const username = new ElementBuilder({
      tag: "span",
      className: ["user-list__username"],
      textContent: this.user.login
    }).getElement();
    const status = new ElementBuilder({
      tag: "div",
      className: [
        "user-list__status",
        this.user.isOnline ? "user-list__status--online" : "user-list__status--offline"
      ]
    }).getElement();
    this.container.append(status, username);
    if (this.unreadMessagesCounter > 0) {
      const unreadMessages = new ElementBuilder({
        tag: "div",
        className: ["user-list__unread-messages"],
        textContent: this.unreadMessagesCounter > 9 ? "9+" : this.unreadMessagesCounter.toString()
      }).getElement();
      this.container.append(unreadMessages);
    }
  }
  addEventListeners() {
    this.container.addEventListener("click", () => {
      if (this.selectUser) {
        this.selectUser(this.user);
      }
    });
  }
}
class UserList extends Component {
  constructor() {
    super({ tag: "div", className: "user-list" });
    __publicField(this, "users", /* @__PURE__ */ new Map());
    __publicField(this, "searchInput");
    __publicField(this, "userListContainer");
    __publicField(this, "wsService");
    __publicField(this, "chatList");
    __publicField(this, "selectedUser", null);
    __publicField(this, "messages", /* @__PURE__ */ new Map());
    this.wsService = WebSocketService.getInstance();
    this.searchInput = UserList.createSearchInput();
    this.userListContainer = UserList.createUserListContainer();
    this.addWebSocketHandlers();
    this.addEventListeners();
    this.render();
    this.requestMessageHistory();
  }
  static createUserListContainer() {
    return new ElementBuilder({
      tag: "div",
      className: ["user-list__list"]
    }).getElement();
  }
  static createSearchInput() {
    return new InputBuilder({
      tag: "input",
      className: ["user-list__input", "input__field"],
      type: "text",
      value: "",
      placeholder: CHAT_TEXT.searchPlaceholder,
      readonly: false
    });
  }
  setChatList(chatList) {
    this.chatList = chatList;
  }
  render() {
    this.container.append(this.searchInput.getElement(), this.userListContainer);
  }
  selectUser(user) {
    this.selectedUser = user;
    if (this.chatList) {
      this.chatList.setSelectedUser(user);
      const event = new CustomEvent("userSelected", { bubbles: true });
      this.container.dispatchEvent(event);
    }
    this.searchInput.setValue("");
    this.renderUsers();
  }
  addWebSocketHandlers() {
    this.wsService.setLoginHandler((user) => {
      this.handleUserLogin(user);
      this.wsService.requestAllUsers();
    });
    this.wsService.setLogoutHandler(this.handleUserLogout.bind(this));
    this.wsService.setOtherUsersLoginHandler(this.handleUserLogin.bind(this));
    this.wsService.setOtherUsersLogoutHandler(this.handleUserLogout.bind(this));
    this.wsService.setActiveUsersHandler(this.handleActiveUsers.bind(this));
    this.wsService.setInactiveUsersHandler(this.handleInactiveUsers.bind(this));
    this.wsService.setMessageHistoryHandler(this.handleMessageHistory.bind(this));
    this.wsService.setUserMessagesHandler(this.handleUserMessage.bind(this));
    this.wsService.setMessageDeleteHandler(this.handleMessageDelete.bind(this));
    this.wsService.setMessageReadHandler(this.handleMessageRead.bind(this));
  }
  handleUserLogin(user) {
    const currentUser = this.wsService.getCurrentUser();
    if (user.login !== (currentUser == null ? void 0 : currentUser.login)) {
      this.users.set(user.login, { login: user.login, isOnline: true });
      if (this.selectedUser && user.login === this.selectedUser.login && this.chatList) {
        this.chatList.setSelectedUser({ ...this.selectedUser, isOnline: true });
      }
      this.renderUsers();
    }
  }
  handleUserLogout(user) {
    const currentUser = this.wsService.getCurrentUser();
    if (user.login !== (currentUser == null ? void 0 : currentUser.login)) {
      this.users.set(user.login, { login: user.login, isOnline: false });
      if (this.selectedUser && user.login === this.selectedUser.login && this.chatList) {
        this.chatList.setSelectedUser({ ...this.selectedUser, isOnline: false });
      }
      this.renderUsers();
    }
  }
  handleActiveUsers(users) {
    const currentUser = this.wsService.getCurrentUser();
    this.users.clear();
    const otherUsers = users.filter((user) => user.login !== (currentUser == null ? void 0 : currentUser.login));
    for (const user of otherUsers) {
      this.users.set(user.login, { login: user.login, isOnline: true });
    }
    this.renderUsers();
    this.requestMessageHistory();
  }
  handleInactiveUsers(users) {
    const currentUser = this.wsService.getCurrentUser();
    const otherUsers = users.filter((user) => user.login !== (currentUser == null ? void 0 : currentUser.login));
    for (const user of otherUsers) {
      this.users.set(user.login, { login: user.login, isOnline: false });
    }
    this.renderUsers();
  }
  handleMessageHistory(messages) {
    if (this.chatList) {
      this.chatList.countUnreadMessages(messages);
    }
    for (const message of messages) this.messages.set(message.id, message);
  }
  handleUserMessage(message) {
    if (this.chatList && !message.status.isReaded) {
      this.chatList.updateUnreadMessagesCounter(message.from, 1);
    }
    this.messages.set(message.id, message);
  }
  handleMessageDelete(deletedMessage) {
    var _a;
    const previousMessage = this.messages.get(deletedMessage.id);
    if (previousMessage && !previousMessage.status.isReaded) {
      (_a = this.chatList) == null ? void 0 : _a.updateUnreadMessagesCounter(previousMessage.from, -1);
    }
    this.messages.delete(deletedMessage.id);
  }
  handleMessageRead(readMessage) {
    var _a;
    const message = this.messages.get(readMessage.id);
    const currentUser = this.wsService.getCurrentUser();
    if (message && !message.status.isReaded && message.to === (currentUser == null ? void 0 : currentUser.login)) {
      (_a = this.chatList) == null ? void 0 : _a.updateUnreadMessagesCounter(message.from, -1);
      message.status.isReaded = true;
    }
  }
  addEventListeners() {
    this.searchInput.getElement().addEventListener("input", () => this.filterUsers());
    document.addEventListener("connectionLost", () => {
      this.selectedUser = null;
      this.messages.clear();
      if (this.chatList) {
        this.chatList.setSelectedUser(null);
      }
      this.renderUsers();
    });
    document.addEventListener("userLogout", () => {
      this.selectedUser = null;
      this.messages.clear();
      if (this.chatList) {
        this.chatList.setSelectedUser(null);
      }
      this.renderUsers();
    });
    document.addEventListener("unreadMessagesCounterUpdated", () => {
      this.renderUsers();
    });
    globalThis.addEventListener("popstate", () => {
      this.selectedUser = null;
      if (this.chatList) {
        this.chatList.setSelectedUser(null);
      }
      this.renderUsers();
    });
  }
  filterUsers() {
    const searchTerm = this.searchInput.getValue().toLowerCase();
    const filteredUsers = [...this.users.values()].filter(
      (user) => user.login.toLowerCase().includes(searchTerm)
    );
    this.renderUsers(filteredUsers);
  }
  renderUsers(users) {
    var _a;
    while (this.userListContainer.firstChild) {
      this.userListContainer.firstChild.remove();
    }
    const searchTerm = this.searchInput.getValue().toLowerCase();
    const renderedUsers = users || [...this.users.values()];
    const filteredUsers = searchTerm ? renderedUsers.filter((user) => user.login.toLowerCase().includes(searchTerm)) : renderedUsers;
    if (filteredUsers.length === 0) {
      const noOtherUsersMessage = new ElementBuilder({
        tag: "p",
        className: "user-list__no-other-users",
        textContent: CHAT_TEXT.noOtherUser
      }).getElement();
      this.userListContainer.append(noOtherUsersMessage);
      return;
    }
    for (const user of filteredUsers) {
      const unreadCount = ((_a = this.chatList) == null ? void 0 : _a.getUnreadMessagesCounter(user.login)) || 0;
      const userElement = new User(user, this.selectUser.bind(this), unreadCount).getElement();
      if (this.selectedUser && this.selectedUser.login === user.login) {
        userElement.classList.add("user-list__user--selected");
      }
      this.userListContainer.append(userElement);
    }
  }
  requestMessageHistory() {
    const currentUser = this.wsService.getCurrentUser();
    if (currentUser) {
      for (const user of this.users.values()) {
        this.wsService.fetchMessageHistory(user.login);
      }
    }
  }
}
class ChatPage extends Component {
  constructor() {
    super({ tag: "main", className: "chat" });
    __publicField(this, "userList");
    __publicField(this, "chatList");
    __publicField(this, "chatPreview");
    __publicField(this, "showPreview");
    this.userList = new UserList();
    this.chatList = new ChatList();
    this.chatPreview = new ChatPreview();
    this.showPreview = true;
    this.userList.setChatList(this.chatList);
    this.render();
    this.addEventListeners();
  }
  render() {
    const title = new ElementBuilder({
      tag: "h1",
      className: ["chat__title"],
      textContent: PAGE_TITLES.chat
    }).getElement();
    const content = new ElementBuilder({
      tag: "div",
      className: ["chat__content"]
    }).getElement();
    content.append(this.userList.getElement());
    content.append(this.showPreview ? this.chatPreview.getElement() : this.chatList.getElement());
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }
    this.container.append(title, content);
  }
  addEventListeners() {
    this.container.addEventListener("userSelected", () => {
      this.showPreview = false;
      this.render();
    });
    document.addEventListener("connectionLost", () => {
      this.showPreview = true;
      this.render();
    });
    document.addEventListener("userLogout", () => {
      this.showPreview = true;
      this.render();
    });
    globalThis.addEventListener("popstate", () => {
      this.showPreview = true;
      this.render();
    });
  }
}
class Router {
  constructor(loginRoute) {
    __publicField(this, "routes");
    __publicField(this, "loginRoute");
    this.routes = /* @__PURE__ */ new Map();
    this.loginRoute = loginRoute;
    this.setDefaultRoute();
    this.setEventListeners();
  }
  static followRoute(route) {
    globalThis.location.hash = route;
  }
  static checkRouteValidity(hash) {
    const validRoutes = /* @__PURE__ */ new Set([Route.Login, Route.About, Route.Chat, Route.Error]);
    return validRoutes.has(hash);
  }
  addRoute(route, handler) {
    this.routes.set(route, handler);
  }
  setDefaultRoute() {
    if (!globalThis.location.hash) {
      globalThis.location.hash = this.loginRoute;
    }
  }
  setEventListeners() {
    globalThis.addEventListener("hashchange", () => this.handleRoute());
    window.addEventListener("load", () => this.handleRoute());
  }
  handleRoute() {
    const currentHash = globalThis.location.hash || this.loginRoute;
    const route = Router.checkRouteValidity(currentHash) ? currentHash : Route.Error;
    const handler = this.routes.get(route);
    if (handler) {
      handler();
    } else {
      globalThis.location.hash = this.loginRoute;
    }
  }
}
const error = "" + new URL("404-S4YdsVTd.svg", import.meta.url).href;
class ErrorPage extends Component {
  constructor() {
    super({ tag: "main", className: "error" });
    this.render();
  }
  render() {
    const errorSection = new ElementBuilder({
      tag: "div",
      className: ["error__container"]
    }).getElement();
    const errorImage = new ImageBuilder({
      tag: "img",
      className: "error__image",
      source: error,
      alt: "404 Error Page Image"
    }).getElement();
    const heading = new ElementBuilder({
      tag: "h2",
      className: ["error__heading"],
      textContent: PAGE_TITLES.error
    }).getElement();
    const message = new ElementBuilder({
      tag: "p",
      className: ["error__message"],
      textContent: ERROR_PAGE_MESSAGE
    }).getElement();
    const homeButton = new Button({
      className: ["button--homepage"],
      textContent: BUTTON_TITLES.home,
      callback: () => Router.followRoute(Route.Login)
    }).getElement();
    errorSection.append(heading, errorImage, message, homeButton);
    this.container.append(errorSection);
  }
}
class AuthorizationForm extends Component {
  constructor() {
    super({ tag: "form", className: "auth-form" });
    __publicField(this, "usernameInput");
    __publicField(this, "passwordInput");
    __publicField(this, "usernameError");
    __publicField(this, "passwordError");
    __publicField(this, "wsService");
    this.wsService = WebSocketService.getInstance();
    this.wsService.setLoginHandler(AuthorizationForm.loginUser.bind(this));
    this.usernameInput = AuthorizationForm.createFieldInput(
      SIGNIN_FORM.usernamePlaceholder,
      "text"
    );
    this.passwordInput = AuthorizationForm.createFieldInput(
      SIGNIN_FORM.passwordPlaceholder,
      "password"
    );
    this.usernameError = AuthorizationForm.createError(ERROR_TEXT.username);
    this.passwordError = AuthorizationForm.createError(ERROR_TEXT.password);
    this.render();
  }
  static createFieldInput(placeholder, inputType) {
    const fieldInput = new InputBuilder({
      tag: "input",
      className: ["auth-form__input", "input__field"],
      type: inputType,
      value: "",
      placeholder,
      readonly: false,
      attributes: inputType === "password" ? { autocomplete: "current-password" } : { autocomplete: "username" }
    });
    return fieldInput;
  }
  static createTooltip(tooltipText) {
    const tooltipIcon = new ElementBuilder({
      tag: "span",
      className: "auth-form__tooltip-icon",
      textContent: "?"
    }).getElement();
    const tooltip = new ElementBuilder({
      tag: "div",
      className: "auth-form__tooltip",
      textContent: tooltipText
    }).getElement();
    tooltipIcon.addEventListener("mouseenter", () => {
      tooltip.style.display = "block";
    });
    tooltipIcon.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });
    tooltipIcon.append(tooltip);
    return tooltipIcon;
  }
  static createError(errorText) {
    const error2 = new ElementBuilder({
      tag: "div",
      className: "auth-form__error",
      textContent: errorText
    }).getElement();
    return error2;
  }
  static validateUsername(username) {
    return username.length >= 5 && username.length <= 15;
  }
  static validatePassword(password) {
    return password.length >= 8 && password.length <= 20 && /[A-Z]/.test(password) && /\d/.test(password) && /[^\dA-Za-z]/.test(password);
  }
  static loginUser() {
    Router.followRoute(Route.Chat);
  }
  render() {
    const usernameField = this.createUsernameField();
    const passwordField = this.createPasswordField();
    const signinButton = new Button({
      className: ["button--signin"],
      textContent: BUTTON_TITLES.signin,
      callback: () => this.handleSignin()
    });
    signinButton.getElement().addEventListener("click", (event) => {
      event.preventDefault();
    });
    this.container.append(usernameField, passwordField, signinButton.getElement());
  }
  createUsernameField() {
    const usernameItem = new ElementBuilder({
      tag: "div",
      className: "auth-form__item"
    }).getElement();
    const usernameLabelContainer = new ElementBuilder({
      tag: "div",
      className: "auth-form__field-container"
    }).getElement();
    const usernameLabel = new ElementBuilder({
      tag: "label",
      className: "auth-form__label",
      textContent: SIGNIN_FORM.username
    }).getElement();
    const tooltip = AuthorizationForm.createTooltip(TOOLTIP_TEXT.username);
    usernameLabelContainer.append(usernameLabel, tooltip);
    usernameItem.append(
      usernameLabelContainer,
      this.usernameInput.getElement(),
      this.usernameError
    );
    this.usernameInput.getElement().addEventListener("click", () => {
      this.usernameInput.getElement().classList.remove("input__field--error");
      this.usernameError.classList.remove("auth-form__error--visible");
    });
    return usernameItem;
  }
  createPasswordField() {
    const passwordItem = new ElementBuilder({
      tag: "div",
      className: "auth-form__item"
    }).getElement();
    const passwordLabelContainer = new ElementBuilder({
      tag: "div",
      className: "auth-form__field-container"
    }).getElement();
    const passwordLabel = new ElementBuilder({
      tag: "label",
      className: "auth-form__label",
      textContent: SIGNIN_FORM.password
    }).getElement();
    const tooltip = AuthorizationForm.createTooltip(TOOLTIP_TEXT.password);
    passwordLabelContainer.append(passwordLabel, tooltip);
    passwordItem.append(
      passwordLabelContainer,
      this.passwordInput.getElement(),
      this.passwordError
    );
    this.passwordInput.getElement().addEventListener("click", () => {
      this.passwordInput.getElement().classList.remove("input__field--error");
      this.passwordError.classList.remove("auth-form__error--visible");
    });
    return passwordItem;
  }
  handleSignin() {
    const usernameValue = this.usernameInput.getValue();
    const passwordValue = this.passwordInput.getValue();
    if (AuthorizationForm.validateUsername(usernameValue)) {
      this.usernameError.classList.remove("auth-form__error--visible");
      this.usernameInput.getElement().classList.remove("input__field--error");
    } else {
      this.usernameError.classList.add("auth-form__error--visible");
      this.usernameInput.getElement().classList.add("input__field--error");
      return;
    }
    if (AuthorizationForm.validatePassword(passwordValue)) {
      this.passwordError.classList.remove("auth-form__error--visible");
      this.passwordInput.getElement().classList.remove("input__field--error");
    } else {
      this.passwordError.classList.add("auth-form__error--visible");
      this.passwordInput.getElement().classList.add("input__field--error");
      return;
    }
    try {
      this.wsService.sendLoginRequest(usernameValue, passwordValue);
    } catch (error2) {
      console.error("Login request error:", error2);
    }
  }
}
class LoginPage extends Component {
  constructor() {
    super({ tag: "main", className: "login" });
    __publicField(this, "authForm", new AuthorizationForm());
    this.render();
  }
  render() {
    const title = new ElementBuilder({
      tag: "h1",
      className: ["login__title"],
      textContent: PAGE_TITLES.login
    }).getElement();
    this.container.append(title, this.authForm.getElement());
  }
}
class LinkBuilder extends ElementBuilder {
  constructor(parameters) {
    super({ ...parameters });
    this.applyURL(parameters.href);
    this.applyTarget(parameters.target);
  }
  applyURL(url) {
    if (url && this.element instanceof HTMLAnchorElement) {
      this.element.href = url;
    }
  }
  applyTarget(target) {
    if (target && this.element instanceof HTMLAnchorElement) {
      this.element.target = target;
    }
  }
}
class Copyright extends Component {
  constructor() {
    super({ tag: "div", className: "footer__copyright" });
    this.render();
  }
  render() {
    const copyrightText = new ElementBuilder({
      tag: "p",
      className: "copyright__text",
      textContent: `${COPYRIGHT_TEXT} `
    }).getElement();
    const githubLink = new LinkBuilder({
      tag: "a",
      className: ["footer__link", "footer__link--copyright"],
      textContent: AUTHOR_NAME,
      href: GITHUB_URL,
      target: "_blank"
    }).getElement();
    this.container.append(githubLink, copyrightText);
  }
}
const logo = "data:image/svg+xml,%3csvg%20viewBox='0%200%2064%2064'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_5701_38384)'%3e%3ccircle%20cx='32'%20cy='32'%20r='32'%20fill='black'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M13%2021.5095V42.5L19.3067%2042.4621V33.9474C20.0567%2033.9474%2020.7616%2033.9775%2021.4049%2034.4267C21.8946%2034.8785%2022.2838%2035.4335%2022.546%2036.054L25.9202%2042.4621H33C31.5957%2039.6675%2030.4706%2036.1327%2028.0552%2034.0104C27.5455%2033.6749%2026.9919%2033.4158%2026.411%2033.241C27.1873%2033.0779%2027.9357%2032.7973%2028.6319%2032.4084C30.3855%2031.3375%2031.3915%2029.3808%2031.3436%2027.3374C31.3798%2026.1328%2031.0495%2024.9466%2030.3988%2023.9441C28.9256%2021.6883%2025.9337%2021.4213%2023.4663%2021.5095H13ZM21.9939%2030.0116H19.3313V25.6975H22.1043C23.4807%2025.5594%2025.1814%2026.1754%2025.0859%2027.8041C25.1499%2029.5621%2023.3647%2029.9127%2021.9939%2030.0116Z'%20fill='%23FFB749'/%3e%3cpath%20d='M39.4768%2035.089L33%2035.4666C33.1262%2037.3671%2034.0021%2039.16%2035.4636%2040.5088C36.9117%2041.8323%2039.5076%2042.4941%2043.2515%2042.4941C46.3564%2042.5823%2049.9058%2041.8146%2051.821%2039.1569C52.5929%2038.0934%2053.0033%2036.8427%2052.9998%2035.564C53.0217%2033.1848%2051.4339%2031.2297%2049.3044%2030.3147C47.2632%2029.4766%2045.1198%2028.8674%2042.9204%2028.5C42.1107%2028.41%2041.3327%2028.1563%2040.6423%2027.757C39.9039%2027.2597%2040.078%2026.2272%2040.735%2025.7596C42.6084%2024.5207%2045.6299%2025.5545%2045.8608%2027.9032L52.2845%2027.5621C52.1703%2025.768%2051.1844%2024.0545%2049.6356%2022.9583C47.6987%2021.8887%2045.4532%2021.3874%2043.1986%2021.5212C41.3493%2021.4527%2039.5037%2021.7218%2037.7682%2022.3128C35.6082%2023.1125%2033.829%2025.064%2033.8344%2027.4525C33.7931%2028.9377%2034.5158%2030.4088%2035.755%2031.3621C37.6454%2032.6238%2039.8325%2033.4582%2042.139%2033.798C43.3833%2033.9637%2044.5727%2034.3795%2045.6224%2035.0159C46.5878%2035.7309%2046.5807%2037.167%2045.5959%2037.8903C44.5078%2038.6532%2042.9034%2038.7416%2041.6818%2038.2468C40.3717%2037.716%2039.6048%2036.4784%2039.4768%2035.089Z'%20fill='%23FFB749'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_5701_38384'%3e%3crect%20width='64'%20height='64'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
class SchoolInfo extends Component {
  constructor() {
    super({ tag: "div", className: "footer__school-info" });
    this.render();
  }
  render() {
    const schoolName = new ElementBuilder({
      tag: "p",
      className: "school-info__name",
      textContent: SCHOOL_NAME
    }).getElement();
    const schoolLogo = new ImageBuilder({
      tag: "img",
      className: "school-info__logo",
      source: logo,
      alt: "RS School logo"
    }).getElement();
    const schoolLink = new LinkBuilder({
      tag: "a",
      className: ["footer__link", "footer__link--school"],
      href: SCHOOL_URL,
      target: "_blank"
    }).getElement();
    schoolLink.append(schoolLogo);
    this.container.append(schoolName, schoolLink);
  }
}
class Footer extends Component {
  constructor() {
    super({ tag: "footer", className: "footer" });
    __publicField(this, "copyright", new Copyright());
    __publicField(this, "schoolInfo", new SchoolInfo());
    this.render();
  }
  render() {
    const footerContainer = new ElementBuilder({
      tag: "div",
      className: "footer__container"
    }).getElement();
    footerContainer.append(this.copyright.getElement(), this.schoolInfo.getElement());
    this.container.append(footerContainer);
  }
}
class HeaderMenu extends Component {
  constructor() {
    super({ tag: "ul", className: "header__menu" });
    this.render();
  }
  render() {
    for (const item of MENU_ITEMS) {
      const menuItem = new ElementBuilder({
        tag: "li",
        className: "menu__item",
        textContent: item.name
      }).getElement();
      menuItem.addEventListener("click", () => {
        Router.followRoute(item.route);
      });
      this.container.append(menuItem);
    }
  }
}
const ruFlag = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAG7AAABuwE67OPiAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAcJQTFRF/////////4CA/////////////5+f/////////6qq7e3t/6Sk8fHx/5yq8vLy/6Ki9PT09fX19peh9vb29/f39/f39/f3+Jmg+Jif+Pj48/Pz+Zyi9PT0+pqf9fX19fX1+pme/5uk9vb2+5qj9/f3+52i8/Pz8/Pz9PT0+5uf9PT09fX1+Zib9fX19vb2+Zib9vb2/Jac9PT0+pac/JWd+pWa9vb29vb2+pOZ+5KZ9PT0n6PJ+5KY9PT0+5GY9fX19fX1rpO2+5GXio6/+5CX+5CW9vb2+4+V9fX19fX1+o2S9fX19fX19fX19fX19PT09fX1/ImP+4mP9fX19fX1/IaN+4WM9fX19vb2+4SL9fX1+4OJ9fX1/IGH/X2E+3yE9fX1+32C9fX1/XyD/XqB9PT09fX1/HmB9fX1/HZ+9fX1/HV99fX1/XJ69fX19fX1/W929fX1/W52/Wtz9vb2/Wpy9fX19fX19fX1/mNr/mNs9fX1/WBp/l9o/mBp/l1m9fX1/ltk9fX1/lli9fX1/lVf/lZf/1Jc/1NdQUebc3e0d0iHf1CMf1GMjl+T9fX1/lBa/lFb/0tV/0xW/01X/09ZAYI9hAAAAIl0Uk5TAAECBAYHCAkLDA4OEhITFhcZGx0eHyAjJSUrLC0wMjU3ODk6PDxBQkVFRk5PUFFSV1pbX2VqbW5xc3Z3d3h5f4OEhIeHiIuQlJWWl5mdoKaqq62ys7W4u72/w8PGytLT1dXW1tna29zd4OHj5Ojp7e3u7vHy8vP19/j4+fr6+vv8/P39/v7+/v7zaMZoAAABmklEQVRYw+2XRVcCcRRHR7G7uwsLO0BMxO7uFsUAWyzsDp4KfF8XDjgHpv7vsPLMXc+9q5kzv0dRfOT06vU9WRSW2EEAAICBaJQe0HwCNKYmf2Ldq2IbGGyWEfrps+DCdBqBHtl/D27c9kWI1H0bjoGVwzofMX6JHjhZKxLUUyaBl4kkXj2s6xoEuO4M4dRltXsggp0aGbtfuAwiWcxn0RNHgYCRRBc9qP0ciDhvD2L6eUYgxpj358tNgMAkdwZ0gELn8GMASRwdKMIGHC+2AhtQeCqgfkWipgOtL0hapYAUkAJS4P8FWizvbwg+LC10QPuNROupgAYb0NCBXGwg0/F7vsD5F859oPrC+F+qv4mivCP375TMkRQ1ZyfT7XNRLjutwEDiGwpYlmL9mVj9tJF9qvoNPYrRH4b9ONdy/LxNSLctJPDu9eJdfn+/VPBi0Fxy6+Y2MSdL4Ngzu/40Hizyakpetbrr1vVUgrut/MDVP6okvBw7rpj6Tbc38e0aOuX8xD5nwlHXc8bGr7+VTWGpWjKbV6p5H/kB5wH7UDhsCE8AAAAASUVORK5CYII=";
const ukFlag = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAG7AAABuwE67OPiAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAqxQTFRF////////////larV7e3t2dnm9vb29/f3+ezsl5fF89zclJjFlZnIlJjG+5uf9PHxkZTC9fX19sbJ9ufnkZbE+pabrK/RkJPDs7XU/Zab9vb29vb2jZLC+5GY+5KZ9fX19fX1i4+/io6/+5CX9vb2io6/9uLi+a6xgIS7eHu29fX19fX1+32C/XyD+4WM+4mQc3i0+oaM/Xd+/XN7/XJ6/XN79fX1Z2yu9fX1Y2isfoK5/XN69fX1/W529fX1V1ymV12m9fX1/l9oU1ikSlCg/lxlQUebQkibQkicQ0mcREqcRUudRkydRkyeSU+fTFGgUVajVFmlWmCoX2SqaG2ubXGxbXKxd3u2eX23fYG5iY2/j5PCm57IpKfMr7HStrjWuLrWwcPbx8neyMne0NLj1dbl19jm3N3p4eHr5ufu6env6urv7u7x8PDz8/P09PT09e3t9e7v9e/v9fDw9fDx9fLy9fPz9fT09fX19tze9t3e9t7f9t7g9t/g9uHi9uTl9uXm9ufo9ujo9ujp9urr9uzt98vN98zO98zP987Q987R98/R99DS99HT99LU99PV99bY99ja99rb99rc+Lq9+Lq++Lu++LzA+L/C+MDD+MHE+MPG+MTH+MfK+MrN+amt+ayx+a2x+bC0+bK2+bO3+ba5+bm9+pie+pyh+p6j+p+k+qCl+qKn+qSo+qaq+qar+qes+qis+4qR+4yS+46U+5CW+5GX+5KY+5OZ+5Wb/HqC/HuC/H6F/H+G/ICH/IGI/IKJ/IWM/WVt/Wdv/Wpy/Wx0/W93/XB4/XF5/XJ5/XV9/lRd/lVe/lZf/lZg/lhi/lli/lpj/lxl/l5n/mBo/mBp/mJr/mNs/mRs/mRt/0tV/0xW/01X/05Y/09Z/1BZ/1Ba/1Fb/1Jb/1JcAVk3DwAAAEZ0Uk5TAAQJDA4UHCAoLCw+QUNFSE9QVVVaZmlqa2tsbXB5en6AhIeHjJCUq7TR1NXV1tfY2dvm5+jo6e3t8fT09fX3+vr6+vz+/rF3TQsAAAOBSURBVFjD7ZfndxRlGMWXEEQUEaQIikpVUFCw0FRKwIcSDKEGQiiB0EOACNmfKIYYCzYQrKBiF3VAxV6xAjFqJIoodyFR+Ef8kF2yszuzSTbr8QvP13nv75yZ885z7w0EEk23gRkZAzoHkp3WgyVJuvacpORpPUZW1gEqb7kiren6viMgAoARfZso7zTcZkUDZtnwTk2Qtxk0wWIBNmFQm0bKW/YbZxYPMBvXr2Vj9D1Hm3kDzEb3bFDefqiZP8BsaPuE8lb9J1pigE3s38pX3uLSYQszGwJkLhx2SQtv/YXXAIunJAZMWQwP33qZh7zdjV+sBVgyNRFg6hJ49m/p+nNj5OlX1UgHNwMsn+4PmL4cXgpJVVvG9EmP1ncZEnxT0h9PAKya6QeYuYrgHklHdwBDutTru0/OLeKVE1LVFoDVc7wBc1az/ltJB0uBotzbLz4DGGuWU8iuU1LtMwBr5noB5q7hvkpJn68FCnPMRkX0bc3MZqzg0SNS6EUA5o2PBYyfB/d8L+mDDcCKGWZm50cur5mZTVvGxmOSPgsCLMh0AzIXwOO/SXobYNk0MzOLXOxedZ84u4CyQ5K+uQNg0exowOxF8MJP0snXAAqy6xS93ADLymfdl5J+LAdYGQ1YCa+flE4/D5CfZd4AmzSfko8kHd8EEA2AvZKqtwHMn2R+ALM82CepemsMoORDSd9tAsirPx0BdM2rn6Ww03Gc/evdgIccx9lbDrA06nDXMKADPhP9Cl7TIVWAjpt9pqIOUOH3vGMY0FtJTu+zgLOAVAKafZX//78xZqFAqeM4zjY34AHHcfbd771Q3CsNdhyVtCfoBmx4X9IPpZ4rLXqpAg9WSaGX41/hLUm/b0+0VLPyAZ6ulf7ZGb/W4dUT0i+7/dd6dgHA/pD06yNexgLPnZZqnow3ljPWBsFPJR2709vaYGu1FHo3ztouCJsrFB+QdKjMz1zh7uOSPgmGzbWt297h3sOSvlrnb+9QXiHpQDGFOWZj3QED7vpL0scliQIGFH8t6XAZRbmTu0dHHOCxI1LonQYiTvgz/bnRFXECgfQ+Y3adkmreaDhkwXsh6bYr02Ny2nk3ST/vbkzMg6dqb2jnkRQvv3l744ImV1/030Td5oftFMT9FBSOFFSe5peuFNS+FBRPd/Ud2SMtufJ9XR1gcOuk+3vnARkZA7slPPIv2rdH+Xno46EAAAAASUVORK5CYII=";
class LanguageSelector extends Component {
  constructor() {
    super({
      tag: "div",
      className: "header__language-option"
    });
    __publicField(this, "isOpen", false);
    __publicField(this, "languageDropdown", new ElementBuilder({
      tag: "div",
      className: "header__language-dropdown"
    }).getElement());
    __publicField(this, "languageSelectorUtility", new LanguageSelectorUtility());
    __publicField(this, "currentLanguage", this.languageSelectorUtility.getLanguage());
    __publicField(this, "currentFlag", new ImageBuilder({
      tag: "img",
      className: "header__language-flag",
      source: this.currentLanguage === "en" ? ukFlag : ruFlag,
      alt: this.currentLanguage === "en" ? "UK Flag" : "Russian Flag"
    }).getElement());
    this.render();
    this.addEventListeners();
  }
  render() {
    const languageSelector2 = new ElementBuilder({
      tag: "div",
      className: "header__language-selector",
      callback: () => {
        this.showDropdown();
      }
    }).getElement();
    const enOption = this.createLanguageItem("en", ukFlag, "English");
    const ruOption = this.createLanguageItem("ru", ruFlag, "Русский");
    languageSelector2.append(this.currentFlag);
    this.languageDropdown.append(enOption, ruOption);
    this.container.append(languageSelector2, this.languageDropdown);
  }
  createLanguageItem(language2, flag, text) {
    const languageItem = new ElementBuilder({
      tag: "div",
      className: "header__language-item",
      callback: () => {
        this.changeLanguage(language2);
      }
    }).getElement();
    const countryFlag = new ImageBuilder({
      tag: "img",
      className: "header__language-flag",
      source: flag,
      alt: language2 === "en" ? "UK Flag" : "Russian Flag"
    }).getElement();
    const languageText = new ElementBuilder({
      tag: "span",
      className: "header__language-text",
      textContent: text
    }).getElement();
    languageItem.append(countryFlag, languageText);
    return languageItem;
  }
  addEventListeners() {
    globalThis.addEventListener("click", (event) => {
      if (this.isOpen && event.target !== null && event.target instanceof Node && !this.container.contains(event.target)) {
        this.closeDropdown();
      }
    });
    document.addEventListener("languageChange", (event) => {
      if (isLanguageChangeEvent(event)) {
        this.currentLanguage = event.detail.language;
        if (this.currentFlag instanceof HTMLImageElement) {
          this.currentFlag.src = this.currentLanguage === "en" ? ukFlag : ruFlag;
          this.currentFlag.alt = this.currentLanguage === "en" ? "UK Flag" : "Russian Flag";
        }
      }
    });
  }
  showDropdown() {
    this.isOpen = !this.isOpen;
    if (this.languageDropdown) {
      this.languageDropdown.classList.toggle("header__language-dropdown--active");
    }
  }
  closeDropdown() {
    if (this.isOpen && this.languageDropdown) {
      this.isOpen = false;
      this.languageDropdown.classList.remove("header__language-dropdown--active");
    }
  }
  changeLanguage(language2) {
    if (language2 === this.currentLanguage) {
      this.closeDropdown();
      return;
    }
    this.languageSelectorUtility.setLanguage(language2);
    this.closeDropdown();
    globalThis.location.reload();
  }
}
const darkIcon = "data:image/png;base64,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";
const lightIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAC7gAAAu4Bks13cwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASxSURBVHic7ZtNaFVHFMd/J+YDHglaqLgQJBFE2mehYLS460KkFltqXZR268qFrsUupIvgSogLwYW4UVDIplKhm+4lpW5SE7ISLLiotimlUHx5SU4XM21f5s28N/feue/e4DtwyLuXmfPxn8/7n4moKlWIiJwE5uzj16r6QyVxVAGAiOwCngEH7KtfgIOqujnoWEYG7dBKk/+Tx/5uVhFIVQD4/FYSS1UA1EaGAFQdQNUyBCC2oIjsF5FGIr/tyHeZRUQaIrI/uoKq9lXgJrAB/A5cjKnTx54Aq4BaXcXuSQravWhj3ABuRtWJMHoI2OoIVoHLCYKdBR5anU1g77IT4xZwKAUA+4B1x3gSEFKpJ3m1Me8rDIB1cMPjoBYgBJJX4EZU/UgnI8CduoHQI/k7wEgyACJAOF5B8seLJp8JgD4gXM+ZRANo5Kx7vWjymQHoAcKpiHp7gK+AB8DPwFpH/TX77j7wBTAVYe9U0eRzAWCdC/A5cM/+Da7hwGFgIbCShPQ1cBeY6RPDORvD2V4xJAcgEqTdwC3MDi82cVdbwDwwWVqcJSV/EFgpkLirS8B0GbEmp8RE5APgEfB2oEgbWAaeWAU4arUJjAXqvQI+UdXFdNGStgcA08BLwq34ITDRo/6ELbMUsPEKwx3WbwgAk4HANzDs73gGW+O2zobH3gqwu44AzHuCfQYcK2DzmLXh2r1VKwCAGcyM7bZ87uQdENye0AYO1wmAu55WmkvYu+Y89hdqAQAwhdm4uBNe9JiP8DHumV/WgT1FbafgBD/GzN6dcklV1xPYBsDauuS8HrO+C0kKAD5zntvA4wR2XXlMN2/4aVGjo/DfWV0TPyBtYEVtX/TIEed5WVVbRQNzRVVbIrIMvN/xOnicJiICvIt/Y7WFiXMT4CTwnN5b0VUCvB3bv+oUuJ1q7Ht83XZ8rQXKzbKddPXpc5s7i30K/qsPPY4annIXSgTggsdfF5+AIVpjclocYXg4wmnM+fwbOQRGVfV7EZkh/yT4Anir4/loJviziWv7ha+Qqv4kIu8QMQmO2gqbmI1GHnnK9pWgKSITqVcCEZmge9Z/GipvG2y5n90U4/9b53kMOJHArisn6G5N13d2STAuq9oKvyaCPO2nhXuAqv6FIT075T3galHbHXLV2uyUBeu7mCRqoUF/DrfowRhnsp+wmw6SEJlPFndCAAZFiS2RkCZPBoANfJpySdGXJKbHy6LFvwP2BorkpcV/A85onWlxpyeEWjGPrpCYDi9lCDggTGImRnd1yKJtzPFaMho8CQCYg8mzmIPJc/Q+HJ3BkKbuZqmXrmP2FkHmF9iFOUm+B5weGADkPx6fsgHfJ3w8/gBzhN6X7AS+dGK4VjoAgeSVai5I+Kj4zCCkSF6p5orMR4FYMoGQIvkqL0ldKwpCrKM6X5MLgXAlCQDsjIuSPhD+JOauUYTxnXJV1gWhRcKbojvlsvQV2/It4JuYOtHfAvYK+h+q+ndUhd62mnTzeUdUtS+HF2F7CrO0/hpTfjTWsKp6Gdic4vvgCX0EZRI1LFE0U/TGH4oMAag6gKplCEBFfrci35Uuw3+eHrRDAJvoeeBHq+erSB7gH8F+2j0aLdzTAAAAAElFTkSuQmCC";
class ThemeSelector extends Component {
  constructor() {
    super({
      tag: "div",
      className: "header__theme-option"
    });
    __publicField(this, "currentTheme", "dark");
    __publicField(this, "isOpen", false);
    __publicField(this, "themeDropdown", new ElementBuilder({
      tag: "div",
      className: "header__theme-dropdown"
    }).getElement());
    __publicField(this, "currentIcon", new ImageBuilder({
      tag: "img",
      className: "header__theme-icon",
      source: this.currentTheme === "dark" ? darkIcon : lightIcon,
      alt: this.currentTheme === "dark" ? "Moon Icon" : "Sun Icon"
    }).getElement());
    this.loadTheme();
    this.render();
    this.addEventListeners();
  }
  render() {
    const themeSelector = new ElementBuilder({
      tag: "div",
      className: "header__theme-selector",
      callback: () => {
        this.showDropdown();
      }
    }).getElement();
    const darkOption = this.createThemeItem("dark", darkIcon, THEME_OPTIONS.darkTheme);
    const lightOption = this.createThemeItem("light", lightIcon, THEME_OPTIONS.lightTheme);
    themeSelector.append(this.currentIcon);
    this.themeDropdown.append(darkOption, lightOption);
    this.container.append(themeSelector, this.themeDropdown);
  }
  loadTheme() {
    const savedTheme = localStorage.getItem("fun-chat-konstantin-theme");
    if (savedTheme === void 0) {
      this.currentTheme = "dark";
    } else if (savedTheme === "dark" || savedTheme === "light") {
      this.currentTheme = savedTheme;
    } else {
      this.currentTheme = "dark";
    }
    this.applyTheme(this.currentTheme);
  }
  createThemeItem(theme, icon2, text) {
    const themeItem = new ElementBuilder({
      tag: "div",
      className: "header__theme-item",
      callback: () => {
        this.changeTheme(theme);
      }
    }).getElement();
    const themeIcon = new ImageBuilder({
      tag: "img",
      className: "header__theme-icon",
      source: icon2,
      alt: theme === "dark" ? "Moon Icon" : "Sun Icon"
    }).getElement();
    const themeText = new ElementBuilder({
      tag: "span",
      className: "header__theme-text",
      textContent: text
    }).getElement();
    themeItem.append(themeIcon, themeText);
    return themeItem;
  }
  addEventListeners() {
    globalThis.addEventListener("click", (event) => {
      if (this.isOpen && event.target !== null && event.target instanceof Node && !this.container.contains(event.target)) {
        this.closeDropdown();
      }
    });
  }
  showDropdown() {
    this.isOpen = !this.isOpen;
    if (this.themeDropdown) {
      this.themeDropdown.classList.toggle("header__theme-dropdown--active");
    }
  }
  closeDropdown() {
    if (this.isOpen && this.themeDropdown) {
      this.isOpen = false;
      this.themeDropdown.classList.remove("header__theme-dropdown--active");
    }
  }
  applyTheme(theme) {
    if (theme === "light") {
      document.body.classList.add("body--light-theme");
    } else {
      document.body.classList.remove("body--light-theme");
    }
    if (this.currentIcon instanceof HTMLImageElement) {
      this.currentIcon.src = theme === "dark" ? darkIcon : lightIcon;
      this.currentIcon.alt = theme === "dark" ? "Moon Icon" : "Sun Icon";
    }
  }
  changeTheme(theme) {
    if (theme === this.currentTheme) {
      this.closeDropdown();
      return;
    }
    this.currentTheme = theme;
    this.applyTheme(theme);
    localStorage.setItem("fun-chat-konstantin-theme", theme);
    this.closeDropdown();
  }
}
const icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAACdeAAAnXgHPwViOAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA81JREFUeJztmstvTUEcxz+3rVC9hDbUu2g8YoFEQppqIt6JYEH6BxALGxtC2CASaaxIVyIWJCINERWPNFWPiCgWiJSUkKIvEQlFVWivxRxJ7+1v7jn3zpxzD84nmc3k/L7z/U1vz5n5zUBERETEf0wsB2POAZYDk4ApTl870Ak0AS9y4Ml3RgC7gOdAwqU9A3Y6Mf8E1cBb3BNPbW+AzTnwa40YcIDME09tx4C8YK2bEwNOY578n3YqWPvm7CN9QgNAC3DVaS1OX7qYPYFmYEAF0I+cxBdgPzBZiJsCHHSekWL7gcU+e7fCTeQEngIzPMTPdJ6VNG774Ncqq5CNvwSKM9ApAV5ptFZY9GudE8j/74uy0FqC/F44bsWpD+QB3Qw1fN5A84Kg10VIP4tlyD/ZTQaa1RrNqUZOB2FzJido+h8aaN7X9E800EzC5gSUavrfG2h2ZzhWxticgB5N/2gDzTGa/s8GmknYnIBOTf9cA01dbJeBZhI2J+Ad8EPo32CgKcX2OWOFkisMfWP3AOOz0BqH+qmn6l2y4tQntiF/turIrPoUQ60fJK2tFv1aZyTQgWz8KJDvQSMfqNVotAOF1l1bRvcrSAA3gPlpYhcCt9LEb7Ft1o+iaD5wDbUxkhgAmoFGVNkLYLrz/BL0L+YGYB1qWxx6xgKt2KsItTqafxVlwGPMk38ETAvYuzXiwFmyT/4MUBS4ax+oAu7hPfG7wNIgjAV9MjQP2Iiq6kwm+WSoA7gO1KMOUCIiIiIi/Mb2V6AIqAQWoJa3Y4Bhhpo/gU9AG2phdRfoNdS0SgxYiyph/8De8lfX+pyx1gSRnBsVqKqv30nr2gPUBipwCoAa9IegQbZ+1Gl0YIu6kcilr1y3OsdbRmQ6a8OBy8BKl+e+Aa9RS9yvmZpKIY5aMpfjnuBl1FJ7wHBMLSdJ/1e4CKzHn7JVoaNd7+KhxoexAf05XQJ1ta3Sr4EFqlBH7jo/JqV4kVGogw9psCZyU60pRn8ZoxXz9UcSuzUDtWB29GVKHHgi+EoA220Nkod8z68Xb1de/KYc+M5Qf21YOvlaJoj7+rLJgiPIHqtsiB8WhH+hjq7CQinKU6rPQzbEmwThMN7WusNQn41uQV7+R2ZpBgsbkqfZbkFeJqBE6OvwEBc0kifJexJeJkBa1X30EBc0H4Q+172BlwmQ9gsJD3FBI3ly3euE8r5dkHiZAOk+TrttIxaQ7ihZeVftJfnT0owqiISNAtS9wsFeXa/Ye60HVAOrUReYazHf4/tFHNiBunHeAJzLrZ2IiIiIkPMbLf49Y5eyUGIAAAAASUVORK5CYII=";
class UserInfo extends Component {
  constructor() {
    super({
      tag: "div",
      className: "header__user-info"
    });
    __publicField(this, "isLoggedIn", false);
    __publicField(this, "username", "");
    __publicField(this, "wsService");
    this.wsService = WebSocketService.getInstance();
    const currentUser = this.wsService.getCurrentUser();
    this.isLoggedIn = currentUser !== null;
    this.username = (currentUser == null ? void 0 : currentUser.login) || "";
    this.wsService.setLoginHandler(this.loginUser.bind(this));
    this.wsService.setLogoutHandler(this.logoutUser.bind(this));
    this.render();
  }
  static handleLogin() {
    Router.followRoute(Route.Login);
  }
  render() {
    const userIcon = new ImageBuilder({
      tag: "img",
      className: "header__user-icon",
      source: icon,
      alt: "User icon"
    }).getElement();
    const status = new ElementBuilder({
      tag: "div",
      className: "header__status"
    }).getElement();
    if (this.isLoggedIn) {
      const userName = new ElementBuilder({
        tag: "span",
        className: "header__username",
        textContent: this.username
      }).getElement();
      status.classList.add("header__status--online");
      const logoutButton = new Button({
        className: ["button--logout"],
        textContent: BUTTON_TITLES.logout,
        callback: () => this.handleLogout()
      }).getElement();
      this.container.append(status, userIcon, userName, logoutButton);
    } else {
      status.classList.remove("header__status--online");
      const loginButton = new Button({
        className: ["button--login"],
        textContent: BUTTON_TITLES.login,
        callback: () => UserInfo.handleLogin()
      }).getElement();
      this.container.append(status, userIcon, loginButton);
    }
  }
  handleLogout() {
    this.wsService.sendLogoutRequest();
  }
  loginUser(user) {
    this.isLoggedIn = true;
    this.username = user.login;
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }
    this.render();
  }
  logoutUser() {
    this.isLoggedIn = false;
    this.username = "";
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }
    this.render();
    Router.followRoute(Route.Login);
  }
}
class HeaderSubMenu extends Component {
  constructor() {
    super({ tag: "ul", className: "header__submenu" });
    __publicField(this, "userInfo", new UserInfo());
    __publicField(this, "languageSelector", new LanguageSelector());
    __publicField(this, "themeSelector", new ThemeSelector());
    this.render();
  }
  render() {
    const submenuContainer = new ElementBuilder({
      tag: "div",
      className: "header__submenu--container"
    }).getElement();
    submenuContainer.append(
      this.languageSelector.getElement(),
      this.themeSelector.getElement(),
      this.userInfo.getElement()
    );
    this.container.append(submenuContainer);
  }
}
class Header extends Component {
  constructor() {
    super({ tag: "header", className: "header" });
    __publicField(this, "menu", new HeaderMenu());
    __publicField(this, "submenu", new HeaderSubMenu());
    this.render();
  }
  render() {
    const headerContainer = new ElementBuilder({
      tag: "div",
      className: "header__container"
    }).getElement();
    const logo2 = new ElementBuilder({
      tag: "h1",
      className: "header__logo",
      textContent: APP_NAME
    }).getElement();
    headerContainer.append(logo2, this.menu.getElement());
    this.container.append(this.submenu.getElement(), headerContainer);
  }
}
class App extends Component {
  constructor() {
    super({ tag: "div", className: "app" });
    __publicField(this, "header", new Header());
    __publicField(this, "loginPage", new LoginPage());
    __publicField(this, "aboutPage", new AboutPage());
    __publicField(this, "chatPage", new ChatPage());
    __publicField(this, "errorPage", new ErrorPage());
    __publicField(this, "footer", new Footer());
    __publicField(this, "router");
    __publicField(this, "currentPage", this.loginPage);
    __publicField(this, "wsService");
    this.router = new Router(Route.Login);
    this.wsService = WebSocketService.getInstance();
    this.setupRoutes();
    this.render();
  }
  render() {
    this.container.append(
      this.header.getElement(),
      this.currentPage.getElement(),
      this.footer.getElement()
    );
  }
  setupRoutes() {
    this.router.addRoute(Route.Login, () => {
      if (this.wsService.getCurrentUser()) {
        Router.followRoute(Route.Chat);
        return;
      }
      this.showPage(this.loginPage);
    });
    this.router.addRoute(Route.Chat, () => {
      if (!this.wsService.getCurrentUser()) {
        Router.followRoute(Route.Login);
        return;
      }
      this.showPage(this.chatPage);
    });
    this.router.addRoute(Route.About, () => this.showPage(this.aboutPage));
    this.router.addRoute(Route.Error, () => this.showPage(this.errorPage));
  }
  showPage(newPage) {
    if (this.currentPage !== newPage) {
      this.currentPage.getElement().remove();
      this.currentPage = newPage;
      this.container.insertBefore(this.currentPage.getElement(), this.footer.getElement());
    }
  }
}
const app = new App();
document.body.append(app.getElement());
//# sourceMappingURL=main-BqdeWi0i.js.map
