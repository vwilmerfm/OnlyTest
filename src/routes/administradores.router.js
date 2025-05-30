import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt.js"
const router = Router();

import * as admincCtrl from "../controllers/administradores.controller.js";
import * as actorCtrl from "../controllers/actores.controller.js";

router.get("/lista_administradores", [verifyToken], admincCtrl.getAdministrador);
router.post("/registro_admmin", admincCtrl.postRegistroAdministrador);
router.post("/login", admincCtrl.loginAdministrador);
router.get("/:datos_admin", [verifyToken], admincCtrl.getAdministradorById);
router.put("/actualizar/:actualizar_admin", [verifyToken], admincCtrl.updateAdministradorById);
router.post("/eliminar", [verifyToken], admincCtrl.deleteAdminitrador);


router.post("/actor", [verifyToken], actorCtrl.crearActor);

export default router;
[verifyToken]