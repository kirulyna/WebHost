import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import i18n from 'i18n';
import connectDB from './config/database.js';

// --- WEB ROUTES ---
import { mainRoutes } from './routes/web/mainRoutes.js';
import { authRoutes } from './routes/web/authRoutes.js';
import { driverRoutes } from './routes/web/driverRoutes.js';
import { bossRoutes } from './routes/web/bossRoutes.js';
import { profileRoutes } from './routes/web/profileRoutes.js';
import { adminRoutes } from './routes/web/adminRoutes.js';
import { tripRoutes } from './routes/web/tripRoutes.js';

// --- MOBILE/API ROUTES ---
import apiMainRoutes from './routes/api/mainRoutes.js';
import apiAuthRoutes from './routes/api/authRoutes.js';
import apiDriverRoutes from './routes/api/driverRoutes.js';
import apiBossRoutes from './routes/api/bossRoutes.js';
import apiProfileRoutes from './routes/api/profileRoutes.js';
import apiAdminRoutes from './routes/api/adminRoutes.js';
import apiTripRoutes from './routes/api/tripRoutes.js';

dotenv.config();

connectDB();

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express();
const PORT = process.env.PORT || 3000;

// --- WEB SETTINGS ---
app.set('view engine', 'ejs');
app.set('views', [path.join(dirname, '../views/pages'), path.join(dirname, '../views')]);

i18n.configure({
    locales: ['en', 'hu', 'ro', 'de', 'fr'],
    directory: path.join(dirname, '../locales'),
    defaultLocale: 'en',
    cookie: 'lang',
    queryParameter: 'lang',
    autoReload: true,
    updateFiles: false,
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(i18n.init);

app.use(express.static(path.join(dirname, '../public')));
app.use('/uploads', express.static(path.join(dirname, '../public/uploads')));

// --- WEB ROUTES (HTML render) ---
app.use('/', mainRoutes);
app.use('/auth', authRoutes);
app.use('/driver', driverRoutes);
app.use('/boss', bossRoutes);
app.use('/driver/profile', profileRoutes);
app.use('/admin', adminRoutes);
app.use('/', tripRoutes);

// --- MOBILE/API ROUTES (JSON for mobile app) ---
app.use('/api/main', apiMainRoutes);
app.use('/api/auth', apiAuthRoutes);
app.use('/api/drivers', apiDriverRoutes);
app.use('/api/bosses', apiBossRoutes);
app.use('/api/profiles', apiProfileRoutes);
app.use('/api/admin', apiAdminRoutes);
app.use('/api/trips', apiTripRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});