'use client';

import { useState, useEffect } from 'react';

/** Horarios del negocio por dia de semana (0=Domingo, 1=Lunes, ..., 6=Sabado) */
const HORARIOS = [
  { apertura: null, cierre: null },       // 0 - Domingo: cerrado
  { apertura: 18, cierre: 24 },           // 1 - Lunes
  { apertura: 18, cierre: 24 },           // 2 - Martes
  { apertura: 18, cierre: 24 },           // 3 - Miercoles
  { apertura: 18, cierre: 24 },           // 4 - Jueves
  { apertura: 17, cierre: 26 },           // 5 - Viernes (26 = 02:00 del dia siguiente)
  { apertura: 17, cierre: 26 },           // 6 - Sabado (26 = 02:00 del dia siguiente)
];

/** Determina si el negocio esta abierto en este momento */
function calcularAbierto(): boolean {
  const ahora = new Date();
  const diaSemana = ahora.getDay();
  const horaActual = ahora.getHours();
  const horaNumero = horaActual + (horaActual < 6 ? 24 : 0); // normalizar madrugada

  const horario = HORARIOS[diaSemana];
  if (!horario.apertura || !horario.cierre) return false;

  // Verificar si son las primeras horas del dia (madrugada del dia anterior)
  const diaAnterior = diaSemana === 0 ? 6 : diaSemana - 1;
  const horarioDiaAnterior = HORARIOS[diaAnterior];
  if (horarioDiaAnterior.cierre && horarioDiaAnterior.cierre > 24 && horaActual < 6) {
    return true;
  }

  return horaNumero >= horario.apertura && horaNumero < horario.cierre;
}

/**
 * Indicador visual de "Abierto ahora" o "Cerrado".
 * Client Component: calcula el estado en el navegador del usuario.
 * Requirement 9: indicador de estado de apertura en tiempo real.
 */
export default function IndicadorAbierto() {
  const [abierto, setAbierto] = useState<boolean | null>(null);

  useEffect(() => {
    setAbierto(calcularAbierto());

    // Actualizar cada minuto
    const intervalo = setInterval(() => {
      setAbierto(calcularAbierto());
    }, 60_000);

    return () => clearInterval(intervalo);
  }, []);

  // No renderizar en SSR para evitar hidratacion incorrecta
  if (abierto === null) return null;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold fuente-cuerpo px-2.5 py-1 rounded-full ${
        abierto
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-600'
      }`}
      aria-live="polite"
      aria-label={abierto ? 'Actualmente abierto' : 'Actualmente cerrado'}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full animate-pulse ${
          abierto ? 'bg-green-500' : 'bg-red-400'
        }`}
        aria-hidden="true"
      />
      {abierto ? 'Abierto ahora' : 'Cerrado ahora'}
    </span>
  );
}

