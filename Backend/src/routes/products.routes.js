import { Router } from "express";

import {ChangeStateTrabajador, ChangeStateUser, CreateNewFeedBack, CreateNewLugar,CreateNewPeticion,CreateNewRegistrado,CreateNewService, createNewTrabajador, CreateNewTrabaja_en, createNewUser, GetFeedback, GetLugar, GetPeticion, GetService, GetTrabajador, GetTrabajadorLugarService, GetUser} from "../controllers/system.controller";

const router = Router();

router.post("/User/addUser",createNewUser);
router.post("/User/Status", ChangeStateUser);
router.post("/User/GetUser",GetUser);

router.post("/Trabajador/addTrabajador", createNewTrabajador);
router.post("/Trabajador/addRegister", CreateNewRegistrado);
router.post("/Trabajador/addTrabajo", CreateNewTrabaja_en);
router.post("/Trabajador/Status", ChangeStateTrabajador);
router.post("/Trabajador/GetTrabajador", GetTrabajador);
router.post("/Trabajador/GetTrabajadorLugarService", GetTrabajadorLugarService);

router.post("/FeedBack/addFeedBack", CreateNewFeedBack);
router.post("/FeedBack/GetFeedBack", GetFeedback);

router.post("/Service/addService", CreateNewService);
router.post("/Service/GetService", GetService);

router.post("/Lugar/addLugar", CreateNewLugar);
router.post("/Lugar/GetLugar", GetLugar);

router.post("/Peticion/addPeticion", CreateNewPeticion);
router.post("/Peticion/GetPeticion", GetPeticion);

export default router;

 