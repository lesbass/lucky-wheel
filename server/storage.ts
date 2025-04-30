import { players, type Player, type InsertPlayer } from "@shared/schema";

export interface IStorage {
  getPlayers(): Promise<Player[]>;
  createPlayer(player: InsertPlayer): Promise<Player>;
  clearPlayers(): Promise<void>;
}

export class MemStorage implements IStorage {
  private players: Map<number, Player>;
  private currentId: number;

  constructor() {
    this.players = new Map();
    this.currentId = 1;
  }

  async getPlayers(): Promise<Player[]> {
    return Array.from(this.players.values());
  }

  async createPlayer(insertPlayer: InsertPlayer): Promise<Player> {
    const id = this.currentId++;
    const player: Player = { ...insertPlayer, id };
    this.players.set(id, player);
    return player;
  }

  async clearPlayers(): Promise<void> {
    this.players.clear();
  }
}

export const storage = new MemStorage();