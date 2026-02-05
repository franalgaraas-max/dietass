import { useState, useEffect, useRef } from 'react'
import { 
  Dumbbell, 
  ChefHat, 
  Calendar, 
  Flame, 
  Clock, 
  Users, 
  CheckCircle2,
  Menu,
  X,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Heart,
  TrendingUp,
  Leaf,
  ChevronLeft,
  ChevronRight,
  Utensils,
  Info,
  Printer,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import './App.css'

// Datos de recetas
const recetas = [
  {
    id: 1,
    nombre: "Bowl de Avena Energético",
    categoria: "desayuno",
    tiempo: "10 min",
    calorias: 320,
    proteinas: 12,
    imagen: "/receta-avena.jpg",
    ingredientes: ["40g avena", "200ml leche de almendras", "1 plátano", "Arándanos", "Nueces"],
    descripcion: "Desayuno perfecto para cargar energía antes del entrenamiento."
  },
  {
    id: 2,
    nombre: "Pechuga de Pollo Fitness",
    categoria: "almuerzo",
    tiempo: "25 min",
    calorias: 420,
    proteinas: 45,
    imagen: "/receta-pollo.jpg",
    ingredientes: ["200g pechuga de pollo", "100g brócoli", "80g quinoa", "Aceite de oliva", "Especias"],
    descripcion: "Almuerzo alto en proteínas para recuperación muscular."
  },
  {
    id: 3,
    nombre: "Salmón con Espárragos",
    categoria: "cena",
    tiempo: "30 min",
    calorias: 480,
    proteinas: 38,
    imagen: "/receta-salmon.jpg",
    ingredientes: ["180g salmón", "150g espárragos", "100g batata", "Limón", "Eneldo"],
    descripcion: "Cena rica en omega-3 para la recuperación nocturna."
  },
  {
    id: 4,
    nombre: "Smoothie Verde Detox",
    categoria: "snack",
    tiempo: "5 min",
    calorias: 180,
    proteinas: 6,
    imagen: "/receta-smoothie.jpg",
    ingredientes: ["Espinacas", "Plátano", "Manzana verde", "Semillas de chía", "Agua de coco"],
    descripcion: "Snack refrescante lleno de vitaminas y antioxidantes."
  },
  {
    id: 5,
    nombre: "Ensalada de Atún Power",
    categoria: "almuerzo",
    tiempo: "15 min",
    calorias: 350,
    proteinas: 32,
    imagen: "/receta-ensalada.jpg",
    ingredientes: ["150g atún", "Garbanzos", "Tomate cherry", "Pepino", "Aguacate"],
    descripcion: "Comida ligera pero saciante, ideal para días de definición."
  },
  {
    id: 6,
    nombre: "Tortilla de Claras Proteica",
    categoria: "desayuno",
    tiempo: "12 min",
    calorias: 280,
    proteinas: 28,
    imagen: "/receta-tortilla.jpg",
    ingredientes: ["4 claras de huevo", "Espinacas", "Champiñones", "Pimienta", "Aceite en spray"],
    descripcion: "Desayuno bajo en grasas y alto en proteínas."
  }
]

// Plan de 30 días - VOLUMEN
const planVolumen30Dias = [
  { dia: 1, desayuno: "Avena con plátano, proteína en polvo y almendras", media: "Batido de proteínas con avena", almuerzo: "Pollo a la plancha con arroz integral y brócoli", pre: "Plátano con crema de cacahuete", post: "Batido proteico con dextrosa", cena: "Salmón con quinoa y espárragos" },
  { dia: 2, desayuno: "Tortilla de 3 huevos con aguacate y tostadas integrales", media: "Yogur griego con nueces y miel", almuerzo: "Carne magra con pasta integral y tomate", pre: "Bagel integral con mermelada", post: "Batido de proteínas con plátano", cena: "Pescado blanco con batata asada" },
  { dia: 3, desayuno: "Smoothie bowl con avena, frutas y semillas", media: "Barrita de proteínas casera", almuerzo: "Pechuga de pavo con couscous y verduras", pre: "Arroz inflado con mantequilla de almendras", post: "Batido recuperador con creatina", cena: "Filete de ternera magra con puré de patata" },
  { dia: 4, desayuno: "Panqueques de proteína con arándanos y sirope", media: "Batido de leche con avena y cacao", almuerzo: "Atún con garbanzos, aguacate y quinoa", pre: "Tostadas con mantequilla de cacahuete", post: "Batido proteico con maltodextrina", cena: "Pollo al horno con arroz salvaje" },
  { dia: 5, desayuno: "Huevos revueltos con espinacas y queso cottage", media: "Fruta seca mixta (nueces, almendras, pasas)", almuerzo: "Salmón con pasta y salsa de espinacas", pre: "Plátano doble con miel", post: "Batido de proteínas con carbohidratos", cena: "Pavo al curry con arroz basmati" },
  { dia: 6, desayuno: "Avena nocturna con chia, leche y frutos rojos", media: "Smoothie de plátano y mantequilla de cacahuete", almuerzo: "Hamburguesa de ternera magra con pan integral y patatas", pre: "Galletas de arroz con mermelada", post: "Batido proteico post-entreno", cena: "Merluza al horno con patatas nuevas" },
  { dia: 7, desayuno: "Tostadas francesas de proteína con fruta", media: "Yogur con granola casera", almuerzo: "Pollo al curry con arroz y verduras", pre: "Batata asada con canela", post: "Batido recuperador", cena: "Sardinas a la plancha con ensalada de lentejas" },
  { dia: 8, desayuno: "Bowl de quinoa con leche, canela y manzana", media: "Batido de proteínas con avena", almuerzo: "Ternera salteada con noodles y verduras", pre: "Plátano con crema de cacahuete", post: "Batido proteico con dextrosa", cena: "Bacalao al pil pil con arroz" },
  { dia: 9, desayuno: "Huevos pochados con aguacate y pan de centeno", media: "Batido de leche entera con cacao", almuerzo: "Pechuga de pollo con puré de patata y zanahorias", pre: "Barrita energética casera", post: "Batido de proteínas con plátano", cena: "Salmón a la parrilla con quinoa" },
  { dia: 10, desayuno: "Avena cocida con proteína, plátano y nueces", media: "Requesón con frutos rojos", almuerzo: "Pasta boloñesa casera con carne magra", pre: "Arroz con leche casero", post: "Batido recuperador con creatina", cena: "Lubina al horno con patatas asadas" },
  { dia: 11, desayuno: "Tortilla de claras y enteros con jamón cocido", media: "Fruta fresca con frutos secos", almuerzo: "Pollo teriyaki con arroz integral y edamames", pre: "Tostadas con aguacate", post: "Batido proteico con carbohidratos", cena: "Solomillo de cerdo con puré de calabaza" },
  { dia: 12, desayuno: "Smoothie de mango, plátano y proteína", media: "Yogur griego con miel y nueces", almuerzo: "Merluza a la romana con patatas fritas al horno", pre: "Plátano con mantequilla de almendras", post: "Batido post-entreno", cena: "Pavo asado con arroz salvaje" },
  { dia: 13, desayuno: "Pan integral con huevos revueltos y salmón", media: "Batido de proteínas con avena", almuerzo: "Bistec de ternera con pasta y pesto", pre: "Galletas integrales con queso cottage", post: "Batido recuperador", cena: "Dorada a la sal con patatas cocidas" },
  { dia: 14, desayuno: "Avena con leche de coco, proteína y semillas", media: "Barrita de proteínas", almuerzo: "Pollo al horno con arroz y verduras asadas", pre: "Batata con crema de cacahuete", post: "Batido proteico con dextrosa", cena: "Rodaballo a la plancha con puré de patata" },
  { dia: 15, desayuno: "Crepes de proteína con fruta y sirope", media: "Smoothie de plátano y avena", almuerzo: "Lasaña de carne magra con ensalada", pre: "Plátano doble", post: "Batido recuperador con creatina", cena: "Salmón al horno con quinoa y espárragos" },
  { dia: 16, desayuno: "Huevos al plato con aguacate y tostadas", media: "Yogur con frutos secos y miel", almuerzo: "Pechuga de pavo con couscous y verduras", pre: "Arroz inflado con miel", post: "Batido proteico con carbohidratos", cena: "Filete de ternera con patatas nuevas" },
  { dia: 17, desayuno: "Bowl de avena con frutos rojos y almendras", media: "Batido de proteínas", almuerzo: "Atún a la plancha con pasta integral y tomate", pre: "Tostadas con mantequilla de cacahuete", post: "Batido post-entreno", cena: "Pollo al curry con arroz basmati" },
  { dia: 18, desayuno: "Tortilla de 4 huevos con jamón y queso", media: "Fruta seca mixta", almuerzo: "Salmón con arroz salvaje y espárragos", pre: "Bagel con mermelada", post: "Batido recuperador", cena: "Merluza en salsa verde con patatas" },
  { dia: 19, desayuno: "Panqueques de avena con plátano y sirope", media: "Batido de leche con cacao", almuerzo: "Hamburguesa casera de ternera con pan integral", pre: "Plátano con crema de almendras", post: "Batido proteico con dextrosa", cena: "Lenguado a la plancha con arroz" },
  { dia: 20, desayuno: "Avena nocturna con proteína y semillas de chía", media: "Yogur griego con granola", almuerzo: "Pollo a la cerveza con patatas asadas", pre: "Batata asada", post: "Batido recuperador con creatina", cena: "Bonito con pimientos y cebolla" },
  { dia: 21, desayuno: "Huevos revueltos con salmón ahumado", media: "Smoothie de frutas", almuerzo: "Pasta carbonara ligera con pechuga", pre: "Galletas de arroz con mermelada", post: "Batido proteico", cena: "Entrecot a la plancha con puré" },
  { dia: 22, desayuno: "Bowl de quinoa con fruta y leche", media: "Batido de proteínas con avena", almuerzo: "Pavo al horno con arroz integral y verduras", pre: "Plátano con mantequilla de cacahuete", post: "Batido post-entreno", cena: "Salmón con batata asada" },
  { dia: 23, desayuno: "Tostadas con aguacate y huevo pochado", media: "Requesón con frutos rojos", almuerzo: "Ternera con noodles y verduras salteadas", pre: "Barrita energética", post: "Batido recuperador", cena: "Dorada al horno con patatas" },
  { dia: 24, desayuno: "Avena cocida con manzana, canela y nueces", media: "Yogur con frutos secos", almuerzo: "Pollo al horno con puré de patata", pre: "Arroz con leche", post: "Batido proteico con carbohidratos", cena: "Bacalao al horno con garbanzos" },
  { dia: 25, desayuno: "Tortilla de claras con espinacas y champiñones", media: "Batido de leche entera", almuerzo: "Pasta con atún y tomate natural", pre: "Tostadas con aguacate", post: "Batido recuperador", cena: "Solomillo con arroz salvaje" },
  { dia: 26, desayuno: "Smoothie bowl con proteína y toppings", media: "Barrita de proteínas casera", almuerzo: "Pechuga de pollo con arroz y curry", pre: "Plátano doble con miel", post: "Batido post-entreno", cena: "Lubina con patatas nuevas" },
  { dia: 27, desayuno: "Huevos fritos con jamón y pan integral", media: "Fruta fresca con nueces", almuerzo: "Merluza a la romana con patatas", pre: "Galletas integrales con queso", post: "Batido proteico", cena: "Pavo al curry con arroz" },
  { dia: 28, desayuno: "Panqueques de proteína con arándanos", media: "Batido de proteínas", almuerzo: "Bistec con pasta al pesto", pre: "Batata con canela", post: "Batido recuperador", cena: "Salmón con quinoa" },
  { dia: 29, desayuno: "Avena con leche de almendras y frutos rojos", media: "Smoothie de plátano", almuerzo: "Pollo teriyaki con arroz y verduras", pre: "Plátano con crema de cacahuete", post: "Batido proteico con dextrosa", cena: "Rodaballo con puré de patata" },
  { dia: 30, desayuno: "Crepes de avena con plátano y sirope", media: "Yogur griego con miel", almuerzo: "Lasaña casera con ensalada", pre: "Arroz inflado", post: "Batido recuperador", cena: "Entrecot con patatas asadas" }
]

// Plan de 30 días - DEFINICIÓN
const planDefinicion30Dias = [
  { dia: 1, desayuno: "Tortilla de 4 claras con espinacas y champiñones", media: "Yogur griego 0% con nueces (10g)", almuerzo: "Pechuga de pavo a la plancha con ensalada mixta", snack: "Batido de proteínas isoladas", cena: "Pescado blanco al vapor con brócoli", opcional: "Caseína antes de dormir" },
  { dia: 2, desayuno: "Huevo entero + 3 claras revueltas con espárragos", media: "Requesón 0% con canela", almuerzo: "Pollo a la plancha con espárragos y calabacín", snack: "Almendras (15 unidades)", cena: "Atún natural con ensalada de pepino", opcional: "Té verde" },
  { dia: 3, desayuno: "Batido de proteínas con espinacas y semillas de chía", media: "Huevo duro", almuerzo: "Merluza al horno con judías verdes", snack: "Yogur griego natural", cena: "Pechuga de pollo con ensalada de rúcula", opcional: "Caseína" },
  { dia: 4, desayuno: "Tortilla de claras con pimiento y cebolla", media: "Frutos rojos (100g)", almuerzo: "Pavo salteado con brócoli al vapor", snack: "Batido de proteínas", cena: "Salmón a la plancha con espárragos", opcional: "Té de hierbas" },
  { dia: 5, desayuno: "Claras cocidas con aguacate (1/4)", media: "Yogur 0% con semillas de lino", almuerzo: "Pollo al curry ligero con coliflor", snack: "Pepino con hummus (2 cucharadas)", cena: "Dorada al horno con ensalada verde", opcional: "Caseína" },
  { dia: 6, desayuno: "Batido verde: proteína, espinacas, pepino", media: "Huevo duro", almuerzo: "Pechuga de pavo con calabacín a la plancha", snack: "Almendras (10 unidades)", cena: "Bacalao con tomate y cebolla", opcional: "Té verde" },
  { dia: 7, desayuno: "Tortilla de claras con tomate y albahaca", media: "Requesón 0%", almuerzo: "Salmón con ensalada de aguacate (1/2)", snack: "Batido de proteínas", cena: "Pollo a la plancha con espárragos", opcional: "Caseína" },
  { dia: 8, desayuno: "Huevo entero + 3 claras con espinacas", media: "Yogur griego 0%", almuerzo: "Merluza a la plancha con brócoli", snack: "Pepino con guacamole ligero", cena: "Pavo al horno con ensalada mixta", opcional: "Té de hierbas" },
  { dia: 9, desayuno: "Batido de proteínas con café y hielo", media: "Frutos rojos", almuerzo: "Pollo con calabacín y champiñones salteados", snack: "Huevo duro", cena: "Atún fresco a la plancha con judías", opcional: "Caseína" },
  { dia: 10, desayuno: "Tortilla de claras con champiñones", media: "Almendras (15 unidades)", almuerzo: "Pechuga de pavo con espárragos", snack: "Batido de proteínas", cena: "Salmón con brócoli al vapor", opcional: "Té verde" },
  { dia: 11, desayuno: "Claras revueltas con pavo cocido", media: "Yogur 0% con canela", almuerzo: "Pollo al horno con calabacín", snack: "Requesón 0%", cena: "Pescado blanco con ensalada", opcional: "Caseína" },
  { dia: 12, desayuno: "Batido de proteínas con espinacas", media: "Huevo duro", almuerzo: "Merluza con tomate y pimientos", snack: "Pepino con hummus", cena: "Pavo a la plancha con brócoli", opcional: "Té de hierbas" },
  { dia: 13, desayuno: "Tortilla de 4 claras con espinacas", media: "Frutos rojos", almuerzo: "Salmón con ensalada de pepino", snack: "Batido de proteínas", cena: "Pollo con espárragos", opcional: "Caseína" },
  { dia: 14, desayuno: "Huevo entero + 3 claras con espárragos", media: "Yogur griego 0%", almuerzo: "Pechuga de pollo con judías verdes", snack: "Almendras (10 unidades)", cena: "Dorada al horno con calabacín", opcional: "Té verde" },
  { dia: 15, desayuno: "Claras cocidas con aguacate (1/4)", media: "Requesón 0%", almuerzo: "Pavo con brócoli al vapor", snack: "Batido de proteínas", cena: "Bacalao con ensalada mixta", opcional: "Caseína" },
  { dia: 16, desayuno: "Batido de proteínas con café helado", media: "Huevo duro", almuerzo: "Pollo a la plancha con espárragos", snack: "Pepino con guacamole", cena: "Atún con calabacín", opcional: "Té de hierbas" },
  { dia: 17, desayuno: "Tortilla de claras con tomate", media: "Yogur 0% con semillas", almuerzo: "Merluza con coliflor", snack: "Frutos rojos", cena: "Salmón con brócoli", opcional: "Caseína" },
  { dia: 18, desayuno: "Huevo entero + 3 claras con champiñones", media: "Almendras (15 unidades)", almuerzo: "Pechuga de pavo con ensalada", snack: "Batido de proteínas", cena: "Pollo con judías verdes", opcional: "Té verde" },
  { dia: 19, desayuno: "Claras revueltas con espinacas", media: "Requesón 0%", almuerzo: "Pavo al horno con calabacín", snack: "Huevo duro", cena: "Pescado blanco con espárragos", opcional: "Caseína" },
  { dia: 20, desayuno: "Batido verde de proteínas", media: "Yogur griego 0%", almuerzo: "Pollo con brócoli", snack: "Pepino con hummus", cena: "Salmón con ensalada", opcional: "Té de hierbas" },
  { dia: 21, desayuno: "Tortilla de 4 claras con pimiento", media: "Frutos rojos", almuerzo: "Merluza a la plancha con judías", snack: "Batido de proteínas", cena: "Pavo con ensalada verde", opcional: "Caseína" },
  { dia: 22, desayuno: "Huevo entero + 3 claras con espárragos", media: "Almendras (10 unidades)", almuerzo: "Pechuga de pollo con calabacín", snack: "Requesón 0%", cena: "Dorada con brócoli", opcional: "Té verde" },
  { dia: 23, desayuno: "Claras cocidas con tomate", media: "Yogur 0% con canela", almuerzo: "Salmón con espárragos", snack: "Huevo duro", cena: "Pollo a la plancha con ensalada", opcional: "Caseína" },
  { dia: 24, desayuno: "Batido de proteínas con espinacas", media: "Pepino con guacamole", almuerzo: "Pavo con coliflor", snack: "Batido de proteínas", cena: "Atún con judías verdes", opcional: "Té de hierbas" },
  { dia: 25, desayuno: "Tortilla de claras con champiñones", media: "Frutos rojos", almuerzo: "Pollo al horno con brócoli", snack: "Almendras (15 unidades)", cena: "Bacalao con calabacín", opcional: "Caseína" },
  { dia: 26, desayuno: "Huevo entero + 3 claras con espinacas", media: "Yogur griego 0%", almuerzo: "Merluza con ensalada mixta", snack: "Requesón 0%", cena: "Salmón con espárragos", opcional: "Té verde" },
  { dia: 27, desayuno: "Claras revueltas con aguacate (1/4)", media: "Huevo duro", almuerzo: "Pechuga de pavo con judías", snack: "Batido de proteínas", cena: "Pescado blanco con brócoli", opcional: "Caseína" },
  { dia: 28, desayuno: "Batido de proteínas con café", media: "Almendras (10 unidades)", almuerzo: "Pollo con calabacín", snack: "Pepino con hummus", cena: "Pavo a la plancha con ensalada", opcional: "Té de hierbas" },
  { dia: 29, desayuno: "Tortilla de 4 claras con tomate", media: "Yogur 0%", almuerzo: "Salmón con brócoli al vapor", snack: "Frutos rojos", cena: "Pollo con espárragos", opcional: "Caseína" },
  { dia: 30, desayuno: "Huevo entero + 3 claras con champiñones", media: "Requesón 0%", almuerzo: "Dorada al horno con calabacín", snack: "Batido de proteínas", cena: "Atún con ensalada verde", opcional: "Té verde" }
]

// Plan de 30 días - MANTENIMIENTO
const planMantenimiento30Dias = [
  { dia: 1, desayuno: "Tostadas integrales con aguacate y huevo", media: "Fruta de temporada", almuerzo: "Pollo a la plancha con arroz integral y verduras", snack: "Yogur natural con frutos secos", cena: "Pescado al horno con ensalada", opcional: "Infusión" },
  { dia: 2, desayuno: "Avena cocida con plátano y canela", media: "Puñado de nueces", almuerzo: "Pasta con atún y tomate natural", snack: "Fruta fresca", cena: "Tortilla de verduras con ensalada", opcional: "Yogur griego" },
  { dia: 3, desayuno: "Tortilla de 2 huevos con espinacas", media: "Yogur con miel", almuerzo: "Merluza a la plancha con patatas nuevas", snack: "Batido de proteínas", cena: "Pavo al curry con arroz", opcional: "Fruta" },
  { dia: 4, desayuno: "Smoothie de frutas con avena", media: "Barrita de cereales", almuerzo: "Pollo al horno con quinoa y verduras", snack: "Zanahoria con hummus", cena: "Salmón con espárragos", opcional: "Infusión" },
  { dia: 5, desayuno: "Pan integral con tomate y aceite", media: "Fruta seca", almuerzo: "Lentejas estofadas con verduras", snack: "Yogur natural", cena: "Pechuga de pavo con puré de patata", opcional: "Fruta" },
  { dia: 6, desayuno: "Crepes de avena con fruta", media: "Leche con cacao", almuerzo: "Pescado a la plancha con arroz", snack: "Frutos secos", cena: "Revuelto de champiñones con ensalada", opcional: "Yogur" },
  { dia: 7, desayuno: "Huevos revueltos con aguacate", media: "Fruta fresca", almuerzo: "Pollo teriyaki con noodles", snack: "Batido de proteínas", cena: "Dorada al horno con verduras", opcional: "Infusión" },
  { dia: 8, desayuno: "Bowl de yogurt con granola y fruta", media: "Puñado de almendras", almuerzo: "Garbanzos con espinacas y arroz", snack: "Pepino con guacamole", cena: "Salmón a la parrilla con patatas", opcional: "Fruta" },
  { dia: 9, desayuno: "Tostadas con mantequilla de cacahuete", media: "Plátano", almuerzo: "Pechuga de pollo con pasta integral", snack: "Yogur griego", cena: "Merluza con tomate y cebolla", opcional: "Infusión" },
  { dia: 10, desayuno: "Tortilla francesa integral", media: "Frutos rojos", almuerzo: "Pavo asado con puré de calabaza", snack: "Fruta seca", cena: "Atún con ensalada de garbanzos", opcional: "Yogur" },
  { dia: 11, desayuno: "Avena con leche y fruta", media: "Barrita energética", almuerzo: "Pollo al curry con arroz basmati", snack: "Zanahorias baby", cena: "Bacalao al pil pil con patatas", opcional: "Fruta" },
  { dia: 12, desayuno: "Pan de centeno con aguacate", media: "Yogur natural", almuerzo: "Pasta con pesto y tomates cherry", snack: "Batido de proteínas", cena: "Pechuga de pavo con verduras", opcional: "Infusión" },
  { dia: 13, desayuno: "Huevos pochados con espinacas", media: "Fruta fresca", almuerzo: "Salmón con quinoa y espárragos", snack: "Nueces", cena: "Tortilla de patatas ligera", opcional: "Yogur" },
  { dia: 14, desayuno: "Smoothie bowl con toppings", media: "Puñado de semillas", almuerzo: "Pollo al horno con arroz salvaje", snack: "Fruta", cena: "Pescado blanco con ensalada mixta", opcional: "Infusión" },
  { dia: 15, desayuno: "Tostadas integrales con tomate", media: "Aceitunas", almuerzo: "Lentejas con arroz y verduras", snack: "Yogur con miel", cena: "Pavo a la plancha con patatas", opcional: "Fruta" },
  { dia: 16, desayuno: "Avena nocturna con fruta", media: "Frutos secos", almuerzo: "Merluza a la romana con ensalada", snack: "Batido de proteínas", cena: "Pollo con calabacín salteado", opcional: "Yogur" },
  { dia: 17, desayuno: "Tortilla de 2 huevos con jamón", media: "Fruta fresca", almuerzo: "Pasta boloñesa casera", snack: "Zanahoria con hummus", cena: "Salmón al horno con brócoli", opcional: "Infusión" },
  { dia: 18, desayuno: "Pan integral con aguacate y semillas", media: "Yogur natural", almuerzo: "Pollo con couscous y verduras", snack: "Fruta seca", cena: "Dorada a la plancha con patatas", opcional: "Fruta" },
  { dia: 19, desayuno: "Crepes de proteína con fruta", media: "Leche con cacao", almuerzo: "Garbanzos con espinacas", snack: "Yogur griego", cena: "Pechuga de pavo con ensalada", opcional: "Infusión" },
  { dia: 20, desayuno: "Huevos revueltos con tomate", media: "Fruta fresca", almuerzo: "Pescado con arroz integral", snack: "Batido de proteínas", cena: "Revuelto de espinacas", opcional: "Yogur" },
  { dia: 21, desayuno: "Bowl de avena con plátano", media: "Almendras", almuerzo: "Pollo al curry con arroz", snack: "Pepino con guacamole", cena: "Merluza con patatas nuevas", opcional: "Fruta" },
  { dia: 22, desayuno: "Tostadas con mermelada y queso", media: "Fruta", almuerzo: "Pasta con atún y verduras", snack: "Yogur natural", cena: "Salmón con espárragos", opcional: "Infusión" },
  { dia: 23, desayuno: "Tortilla de claras y un huevo", media: "Frutos secos", almuerzo: "Pavo al horno con puré", snack: "Fruta fresca", cena: "Atún con ensalada de lentejas", opcional: "Yogur" },
  { dia: 24, desayuno: "Smoothie de frutas y avena", media: "Barrita de cereales", almuerzo: "Pollo teriyaki con arroz", snack: "Zanahorias", cena: "Bacalao con tomate", opcional: "Fruta" },
  { dia: 25, desayuno: "Pan integral con aguacate", media: "Yogur con miel", almuerzo: "Lentejas estofadas", snack: "Batido de proteínas", cena: "Pechuga de pollo con verduras", opcional: "Infusión" },
  { dia: 26, desayuno: "Avena cocida con canela", media: "Fruta seca", almuerzo: "Pescado a la plancha con arroz", snack: "Yogur natural", cena: "Tortilla de champiñones", opcional: "Yogur" },
  { dia: 27, desayuno: "Huevos fritos con tomate", media: "Fruta fresca", almuerzo: "Pasta integral con pesto", snack: "Nueces", cena: "Salmón con patatas", opcional: "Infusión" },
  { dia: 28, desayuno: "Bowl de yogurt con fruta", media: "Semillas", almuerzo: "Pollo al horno con quinoa", snack: "Fruta", cena: "Dorada con ensalada", opcional: "Fruta" },
  { dia: 29, desayuno: "Tostadas con tomate y aceite", media: "Aceitunas", almuerzo: "Garbanzos con arroz", snack: "Yogur griego", cena: "Pavo con verduras salteadas", opcional: "Infusión" },
  { dia: 30, desayuno: "Tortilla francesa con fruta", media: "Frutos secos", almuerzo: "Merluza con patatas", snack: "Batido de proteínas", cena: "Pollo a la plancha con ensalada", opcional: "Yogur" }
]

// Consejos nutricionales
const consejos = [
  {
    titulo: "Hidratación Constante",
    descripcion: "Bebe al menos 2-3 litros de agua al día. La hidratación es clave para el rendimiento y recuperación.",
    icono: <Leaf className="w-8 h-8 text-green-500" />
  },
  {
    titulo: "Proteína en Cada Comida",
    descripcion: "Distribuye tu ingesta de proteínas a lo largo del día para maximizar la síntesis proteica.",
    icono: <Dumbbell className="w-8 h-8 text-blue-500" />
  },
  {
    titulo: "Carbohidratos Inteligentes",
    descripcion: "Consume carbohidratos complejos alrededor de tus entrenamientos para mejor rendimiento.",
    icono: <TrendingUp className="w-8 h-8 text-orange-500" />
  },
  {
    titulo: "Grasas Saludables",
    descripcion: "Incluye aguacate, frutos secos y aceite de oliva para hormonas y salud cardiovascular.",
    icono: <Heart className="w-8 h-8 text-red-500" />
  }
]

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [recetaSeleccionada, setRecetaSeleccionada] = useState<typeof recetas[0] | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [planSeleccionado, setPlanSeleccionado] = useState<string | null>(null)
  const [diaActual, setDiaActual] = useState(1)
  const printRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMenuAbierto(false)
    }
  }

  const getPlanData = (planId: string) => {
    switch(planId) {
      case 'volumen': return { nombre: 'Volumen Muscular', data: planVolumen30Dias, calorias: '2800-3200', color: 'bg-blue-500' }
      case 'definicion': return { nombre: 'Definición', data: planDefinicion30Dias, calorias: '1800-2200', color: 'bg-orange-500' }
      case 'mantenimiento': return { nombre: 'Mantenimiento', data: planMantenimiento30Dias, calorias: '2200-2600', color: 'bg-green-500' }
      default: return null
    }
  }

  const abrirPlan = (planId: string) => {
    setPlanSeleccionado(planId)
    setDiaActual(1)
  }

  const cambiarDia = (direccion: 'anterior' | 'siguiente') => {
    if (direccion === 'anterior' && diaActual > 1) {
      setDiaActual(diaActual - 1)
    } else if (direccion === 'siguiente' && diaActual < 30) {
      setDiaActual(diaActual + 1)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-green-600 p-2 rounded-lg">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <span className={`font-bold text-xl ${scrolled ? 'text-gray-900' : 'text-white'}`}>FitLife</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('recetas')} className={`font-medium hover:text-green-500 transition-colors ${scrolled ? 'text-gray-700' : 'text-white/90'}`}>Recetas</button>
              <button onClick={() => scrollToSection('dietas')} className={`font-medium hover:text-green-500 transition-colors ${scrolled ? 'text-gray-700' : 'text-white/90'}`}>Dietas 30 Días</button>
              <button onClick={() => scrollToSection('consejos')} className={`font-medium hover:text-green-500 transition-colors ${scrolled ? 'text-gray-700' : 'text-white/90'}`}>Consejos</button>
              <Button onClick={() => scrollToSection('dietas')} className="bg-green-600 hover:bg-green-700 text-white">
                Empezar Ahora
              </Button>
            </div>

            <button 
              className="md:hidden p-2"
              onClick={() => setMenuAbierto(!menuAbierto)}
            >
              {menuAbierto ? (
                <X className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {menuAbierto && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => scrollToSection('recetas')} className="block w-full text-left py-2 text-gray-700 font-medium">Recetas</button>
              <button onClick={() => scrollToSection('dietas')} className="block w-full text-left py-2 text-gray-700 font-medium">Dietas 30 Días</button>
              <button onClick={() => scrollToSection('consejos')} className="block w-full text-left py-2 text-gray-700 font-medium">Consejos</button>
              <Button onClick={() => scrollToSection('dietas')} className="w-full bg-green-600 hover:bg-green-700 text-white">
                Empezar Ahora
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/hero-fitness.jpg" 
            alt="Comida fitness saludable" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-green-600/90 text-white border-0 px-4 py-1.5 text-sm">
              Planes de 30 Días Completos
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Transforma tu Cuerpo con <span className="text-green-400">Nutrición Inteligente</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Descubre recetas fitness deliciosas y planes de alimentación completos de 30 días diseñados para alcanzar tus objetivos deportivos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => scrollToSection('recetas')}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg rounded-xl"
              >
                <ChefHat className="w-5 h-5 mr-2" />
                Ver Recetas
              </Button>
              <Button 
                onClick={() => scrollToSection('dietas')}
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-xl"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Planes 30 Días
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">+10,000 usuarios</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-gray-300">100% Gratis</span>
              </div>
              <a 
                href="https://instagram.com/dietas_equilibrio" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>@dietas_equilibrio</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">50+</div>
              <div className="text-green-100">Recetas Fitness</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">90</div>
              <div className="text-green-100">Días de Menús</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">3</div>
              <div className="text-green-100">Planes Completos</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">98%</div>
              <div className="text-green-100">Satisfacción</div>
            </div>
          </div>
        </div>
      </section>

      {/* Recetas Section */}
      <section id="recetas" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-700 border-0">Recetas Saludables</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comida Fitness que Sabe Bien
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Recetas diseñadas por nutricionistas deportivos para maximizar tus resultados sin sacrificar el sabor.
            </p>
          </div>

          <Tabs defaultValue="todas" className="w-full">
            <TabsList className="flex justify-center mb-8 flex-wrap gap-2">
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="desayuno">Desayunos</TabsTrigger>
              <TabsTrigger value="almuerzo">Almuerzos</TabsTrigger>
              <TabsTrigger value="cena">Cenas</TabsTrigger>
              <TabsTrigger value="snack">Snacks</TabsTrigger>
            </TabsList>

            <TabsContent value="todas">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recetas.map((receta) => (
                  <Card key={receta.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                    onClick={() => setRecetaSeleccionada(receta)}>
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={receta.imagen} 
                        alt={receta.nombre}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-800 capitalize">
                          {receta.categoria}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-bold text-lg text-gray-900 mb-2">{receta.nombre}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{receta.descripcion}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          {receta.tiempo}
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-orange-500 font-medium">{receta.calorias} kcal</span>
                          <span className="text-blue-500 font-medium">{receta.proteinas}g prot</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {['desayuno', 'almuerzo', 'cena', 'snack'].map((categoria) => (
              <TabsContent key={categoria} value={categoria}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recetas.filter(r => r.categoria === categoria).map((receta) => (
                    <Card key={receta.id} className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
                      onClick={() => setRecetaSeleccionada(receta)}>
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={receta.imagen} 
                          alt={receta.nombre}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white/90 text-gray-800 capitalize">
                            {receta.categoria}
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5">
                        <h3 className="font-bold text-lg text-gray-900 mb-2">{receta.nombre}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{receta.descripcion}</p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-gray-500">
                            <Clock className="w-4 h-4" />
                            {receta.tiempo}
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-orange-500 font-medium">{receta.calorias} kcal</span>
                            <span className="text-blue-500 font-medium">{receta.proteinas}g prot</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Planes de Dieta Section */}
      <section id="dietas" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-100 text-blue-700 border-0">Planes de 30 Días Completos</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Elige tu Objetivo - 30 Días de Menús
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Planes nutricionales completos con menús diarios detallados para 30 días. Diseñados específicamente para diferentes objetivos deportivos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Plan Volumen */}
            <Card className="overflow-hidden border-2 border-blue-200 hover:border-blue-500 transition-all hover:shadow-xl">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl">Volumen</h3>
                    <p className="text-blue-100 text-sm">Ganancia Muscular</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">2800-3200</span>
                  <span className="text-blue-100">kcal/día</span>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6">
                  Plan diseñado para ganar masa muscular de calidad con superávit calórico controlado. Incluye 6 comidas diarias.
                </p>
                
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-700 mb-3">Distribución de Macros:</div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Proteínas</span>
                        <span className="font-medium text-blue-600">30%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '30%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Carbohidratos</span>
                        <span className="font-medium text-orange-600">50%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '50%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Grasas</span>
                        <span className="font-medium text-green-600">20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '20%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    <span>30 días de menús completos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    <span>6 comidas diarias</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                    <span>Alto contenido proteico</span>
                  </div>
                </div>

                <Button onClick={() => abrirPlan('volumen')} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6">
                  <Calendar className="w-5 h-5 mr-2" />
                  Ver Plan 30 Días
                </Button>
              </CardContent>
            </Card>

            {/* Plan Definicion */}
            <Card className="overflow-hidden border-2 border-orange-200 hover:border-orange-500 transition-all hover:shadow-xl">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Flame className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl">Definición</h3>
                    <p className="text-orange-100 text-sm">Pérdida de Grasa</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">1800-2200</span>
                  <span className="text-orange-100">kcal/día</span>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6">
                  Plan para reducir grasa corporal manteniendo la masa muscular con déficit calórico controlado.
                </p>
                
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-700 mb-3">Distribución de Macros:</div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Proteínas</span>
                        <span className="font-medium text-blue-600">45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '45%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Carbohidratos</span>
                        <span className="font-medium text-orange-600">25%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '25%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Grasas</span>
                        <span className="font-medium text-green-600">30%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '30%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    <span>30 días de menús completos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    <span>5-6 comidas diarias</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                    <span>Alto proteína, bajo carbohidrato</span>
                  </div>
                </div>

                <Button onClick={() => abrirPlan('definicion')} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6">
                  <Calendar className="w-5 h-5 mr-2" />
                  Ver Plan 30 Días
                </Button>
              </CardContent>
            </Card>

            {/* Plan Mantenimiento */}
            <Card className="overflow-hidden border-2 border-green-200 hover:border-green-500 transition-all hover:shadow-xl">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl">Mantenimiento</h3>
                    <p className="text-green-100 text-sm">Equilibrio</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">2200-2600</span>
                  <span className="text-green-100">kcal/día</span>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-6">
                  Plan equilibrado para mantener tu composición corporal actual de forma saludable y sostenible.
                </p>
                
                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-700 mb-3">Distribución de Macros:</div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Proteínas</span>
                        <span className="font-medium text-blue-600">35%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '35%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Carbohidratos</span>
                        <span className="font-medium text-orange-600">40%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: '40%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Grasas</span>
                        <span className="font-medium text-green-600">25%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '25%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>30 días de menús completos</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>5 comidas diarias</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Distribución equilibrada</span>
                  </div>
                </div>

                <Button onClick={() => abrirPlan('mantenimiento')} className="w-full bg-green-500 hover:bg-green-600 text-white py-6">
                  <Calendar className="w-5 h-5 mr-2" />
                  Ver Plan 30 Días
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consejos Section */}
      <section id="consejos" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-0">Consejos Expertos</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Claves para el Éxito
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Principios fundamentales de nutrición deportiva que te ayudarán a maximizar tus resultados.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consejos.map((consejo, idx) => (
              <Card key={idx} className="text-center p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-white rounded-2xl shadow-sm">
                    {consejo.icono}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">{consejo.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{consejo.descripcion}</p>
              </Card>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-16 bg-green-600 rounded-3xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Recibe Recetas Exclusivas en tu Email
            </h3>
            <p className="text-green-100 mb-8 max-w-xl mx-auto">
              Suscríbete y recibe cada semana nuevas recetas fitness, consejos nutricionales y planes de comidas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3">
                <Mail className="w-4 h-4 mr-2" />
                Suscribirme
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">FitLife</span>
              </div>
              <p className="text-gray-400 text-sm">
                Tu plataforma de confianza para recetas fitness y planes de alimentación saludable.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Secciones</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button onClick={() => scrollToSection('recetas')} className="hover:text-green-400 transition-colors">Recetas</button></li>
                <li><button onClick={() => scrollToSection('dietas')} className="hover:text-green-400 transition-colors">Dietas 30 Días</button></li>
                <li><button onClick={() => scrollToSection('consejos')} className="hover:text-green-400 transition-colors">Consejos</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Planes Disponibles</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Volumen Muscular (30 días)</li>
                <li>Definición (30 días)</li>
                <li>Mantenimiento (30 días)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Síguenos</h4>
              <div className="space-y-3">
                <a 
                  href="https://instagram.com/dietas_equilibrio" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>@dietas_equilibrio</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
                  <Youtube className="w-5 h-5" />
                  <span>YouTube</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2025 FitLife. Todos los derechos reservados. | Creado por @dietas_equilibrio
          </div>
        </div>
      </footer>

      {/* Modal de Receta */}
      {recetaSeleccionada && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:hidden"
          onClick={() => setRecetaSeleccionada(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="relative h-64">
              <img 
                src={recetaSeleccionada.imagen} 
                alt={recetaSeleccionada.nombre}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setRecetaSeleccionada(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <Badge className="bg-white/90 text-gray-800 capitalize">
                  {recetaSeleccionada.categoria}
                </Badge>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{recetaSeleccionada.nombre}</h2>
              <p className="text-gray-600 mb-6">{recetaSeleccionada.descripcion}</p>
              
              <div className="flex gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  <span className="font-medium">{recetaSeleccionada.tiempo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">{recetaSeleccionada.calorias} kcal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Dumbbell className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{recetaSeleccionada.proteinas}g proteína</span>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-3">Ingredientes:</h3>
                <ul className="space-y-2">
                  {recetaSeleccionada.ingredientes.map((ingrediente, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{ingrediente}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white">
                Guardar Receta
                <Heart className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Dialog del Plan de 30 Días */}
      <Dialog open={!!planSeleccionado} onOpenChange={() => setPlanSeleccionado(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto print:max-w-none print:w-full print:h-auto print:overflow-visible">
          <div ref={printRef} className="print-content">
            {planSeleccionado && (
              <>
                <DialogHeader className="print:hidden">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm mb-2 ${getPlanData(planSeleccionado)?.color}`}>
                    {planSeleccionado === 'volumen' && <TrendingUp className="w-4 h-4" />}
                    {planSeleccionado === 'definicion' && <Flame className="w-4 h-4" />}
                    {planSeleccionado === 'mantenimiento' && <CheckCircle2 className="w-4 h-4" />}
                    {getPlanData(planSeleccionado)?.nombre}
                  </div>
                  <DialogTitle className="text-2xl">
                    Plan de 30 Días - {getPlanData(planSeleccionado)?.calorias} kcal/día
                  </DialogTitle>
                </DialogHeader>

                {/* Header para impresión */}
                <div className="hidden print:block mb-6">
                  <div className="text-center border-b-2 border-green-600 pb-4">
                    <h1 className="text-3xl font-bold text-gray-900">FitLife - Plan de Alimentación</h1>
                    <p className="text-xl text-green-600 mt-2">{getPlanData(planSeleccionado)?.nombre}</p>
                    <p className="text-gray-600">{getPlanData(planSeleccionado)?.calorias} kcal/día | 30 Días Completos</p>
                    <p className="text-sm text-gray-500 mt-2">@dietas_equilibrio</p>
                  </div>
                </div>

                {/* Botón Imprimir */}
                <div className="flex justify-end mb-4 print:hidden">
                  <Button 
                    onClick={handlePrint}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Imprimir Dieta
                  </Button>
                </div>

                {/* Navegación de días */}
                <div className="flex items-center justify-between bg-gray-100 rounded-xl p-4 mb-6 print:hidden">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => cambiarDia('anterior')}
                    disabled={diaActual === 1}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </Button>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-lg">Día {diaActual} de 30</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => cambiarDia('siguiente')}
                    disabled={diaActual === 30}
                    className="flex items-center gap-1"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>

                {/* Selector rápido de días */}
                <div className="mb-6 print:hidden">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Ir al día:</label>
                  <select 
                    value={diaActual}
                    onChange={(e) => setDiaActual(Number(e.target.value))}
                    className="w-full p-2 border rounded-lg"
                  >
                    {Array.from({ length: 30 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>Día {i + 1}</option>
                    ))}
                  </select>
                </div>

                {/* Menú del día */}
                <div className="space-y-4">
                  {(() => {
                    const plan = getPlanData(planSeleccionado)
                    const dia = plan?.data[diaActual - 1]
                    if (!dia) return null

                    const comidas = planSeleccionado === 'volumen' ? [
                      { key: 'desayuno', label: 'Desayuno', icon: <Utensils className="w-5 h-5" /> },
                      { key: 'media', label: 'Media Mañana', icon: <Clock className="w-5 h-5" /> },
                      { key: 'almuerzo', label: 'Almuerzo', icon: <Utensils className="w-5 h-5" /> },
                      { key: 'pre', label: 'Pre-Entreno', icon: <Dumbbell className="w-5 h-5" /> },
                      { key: 'post', label: 'Post-Entreno', icon: <TrendingUp className="w-5 h-5" /> },
                      { key: 'cena', label: 'Cena', icon: <Utensils className="w-5 h-5" /> }
                    ] : [
                      { key: 'desayuno', label: 'Desayuno', icon: <Utensils className="w-5 h-5" /> },
                      { key: 'media', label: 'Media Mañana', icon: <Clock className="w-5 h-5" /> },
                      { key: 'almuerzo', label: 'Almuerzo', icon: <Utensils className="w-5 h-5" /> },
                      { key: 'snack', label: 'Snack', icon: <Clock className="w-5 h-5" /> },
                      { key: 'cena', label: 'Cena', icon: <Utensils className="w-5 h-5" /> },
                      { key: 'opcional', label: 'Opcional', icon: <Info className="w-5 h-5" /> }
                    ]

                    return (
                      <>
                        <div className="print:hidden">
                          {comidas.map((comida) => (
                            <div key={comida.key} className="bg-gray-50 rounded-xl p-4 mb-3">
                              <div className="flex items-center gap-3 mb-2">
                                <div className={`p-2 rounded-lg text-white ${plan?.color}`}>
                                  {comida.icon}
                                </div>
                                <h4 className="font-semibold text-gray-900">{comida.label}</h4>
                              </div>
                              <p className="text-gray-700 ml-12">{(dia as any)[comida.key]}</p>
                            </div>
                          ))}
                        </div>
                        
                        {/* Versión para imprimir - Tabla */}
                        <div className="hidden print:block">
                          <table className="w-full border-collapse border-2 border-gray-300">
                            <thead>
                              <tr className="bg-green-600 text-white">
                                <th className="border-2 border-gray-300 p-3 text-left">Comida</th>
                                <th className="border-2 border-gray-300 p-3 text-left">Menú del Día {diaActual}</th>
                              </tr>
                            </thead>
                            <tbody>
                              {comidas.map((comida, idx) => (
                                <tr key={comida.key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                                  <td className="border-2 border-gray-300 p-3 font-semibold">{comida.label}</td>
                                  <td className="border-2 border-gray-300 p-3">{(dia as any)[comida.key]}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )
                  })()}
                </div>

                {/* Resumen semanal */}
                <div className="mt-6 p-4 bg-blue-50 rounded-xl print:hidden">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Consejo del Plan
                  </h4>
                  <p className="text-blue-800 text-sm">
                    {planSeleccionado === 'volumen' && "Recuerda beber al menos 3 litros de agua al día y ajustar las porciones según tu peso y nivel de actividad. Este plan está diseñado para entrenamientos de fuerza 4-5 días por semana."}
                    {planSeleccionado === 'definicion' && "Mantén una hidratación constante y realiza cardio moderado 3-4 veces por semana. Las porciones pueden ajustarse según tu progreso y objetivos específicos."}
                    {planSeleccionado === 'mantenimiento' && "Este plan es flexible y equilibrado. Puedes intercambiar comidas entre días y ajustar porciones según tu nivel de actividad física diaria."}
                  </p>
                </div>

                {/* Footer para impresión */}
                <div className="hidden print:block mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-500">
                  <p>FitLife - Plan de Alimentación {getPlanData(planSeleccionado)?.nombre}</p>
                  <p>Visítanos en Instagram: @dietas_equilibrio</p>
                  <p>© 2025 FitLife. Todos los derechos reservados.</p>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default App
