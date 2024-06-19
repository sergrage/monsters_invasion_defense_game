import { Router } from "express";
import {
  fetchAllThreads,
  fetchThread,
  storeThread,
  updateThread,
  deleteThread,
} from "./../controllers/ForumThreadController";
import {
  storeMessage,
  updateMessage,
  deleteMessage,
} from "./../controllers/ForumMessageController";
import {
  storeMessageReply,
  updateMessageReply,
  deleteMessageReply,
} from "./../controllers/ForumMessageReplyController";

import { auth } from "./../middleware/auth";

const router = Router();

router.get("/", auth, (_, res) => res.send("This is root!"));

router.get("/forum_thread", auth, fetchAllThreads);
router.get("/forum_thread/:threadId", auth, fetchThread);
router.post("/forum_thread", auth, storeThread);
router.put("/forum_thread/:threadId", auth, updateThread);
router.delete("/forum_thread/:threadId", auth, deleteThread);

router.post("/forum_message", auth, storeMessage);
router.put("/forum_message/:messageId", auth, updateMessage);
router.delete("/forum_message/:messageId", auth, deleteMessage);

router.post("/forum_message_reply", auth, storeMessageReply);
router.put("/forum_message_reply/:messageReplyId", auth, updateMessageReply);
router.delete("/forum_message_reply/:messageReplyId", auth, deleteMessageReply);

export default router;
