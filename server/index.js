// CAREVAULT Core Server
// Architecture: Express.js REST API with Boundary Security & Privacy Firewall
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import clinicalRoutes from './routes/clinical.js';
import analyticsRoutes from './routes/analytics.js';
import patientRoutes from './routes/patient.js';
import auditRoutes from './routes/audit.js';
import securityDemoRoutes from './routes/securityDemo.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Global middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());

// Request logging for boundary monitoring
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (req.originalUrl.startsWith('/api')) {
      console.log(`[CAREVAULT-API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
    }
  });
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'HEALTHY',
    system: 'CAREVAULT Data Boundary Firewall',
    version: '1.0.0-hackathon',
    timestamp: new Date().toISOString(),
    boundaries: {
      clinicalDataPlane: 'ONLINE (CLINICIAN ONLY)',
      populationIntelligencePlane: 'ONLINE (ADMIN ONLY)',
      privacyGate: 'ACTIVE (K >= 5, Differencing Engine Enabled)',
      auditVault: 'RECORDING',
    },
  });
});

// Mount separate service planes
app.use('/api/auth', authRoutes);
app.use('/api/clinical', clinicalRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/patient', patientRoutes);
app.use('/api/audit', auditRoutes);
app.use('/api/security', securityDemoRoutes);

// Download endpoint for presentation PPTX
app.get('/api/presentation/download', (req, res) => {
  const filePath = new URL('../CAREVAULT_Pitch_Deck.pptx', import.meta.url).pathname;
  res.download(filePath, 'CAREVAULT_Pitch_Deck.pptx', (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).json({ error: 'Failed to download presentation.' });
    }
  });
});

// Catch-all 404 for API
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'ENDPOINT_NOT_FOUND',
    message: `API endpoint '${req.originalUrl}' does not exist on CAREVAULT boundary.`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[CAREVAULT-ERROR]', err);
  res.status(500).json({
    error: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected boundary error occurred.',
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=======================================================`);
    console.log(`  CAREVAULT — Connected care. Protected identities.  `);
    console.log(`  Backend API listening on http://localhost:${PORT}     `);
    console.log(`  Clinical Plane:      /api/clinical/*               `);
    console.log(`  Population Plane:    /api/analytics/*              `);
    console.log(`  Privacy Firewall:    /api/security/*               `);
    console.log(`=======================================================`);
  });
}

export default app;
