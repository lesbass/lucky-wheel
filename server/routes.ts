import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPlayerSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/players", async (_req, res) => {
    const players = await storage.getPlayers();
    res.json(players);
  });

  app.post("/api/players", async (req, res) => {
    const result = insertPlayerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid player data" });
    }

    const player = await storage.createPlayer(result.data);
    res.json(player);
  });

  app.delete("/api/players", async (_req, res) => {
    await storage.clearPlayers();
    res.json({ message: "Players cleared" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
