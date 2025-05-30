import { z } from "zod";

const ActorSchema = z.object({
  codigo: z.string().nonempty('El código es requerido'),
  nombreEntidad: z.string().nonempty('El nombre de la entidad es requerido'),
  sigla: z.string().optional(),
  alcance: z.string().optional(),
  departamento: z.string().optional(),
  provincia: z.string().optional(),
  municipio: z.string().optional(),
  direccion: z.string().optional(),
  telefono: z.string().optional(),
  paginaWeb: z.string().optional(),
  redesSociales: z.string().optional(),
  nombreRepresentante: z.string().optional(),
  cargoRepresentante: z.string().optional(),
  telefonoRepresentante: z.string().optional(),
  nombreResponsableTecnico: z.string().optional(),
  cargoResponsableTecnico: z.string().optional(),
  telefonoReponsableTecnico: z.string().optional(),
  poseeAfiliados: z.boolean().nullable().optional(),
  codigoEntidadesAfiliados: z.array(z.string()).nullable().optional(),
  calificacionImportanciaEstrategica: z.number().nullable().optional(),
  expectativaOrganizacion: z.string().nullable().optional(),
  fuerzaOrganizacion: z.string().nullable().optional(),
  resultante: z.string().nullable().nullable().optional(),
  posicionPotenciaFrenteCenso: z.string().nullable().optional(),
  sistemaAlertaTemprana: z.string().nullable().optional(),
  gestionConflictos: z.string().nullable().optional(),
  poseeDirectorioProductores: z.boolean().nullable().optional(),
  haceEntregaListadoProductores: z.boolean().nullable().optional(),
  caracteristicas: z.string().nullable().optional(),
  tipoSistemaTrabajo: z.string().nullable().optional(),
  nivelImportanciaEconomica: z.number().nullable().optional(),
  nivelImportanciaPolitica: z.number().nullable().optional(),
  afiliacionEntidadSuperior: z.string().nullable().optional(),
  codigoEntidadSuperior: z.string().nullable().optional(),
});

export function validacionActor(input) {
  return ActorSchema.safeParse(input);
}
export function validacionParcial(input) {
  return ActorSchema.partial().safeParse(input);
}


// import { z } from "zod";

// const actorRegistroShema = z.object({
//   codigo: z.string(),
//   nombreEntidad: z.string(),
//   sigla: z.string().optional(),
//   alcance: z.string().optional(),
//   departamento: z.string().optional(),
//   provincia: z.string().optional(),
//   municipio: z.string().optional(),
//   direccion: z.string().optional(),
//   telefono: z.string().optional(),
//   paginaWeb: z.string().optional(),
//   redesSociales: z.string().optional(),
//   nombreRepresentante: z.string().optional(),
//   cargoRepresentante: z.string().optional(),
//   telefonoRepresentante: z.string().optional(),
//   nombreResponsableTecnico: z.string().optional(),
//   cargoResponsableTecnico: z.string().optional(),
//   telefonoReponsableTecnico: z.string().optional(),
//   caracteristicas: z.string().optional(),
//   tipoSistemaTrabajo: z.string().optional(),
//   nivelImportanciaEconomica: z.string().optional(),
//   nivelImportanciaPolitica: z.string().optional(),
//   afiliacionEntidadSuperior: z.string().optional(),
//   codigoEntidadSuperior: z.string().optional(),
//   poseeAfiliados: z.string().optional(),
//   codigoEntidadesAfiliados: z.string().optional(),
//   calificacionImportanciaEstrategica: z.string().optional(),
//   expectativaOrganizacion: z.number().optional(),
//   fuerzaOrganizacion: z.number().optional(),
//   resultante: z.number().optional(),
//   posicionPotenciaFrenteCenso: z.string().optional(),
//   sistemaAlertaTemprana: z.string().optional(),
//   gestionConflictos: z.string().optional(),
//   poseeDirectorioProductores: z.string().optional(),
//   haceEntregaListadoProductores: z.string().optional(),
// });

// export function validacionActor(input) {
//   return actorRegistroShema.safeParse(input);
// }
// export function validacionParcial(input) {
//   return actorRegistroShema.partial().safeParse(input);
// }
