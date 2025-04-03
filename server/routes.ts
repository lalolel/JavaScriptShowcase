import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple API endpoint for health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'JavaScript Showcase API is running' });
  });

  const httpServer = createServer(app);

  return httpServer;
}
