import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt.js"
const router = Router();

import * as actorCtrl from "../controllers/actores.controller.js";
import * as interactionCtrl from "../controllers/interactionController.js";
import * as representanteCtrl from "../controllers/representantes.js";
import * as catalogoCtrl from "../controllers/catalogo.js";
import * as agendaCtrl from "../controllers/agenda.js";
import * as correspondenciaCtrl from "../controllers/correspondencia.js";
import * as archivoCtrl from "../controllers/archivo.js";

router.post("/actor", verifyToken, actorCtrl.createActor);
router.get("/actor", verifyToken, actorCtrl.listaActores);
router.get("/parametros", verifyToken, actorCtrl.obtenerParametricosActores);
router.post("/meeting/:actorId", verifyToken, interactionCtrl.createMeeting);
router.post("/correspondence/:actorId", verifyToken, interactionCtrl.createCorrespondencia);
router.post("/agreement/:actorId", verifyToken, interactionCtrl.createMeeting);
router.put("/meeting/:actorId/:reunionId", verifyToken, interactionCtrl.updateMeeting);
router.put("/meeting/:reunionId", verifyToken, interactionCtrl.actualizarReunionEstado);
router.put("/agreement/:actorId/:reunionId", verifyToken, interactionCtrl.updateMeeting);
router.get("/file/:idArchivo", verifyToken, interactionCtrl.obtenerImagen);
router.use(interactionCtrl.errorHandlerMiddleware);
router.post('/actores', verifyToken, actorCtrl.buscarActoresPorCodigo);
// router.get('/actor-seguimiento', verifyToken, actorCtrl.obtenerActores);
router.get('/actores-representantes', verifyToken, actorCtrl.obtenerRepresentantesConEntidad);
router.post('/reuniones-documentos/:actorId', verifyToken, actorCtrl.obtenerReunionesDocumentos);
router.get('/municipio/comunidad/buscar/:termino', verifyToken, actorCtrl.buscarPorCiudadComunidad);
// edicion de actores
router.put("/actor/:actorId", verifyToken, actorCtrl.actualizaraEntidad);
// edicon de representantes
router.put("/representante/:idRepresentante", verifyToken, actorCtrl.actualizarRepresentante);
// listado de entidades superiores y afiliadas
router.get("/entidades-superiores-afiliadas/:actorId", verifyToken, actorCtrl.obtenerEntidadesRelacionadas);
// guardao de entidades superiores y afiliadas
router.post('/actor/:actorId/relacionar', verifyToken, actorCtrl.relacionarEntidad);
router.delete('/actor/:actorId/desvincular', verifyToken, actorCtrl.desvincularEntidad);

// routers para dashboard 2024
router.get("/api/reportexdepto", actorCtrl.reporteAparicionesxDepto);
router.get("/api/totalOrganizaciones", actorCtrl.totalOrganizaciones);
router.get("/api/totalAlcancextipoOrg/:idTipo/:par_id?", actorCtrl.totalAlcancextipoOrg);
router.get("/api/totalAlcancextipoOrgPriv/:idTipo/:par_id?", actorCtrl.totalAlcancextipoOrgPriv);
router.get("/api/totalReuniones/:reu_tipo", actorCtrl.totalReuniones);
router.get("/api/coberturaUTCA", actorCtrl.coberturaUTCA);
// CON TOKEN 
router.get("/listaInstituciones", verifyToken, actorCtrl.listaInstituciones);
router.get("/listaInstitucionesId/:id_institucion", verifyToken, actorCtrl.listaInstitucionesId);
router.get("/listaReunionesAgenda", verifyToken, actorCtrl.listaReunionesAgenda);
router.get("/listaReunionesAgendaId/:id", verifyToken, actorCtrl.listaReunionesAgendaId);
router.get("/listaCorrespondenciaIdTipo/:idTipo", verifyToken, actorCtrl.listaCorrespondenciaIdTipo);







//coberturaUTCA
//totalAlcancextipoOrgPriv
//-------------------------------------------------

// representantes
router.get("/representantes/:actorId", verifyToken, representanteCtrl.listarRepresentantes);

// catalogos de departamentos, provincias, municipios
router.get("/departamentos", verifyToken, catalogoCtrl.obtenerTodosLosDepartamentos);
router.get("/provincias/:codigoDepartamento", verifyToken, catalogoCtrl.obtenerProvinciasPorDepartamento);
router.get("/municipios/:codigoProvincia/:codigoDepartamento", verifyToken, catalogoCtrl.obtenerMunicipiosPorProvincia);

// agendas
router.get("/agendas/:actorId", verifyToken, agendaCtrl.obtenerAgendas);
router.post("/agenda/:actorId", verifyToken, agendaCtrl.crearReunion);
// router.get("/reuniones/:actorId", verifyToken, agendaCtrl.obtenerReunionesPasadas);
router.get('/reuniones-documentos-filtro/:actorId', verifyToken, agendaCtrl.obtenerReunionesDocumentos);
router.get('/reunion/:reunionId', verifyToken, agendaCtrl.obtenerReunionPorId);
router.put("/reunion/:reunionId", verifyToken, agendaCtrl.actualizarReunion);
router.delete("/reunion/:reunionId", verifyToken, agendaCtrl.eliminarReunion);

// correspondencias
router.get("/correspondencias/:actorId", verifyToken, correspondenciaCtrl.listarCorrespondencias);
router.get("/correspondencia/:idCorrespondencia", verifyToken, correspondenciaCtrl.obtenerCorrespondenciaConArchivos);
router.put("/correspondencia/:idCorrespondencia", verifyToken, correspondenciaCtrl.actualizarCorrespondencia);
router.delete("/correspondencia/:idCorrespondencia", verifyToken, correspondenciaCtrl.eliminarCorrespondencia);

// crear un representante
router.post("/representante", verifyToken, representanteCtrl.crearRepresentante);

// archivos
// eliminacino de archivos
router.delete("/archivo/:idArchivo", verifyToken, archivoCtrl.eliminarArchivo);
// guardar archivo
router.post("/archivo", verifyToken, interactionCtrl.guardarArchivo);

export default router;
