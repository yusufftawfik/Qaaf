// PM2 process definition.
// Usage:  pm2 start ecosystem.config.js  &&  pm2 save
module.exports = {
  apps: [
    {
      name: "ummat-al-quran",
      // Run the Next.js production server directly (avoids npm PATH issues).
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/var/www/ummat-al-quran",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
