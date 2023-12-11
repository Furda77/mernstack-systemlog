import express from "express"; // slouží k vytvoření API
import cors from "cors"; // slouží ke sdílení dat z front-end na back-end
import mongoose from "mongoose"; // slouží k vytvoření databáze jednodušším schématem
import dotenv from "dotenv" //Proměnné pro prostředí, slouží k bezpečí a přístupu do konfigurace prostředí
import morgan from "morgan"; //Slouží pro logování, užítečné při debuggingu
import helmet from "helmet"; //Pro vetší bezpečí. Nastavení různých HTTP záhlaví.
import bodyParser from "body-parser"; // Pro lepší manipulaci s daty v Express
import generalRoutes from "./routes/general.js"; //Rozcestníky pro URL
import managementRoutes from "./routes/management.js";
import clientRoutes from "./routes/client.js"
import overviewRoutes from "./routes/overview.js"
import dashboardRoutes from "./routes/dashboard.js"

//Importování dat do databáze
import SystemData from "./models/SystemData.js";
import User from "./models/User.js";
import { dataUser, systemData } from "./data/index.js";

//Konfigurace pro 
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes pro 
app.use("/overview", overviewRoutes)
app.use("/general", generalRoutes)
app.use("/management", managementRoutes);
app.use("/client", clientRoutes)
app.use("/dashboard", dashboardRoutes)



/* MONGOOSE Nastavení */
const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server port: ${PORT}`));

        //Pouze, když je potřeba vložit data do systému
        //SystemData.insertMany(systemData);
        //User.insertMany(dataUser);
    })
    .catch((error) => console.log(`${error} did not connect`));