export interface Flag {
  id: string;
  postId: string;
  userId: string;
  reason: string;
  createdAt: Date;
}

export class FlagStore {
  private flags: Flag[] = [];

  addFlag(flag: Flag): Flag {
    this.flags.push(flag);
    return flag;
  }

  findByPostAndUser(postId: string, userId: string): Flag | undefined {
    return this.flags.find(
      (flag) => flag.postId === postId && flag.userId === userId
    );
  }

  getAllFlags(): Flag[] {
    return this.flags;
  }
}
