import { Op } from "sequelize";
import { Request, Response } from "express";

import ForumThread from "./../models/ForumThread";
import ForumMessage from "./../models/ForumMessage";
import ForumMessageReply from "./../models/ForumMessageReply";

export const fetchAllThreads = async (_: Request, res: Response) => {
  const forumThreads = await ForumThread.findAll({
    include: [{ model: ForumMessage, include: [ForumMessageReply] }],
    order: [[ForumMessage, "createdAt", "ASC"]],
  });
  return res.json(forumThreads);
};

export const fetchThread = async (req: Request, res: Response) => {
  const threadId = parseInt(req.params.threadId);
  const forumThread = await ForumThread.findOne({
    where: { id: threadId },
    include: [{ model: ForumMessage, include: [ForumMessageReply] }],
  });
  return res.json(forumThread);
};

export const storeThread = async (req: Request, res: Response) => {
  try {
    const newforumThread = await ForumThread.create({
      title: req.body.title,
      views: 0,
      created_by: req.body.created_by,
    });
    return res.status(200).json(newforumThread); //create success
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};

export const updateThread = async (req: Request, res: Response) => {
  const threadId = parseInt(req.params.threadId);
  try {
    await ForumThread.update(
      { title: req.body.title, created_by: req.body.created_by },
      {
        where: {
          id: threadId,
        },
      },
    );
    return res.status(204).json({ status: "success" }); //update success
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};

export const deleteThread = async (req: Request, res: Response) => {
  const threadId = parseInt(req.params.threadId);
  try {
    // удаляем ветку форума
    await ForumThread.destroy({
      where: {
        id: threadId,
      },
    });

    const messages = await ForumMessage.findAll({
      where: {
        thread_id: threadId,
      },
    });

    // удаляем сообщения
    await ForumMessageReply.destroy({
      where: {
        message_id: {
          [Op.or]: messages.map(item => item.id),
        },
      },
    });

    // удаляем ответы
    await ForumMessage.destroy({
      where: {
        id: {
          [Op.or]: messages.map(item => item.id),
        },
      },
    });
    return res.status(200).json({ status: "success" });
  } catch (err) {
    return res.status(400).json(err); //Bad Request - validation Error
  }
};

export const storeNewMessage = async (request: Request) => {
  await ForumMessage.create({
    thread_id: request.body.thread_id,
    text: request.body.text,
    created_by: request.body.created_by,
  });
};
