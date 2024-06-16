import ForumMessageReply from "./../models/ForumMessageReply";

import { Request, Response } from "express";

export const storeMessageReply = async (req: Request, res: Response) => {
  try {
    const newMessageReply = await ForumMessageReply.create({
      text: req.body.text,
      message_id: req.body.message_id,
      created_by: req.body.created_by,
    });
    return res.status(200).json(newMessageReply); //create success
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};

export const updateMessageReply = async (req: Request, res: Response) => {
  const messageReplyId = parseInt(req.params.messageReplyId);
  try {
    await ForumMessageReply.update(
      {
        text: req.body.text,
        message_id: req.body.thread_id,
        created_by: req.body.created_by,
      },
      {
        where: {
          id: messageReplyId,
        },
      },
    );
    return res.status(204).json({ status: "success" }); //update success
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};

export const deleteMessageReply = async (req: Request, res: Response) => {
  const messageReplyId = parseInt(req.params.messageReplyId);
  try {
    // удаляем ответ на сообщение
    await ForumMessageReply.destroy({
      where: {
        id: messageReplyId,
      },
    });
    return res.status(200).json({ status: "success" });
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};
