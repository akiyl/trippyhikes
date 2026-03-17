// scripts/check-env.js
const dns = require('dns');
const net = require('net');

(async function main() {
     console.log('DATABASE_URL present?', !!process.env.DATABASE_URL);
     console.log('SUPABASE_URL present?', !!process.env.SUPABASE_URL);

     if (!process.env.DATABASE_URL) {
          console.warn('No DATABASE_URL present at build time. Exiting diagnostics.');
          process.exit(0);
     }

     try {
          // Use the URL parser so we don't accidentally log credentials.
          const parsed = new URL(process.env.DATABASE_URL);
          const host = parsed.hostname;
          const port = parsed.port || '5432';
          console.log('Parsed DB host:', host);
          console.log('Parsed DB port:', port);

          // DNS lookup
          dns.lookup(host, (err, address) => {
               if (err) {
                    console.error('DNS lookup error for host:', err.message);
                    process.exit(0);
               } else {
                    console.log('DNS resolved to:', address);

                    // Quick TCP check (5s timeout)
                    const socket = net.createConnection({ host: address, port: Number(port), timeout: 5000 }, () => {
                         console.log(`TCP connection to ${address}:${port} succeeded`);
                         socket.destroy();
                         process.exit(0);
                    });

                    socket.on('error', (e) => {
                         console.error(`TCP connection to ${address}:${port} failed:`, e.message);
                         socket.destroy();
                         process.exit(0);
                    });

                    socket.on('timeout', () => {
                         console.error(`TCP connection to ${address}:${port} timed out`);
                         socket.destroy();
                         process.exit(0);
                    });
               }
          });
     } catch (e) {
          console.error('Error parsing DATABASE_URL or running diagnostics:', e.message);
          process.exit(0);
     }
})();