import ForumMessageReply from "./../models/ForumMessageReply";
import ForumMessage from "./../models/ForumMessage";

import { Request, Response } from "express";

export const storeMessage = async (req: Request, res: Response) => {
  try {
    const newMessage = await ForumMessage.create({
      text: req.body.text,
      thread_id: req.body.thread_id,
      login: req.body.login,
    });
    return res.status(200).json(newMessage); //create success
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};

export const updateMessage = async (req: Request, res: Response) => {
  const messageId = parseInt(req.params.messageId);
  try {
    await ForumMessage.update(
      {
        text: req.body.text,
        thread_id: req.body.thread_id,
        login: req.body.login,
      },
      {
        where: {
          id: messageId,
        },
      },
    );
    return res.status(204).json({ status: "success" }); //update success
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};

export const deleteMessage = async (req: Request, res: Response) => {
  const messageId = parseInt(req.params.messageId);
  try {
    // удаляем ответы
    await ForumMessageReply.destroy({
      where: {
        message_id: messageId,
      },
    });
    // удаляем сообщение
    await ForumMessage.destroy({
      where: {
        id: messageId,
      },
    });

    return res.status(200).json({ status: "success" }); //delete success
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};
