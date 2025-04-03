import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple API endpoint for health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'JavaScript Showcase API is running' });
  });

  // Serve static files from public directory
  app.use(express.static(path.join(process.cwd(), 'public')));

  const httpServer = createServer(app);

  return httpServer;
}
