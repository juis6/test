import { Request, Response } from "express";
import { FlagStore, Flag } from "../models/Flag";
import { v4 as uuidv4 } from "uuid";

export class FlagController {
  private flagStore: FlagStore;

  constructor(flagStore: FlagStore) {
    this.flagStore = flagStore;
  }

  flagPost = (req: Request, res: Response): void => {
    const { postId, userId, reason } = req.body;

    if (!postId || !userId || !reason) {
      res.status(400).json({
        error: "Missing required fields: postId, userId, reason",
      });
      return;
    }

    const existingFlag = this.flagStore.findByPostAndUser(postId, userId);

    if (existingFlag) {
      res.status(409).json({
        error: "User has already flagged this post",
      });
      return;
    }

    const newFlag: Flag = {
      id: uuidv4(),
      postId,
      userId,
      reason,
      createdAt: new Date(),
    };

    this.flagStore.addFlag(newFlag);

    res.status(201).json({
      message: "Post flagged successfully",
      flag: newFlag,
    });
  };

  getAllFlags = (req: Request, res: Response): void => {
    const flags = this.flagStore.getAllFlags();
    res.status(200).json({ flags });
  };
}
