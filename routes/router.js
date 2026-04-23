import {express} from 'express';

let router = express.Router();

router.get(
    "/", (req, res) => {
    res.send("Oi");
    res.status(200).json({ message: "Oi" });
});