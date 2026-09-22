/**
 * Utilidades de formato para Vinoteca Astringencia.
 * Convenciones argentinas: fechas DD/MM/YYYY, horarios 24h, moneda "$ XXX".
 */

/**
 * Formatea un precio en pesos argentinos con el formato "$ 1.500"
 * Business Rule: moneda siempre como "$ XXX" (convención argentina)
 */
export function formatearPrecio(precio: number): string {
  return `$ ${precio.toLocaleString('es-AR')}`;
}

/**
 * Formatea una fecha ISO al formato argentino DD/MM/YYYY
 * Business Rule: fechas en formato DD/MM/YYYY
 */
export function formatearFecha(fechaISO: string): string {
  const soloFecha = fechaISO.split('T')[0];
  const [anio, mes, dia] = soloFecha.split('-');
  return `${dia}/${mes}/${anio}`;
}

/**
 * Formatea una hora al formato 24h "HH:MM"
 * Business Rule: horarios en formato 24h (ej: "18:00")
 */
export function formatearHora(hora: string): string {
  if (/^\d{2}:\d{2}$/.test(hora)) return hora;
  const fecha = new Date(`1970-01-01T${hora}`);
  return fecha.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 * Verifica si la fecha de un evento ya pasó respecto al día de hoy.
 * Requirement 7: eventos pasados no se muestran.
 */
export function eventoPasado(fechaISO: string, horaStr?: string): boolean {
  const ahora = new Date();
  
  // 1. Extraemos año, mes y día para forzar la zona horaria local
  const [anio, mes, dia] = fechaISO.split('T')[0].split('-');
  
  // 2. Creamos la fecha en hora local (Nota: los meses en JS empiezan en 0)
  const fechaEvento = new Date(Number(anio), Number(mes) - 1, Number(dia));

  // 3. Si nos pasan la hora del evento (ej: "17:00"), la incorporamos
  if (horaStr) {
    const [horas, minutos] = horaStr.split(':');
    fechaEvento.setHours(Number(horas), Number(minutos), 0, 0);
    // Comparamos el momento exacto (Día y Hora)
    return fechaEvento < ahora;
  }

  // 4. Si no hay hora, simplemente comparamos que el día entero no haya pasado
  ahora.setHours(0, 0, 0, 0);
  return fechaEvento < ahora;
}
/**
 * Trunca un texto a un máximo de caracteres, añadiendo "…" al final.
 */
export function truncarTexto(texto: string, maxCaracteres: number): string {
  if (texto.length <= maxCaracteres) return texto;
  return `${texto.substring(0, maxCaracteres).trimEnd()}…`;
}

