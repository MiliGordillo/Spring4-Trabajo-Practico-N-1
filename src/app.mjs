import express from 'express';
import { connectDB } from './config/dbConfig.mjs';
import SuperHeroRoutes from './routes/SuperHeroRoutes.mjs';
import methodOverride from 'method-override';
import expressLayouts from 'express-ejs-layouts';

const app = express();
const PORT = process.env.PORT || 3000;

// ============ MIDDLEWARES ============

// Parseo de datos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static('public'));

// Override para poder usar PUT/DELETE desde formularios
app.use(methodOverride('_method'));

// EJS + Layouts
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);
app.set('layout', 'layout'); // layout.ejs

// Middleware global para tener un título por defecto en todas las vistas
app.use((req, res, next) => {
  res.locals.title = 'Superhéroes App';
  next();
});

// ============ BASE DE DATOS ============
connectDB();

// ============ RUTAS ============

// Página principal
app.get('/', (req, res) => {
  res.render('index', { title: 'Inicio', mostrarNavbar: false , fondoIndex: true});
});

// Rutas de Superhéroes
app.use('/heroes', SuperHeroRoutes);

// Ruta 404
app.use((req, res) => {
  res.status(404).render('404', { mensaje: "Ruta no encontrada" });
});

// ============ SERVIDOR ============
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

export default app;



