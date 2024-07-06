const serverPort = __SERVER_PORT__;

export const baseApiUrl: string = `http://localhost:${serverPort}/api`;
export const baseYandexUrl: string = `${baseApiUrl}/v2`;

export const authUrl: string = `${baseYandexUrl}/auth`;
export const userUrl: string = `${baseYandexUrl}/user`;
export const oAuthUrl: string = `${baseYandexUrl}/oauth/yandex`;

export const getLeadersUrl: string = `${baseYandexUrl}/leaderboard/all`;
export const addLeadersUrl: string = `${baseYandexUrl}/leaderboard`;

export const allThreadsUrl: string = `${baseApiUrl}/forum_thread`;
