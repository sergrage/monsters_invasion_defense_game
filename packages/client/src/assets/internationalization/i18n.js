import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        login: "Login",
        password: "Password",
        Signin: "Sign in",
        Signup: "Sign up",
        StartGame: "Start Game",
        LeaderBoard: "Leader Board",
        GameForum: "Game Forum",
        FullScreen: "Full Screen",
        rank: "Rank",
        kills: "Kills",
        user: "User",
        TotalMoney: "Total Money",
        date: "Date",
        topics: "Topics",
        messages: "Messages",
        views: "Views",
        AskQuestion: "Ask question",
        FirstName: "First name",
        SecondName: "Second name",
        UserName: "UserName",
        Phone: "Phone",
        Login: "Login",
        Email: "Email",
        ChangePassword: "Change password",
        TopicTitle: "Topic Title",
        FirstMessage: "First Message",
        AddNewTopic: "Add New Topic",
        Close: "Close",
        SendMessage: "Send Message",
      },
    },
    ru: {
      translation: {
        Login: "Логин",
        Password: "Пароль",
        Signin: "Вход",
        Signup: "Регистрация",
        StartGame: "Начать игру",
        LeaderBoard: "Список лидеров",
        GameForum: "Игровой форум",
        FullScreen: "Полный экран",
        Rank: "Ранг",
        Kills: "Убийства",
        User: "Пользователь",
        TotalMoney: "Деньги",
        Date: "Дата",
        Topics: "Темы",
        views: "Просмотры",
        AskQuestion: "Задать вопрос",
        Email: "Электронная почта",
        Messages: "Сообщения",
        Views: "Просмотры",
        FirstName: "Имя",
        SecondName: "Фамилия",
        UserName: "Имя пользователя",
        Phone: "Телефон",
        ChangePassword: "Сменить пароль",
        TopicTitle: "Тема обсуждения",
        FirstMessage: "Сообщение",
        AddNewTopic: "Добавить новую тему",
        Close: "Закрыть",
        SendMessage: "Отправить сообщение",
      },
    },
  },
  lng: "en", // язык по умолчанию
  fallbackLng: "en", // язык, используемый при отсутствии перевода
  interpolation: {
    escapeValue: false, // для React это не требуется
  },
});

export default i18n;
