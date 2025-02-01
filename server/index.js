import express from "express";
import cors from "cors";
import { connection } from "./postgres/postgres.js";
import router from "./routes/route.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3001",
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(router);

app.listen(8000, () => {
  console.log(`Server is running at port 8000`);
});
connection();
