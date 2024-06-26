import ForumMessageReaction from "./../models/ForumMessageReaction";

import { Request, Response } from "express";

export const storeMessageReaction = async (req: Request, res: Response) => {
  try {
    const newMessageReaction = await ForumMessageReaction.create({
      text: req.body.text,
      message_id: req.body.message_id,
      login: req.body.login,
    });
    return res.status(200).json(newMessageReaction); //create success
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};

export const updateMessageReaction = async (req: Request, res: Response) => {
  const messageReactionId = parseInt(req.params.messageReplyId);
  try {
    await ForumMessageReaction.update(
      {
        text: req.body.text,
        message_id: req.body.thread_id,
        login: req.body.login,
      },
      {
        where: {
          id: messageReactionId,
        },
      },
    );
    return res.status(204).json({ status: "success" }); //update success
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};

export const deleteMessageReaction = async (req: Request, res: Response) => {
  const messageReactionId = parseInt(req.params.messageReplyId);
  try {
    // удаляем ответ на сообщение
    await ForumMessageReaction.destroy({
      where: {
        id: messageReactionId,
      },
    });
    return res.status(200).json({ status: "success" });
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};
