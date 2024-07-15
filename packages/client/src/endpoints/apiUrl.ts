export const baseApiUrl: string = `${window.location.origin}/api`;
export const baseYandexUrl: string = `${baseApiUrl}/v2`;

export const authUrl: string = `${baseYandexUrl}/auth`;
export const userUrl: string = `${baseYandexUrl}/user`;
export const oAuthUrl: string = `${baseYandexUrl}/oauth/yandex`;

export const getLeadersUrl: string = `${baseYandexUrl}/leaderboard/all`;
export const addLeadersUrl: string = `${baseYandexUrl}/leaderboard`;
//Forum
export const allThreadsUrl: string = `${baseApiUrl}/forum_thread`;
export const messagesUrl: string = `${baseApiUrl}/forum_message`;
export const getThemeUrl: string = `${baseApiUrl}/theme_type`;
