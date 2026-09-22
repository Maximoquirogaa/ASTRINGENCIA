'use client';

import { useState } from 'react';
import type { DatosFormularioContacto, EstadoEnvio } from '@/tipos';
import { rastrearEnvioFormulario } from '@/componentes/analytics/rastrear';

/** Estado inicial del formulario */
const estadoInicial: DatosFormularioContacto = {
  nombre: '',
  email: '',
  mensaje: '',
};

/** Errores de validacion por campo */
type ErroresCampo = Partial<Record<keyof DatosFormularioContacto, string>>;

/** Valida los campos en el cliente antes de enviar */
function validarFormulario(datos: DatosFormularioContacto): ErroresCampo {
  const errores: ErroresCampo = {};

  if (!datos.nombre.trim() || datos.nombre.trim().length < 2) {
    errores.nombre = 'Ingresa tu nombre (mínimo 2 caracteres)';
  }
  if (!datos.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email)) {
    errores.email = 'Ingresa un email válido';
  }
  if (!datos.mensaje.trim() || datos.mensaje.trim().length < 10) {
    errores.mensaje = 'El mensaje debe tener al menos 10 caracteres';
  }

  return errores;
}

/**
 * Formulario de contacto con validacion en cliente y manejo de estados.
 * Requirement 11: campos nombre, email, mensaje. Validacion y respuesta de estado.
 */
export default function FormularioContacto() {
  const [datos, setDatos] = useState<DatosFormularioContacto>(estadoInicial);
  const [errores, setErrores] = useState<ErroresCampo>({});
  const [estadoEnvio, setEstadoEnvio] = useState<EstadoEnvio>('inactivo');
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');

  const actualizarCampo = (campo: keyof DatosFormularioContacto, valor: string) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
    // Limpiar error del campo al escribir
    if (errores[campo]) {
      setErrores((prev) => ({ ...prev, [campo]: undefined }));
    }
  };

  const enviarFormulario = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    // Validacion en cliente
    const erroresValidacion = validarFormulario(datos);
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    setEstadoEnvio('enviando');
    setMensajeRespuesta('');

    try {
      const respuesta = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();

      if (respuesta.ok && resultado.exito) {
        setEstadoEnvio('exitoso');
        setMensajeRespuesta(resultado.mensaje);
        setDatos(estadoInicial);
        setErrores({});
        rastrearEnvioFormulario();
      } else {
        setEstadoEnvio('error');
        setMensajeRespuesta(resultado.mensaje || 'Algo salió mal. Intentá de nuevo.');
      }
    } catch {
      setEstadoEnvio('error');
      setMensajeRespuesta('No pudimos enviar tu mensaje. Intentá por WhatsApp.');
    }
  };

  // Estado de exito: mostrar mensaje y opcion de enviar otro
  if (estadoEnvio === 'exitoso') {
    return (
      <div
        className="flex flex-col items-center gap-4 py-10 text-center"
        role="status"
        aria-live="polite"
      >
        <div
          className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl"
          aria-hidden="true"
        >
          ✓
        </div>
        <h3 className="fuente-display text-[var(--color-fondo)] text-2xl font-semibold">
          ¡Mensaje enviado!
        </h3>
        <p className="fuente-cuerpo text-[var(--color-fondo)]/70 max-w-[40ch]">
          {mensajeRespuesta}
        </p>
        <button
          onClick={() => setEstadoEnvio('inactivo')}
          className="boton-secundario text-sm mt-2"
          style={{ color: 'var(--color-fondo)', borderColor: 'var(--color-fondo)' }}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={enviarFormulario}
      noValidate
      aria-label="Formulario de contacto"
      className="flex flex-col gap-5"
    >
      {/* Campo Nombre */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contacto-nombre"
          className="fuente-cuerpo text-xs font-semibold uppercase tracking-widest text-[var(--color-prueba)] opacity-70"
        >
          Tu nombre <span aria-hidden="true" className="text-[var(--color-acento)]">*</span>
        </label>
        <input
          id="contacto-nombre"
          type="text"
          name="nombre"
          value={datos.nombre}
          onChange={(e) => actualizarCampo('nombre', e.target.value)}
          placeholder="Ana García"
          required
          minLength={2}
          autoComplete="name"
          aria-describedby={errores.nombre ? 'error-nombre' : undefined}
          aria-invalid={!!errores.nombre}
          className={`fuente-cuerpo text-sm px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.08)] text-[var(--color-fondo)] placeholder-[var(--color-fondo)]/30 border outline-none transition-colors duration-200 focus:ring-2 focus:ring-[var(--color-acento)] ${
            errores.nombre
              ? 'border-red-400'
              : 'border-[rgba(255,255,255,0.15)] focus:border-[var(--color-acento)]'
          }`}
        />
        {errores.nombre && (
          <span id="error-nombre" role="alert" className="fuente-cuerpo text-xs text-red-300">
            {errores.nombre}
          </span>
        )}
      </div>

      {/* Campo Email */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contacto-email"
          className="fuente-cuerpo text-xs font-semibold uppercase tracking-widest text-[var(--color-prueba)] opacity-70"
        >
          Tu email <span aria-hidden="true" className="text-[var(--color-acento)]">*</span>
        </label>
        <input
          id="contacto-email"
          type="email"
          name="email"
          value={datos.email}
          onChange={(e) => actualizarCampo('email', e.target.value)}
          placeholder="ana@ejemplo.com"
          required
          autoComplete="email"
          aria-describedby={errores.email ? 'error-email' : undefined}
          aria-invalid={!!errores.email}
          className={`fuente-cuerpo text-sm px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.08)] text-[var(--color-fondo)] placeholder-[var(--color-fondo)]/30 border outline-none transition-colors duration-200 focus:ring-2 focus:ring-[var(--color-acento)] ${
            errores.email
              ? 'border-red-400'
              : 'border-[rgba(255,255,255,0.15)] focus:border-[var(--color-acento)]'
          }`}
        />
        {errores.email && (
          <span id="error-email" role="alert" className="fuente-cuerpo text-xs text-red-300">
            {errores.email}
          </span>
        )}
      </div>

      {/* Campo Mensaje */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="contacto-mensaje"
          className="fuente-cuerpo text-xs font-semibold uppercase tracking-widest text-[var(--color-prueba)] opacity-70"
        >
          Tu mensaje <span aria-hidden="true" className="text-[var(--color-acento)]">*</span>
        </label>
        <textarea
          id="contacto-mensaje"
          name="mensaje"
          value={datos.mensaje}
          onChange={(e) => actualizarCampo('mensaje', e.target.value)}
          placeholder="Hola! Me gustaría reservar una mesa para el evento del viernes..."
          required
          minLength={10}
          rows={4}
          aria-describedby={errores.mensaje ? 'error-mensaje' : undefined}
          aria-invalid={!!errores.mensaje}
          className={`fuente-cuerpo text-sm px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.08)] text-[var(--color-fondo)] placeholder-[var(--color-fondo)]/30 border outline-none transition-colors duration-200 focus:ring-2 focus:ring-[var(--color-acento)] resize-none ${
            errores.mensaje
              ? 'border-red-400'
              : 'border-[rgba(255,255,255,0.15)] focus:border-[var(--color-acento)]'
          }`}
        />
        {errores.mensaje && (
          <span id="error-mensaje" role="alert" className="fuente-cuerpo text-xs text-red-300">
            {errores.mensaje}
          </span>
        )}
      </div>

      {/* Error general */}
      {estadoEnvio === 'error' && (
        <div
          role="alert"
          aria-live="assertive"
          className="fuente-cuerpo text-sm text-red-300 bg-red-900/30 px-4 py-3 rounded-lg border border-red-400/30"
        >
          {mensajeRespuesta}
        </div>
      )}

      {/* Boton de envio */}
      <button
        type="submit"
        disabled={estadoEnvio === 'enviando'}
        className="boton-acento text-base w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
        aria-label={estadoEnvio === 'enviando' ? 'Enviando mensaje...' : 'Enviar mensaje de contacto'}
      >
        {estadoEnvio === 'enviando' ? (
          <span className="flex items-center gap-2">
            <span
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"
              aria-hidden="true"
            />
            Enviando...
          </span>
        ) : (
          'Enviar mensaje'
        )}
      </button>

      <p className="fuente-cuerpo text-xs text-[var(--color-fondo)]/30 text-center">
        * Campos obligatorios. Respondemos dentro de las 24 horas hábiles.
      </p>
    </form>
  );
}
