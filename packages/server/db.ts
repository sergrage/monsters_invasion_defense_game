import ForumThread from "./models/ForumThread";
import ForumMessage from "./models/ForumMessage";
import ForumMessageReply from "./models/ForumMessageReply";
import ThemeType from "./models/ThemeType";

import sequelize from "./db/sequlizeInit";

export const dbInit = async () => {
  try {
    ForumThread.hasMany(ForumMessage, {
      foreignKey: "thread_id",
    });

    ForumMessage.hasMany(ForumMessageReply, {
      foreignKey: "message_id",
    });

    await ForumThread.sync();
    await ForumMessage.sync();
    await ForumMessageReply.sync();

    await ThemeType.sync();

    console.log("All models were synchronized successfully.");
  } catch (e) {
    console.log("Init DB error", e);
  }

  return sequelize;
};
