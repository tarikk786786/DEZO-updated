import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add middlewares to parse JSON bodies
  app.use(express.json());

  app.all("/api/:functionName", async (req, res, next) => {
    const { functionName } = req.params;
    if (functionName === 'health') {
        return res.json({ status: "ok", timestamp: new Date().toISOString() });
    }
    try {
      const fnPath = path.join(process.cwd(), 'netlify/functions', `${functionName}.js`);
      
      let module;
      try {
        module = await import('file://' + fnPath);
      } catch (e) {
        return next(); // if not found, pass to next middleware
      }

      if (module.handler) {
        const event = {
          httpMethod: req.method,
          body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : null,
          queryStringParameters: req.query,
          headers: req.headers
        };
        const result = await module.handler(event, {});
        if (result.headers) {
          res.set(result.headers);
        }
        res.status(result.statusCode || 200).send(result.body);
      } else {
        next();
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Function error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
