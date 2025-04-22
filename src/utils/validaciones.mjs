export const validarSuperheroe = (datos, esEdicion = false) => {
  const errores = [];

  const validarTexto = (campo, nombreCampo) => {
    if (!campo || campo.trim() === '') {
      return `${nombreCampo} es obligatorio.`;
    }
    const valor = campo.trim();
    if (valor.length < 3 || valor.length > 60) {
      return `${nombreCampo} debe tener entre 3 y 60 caracteres.`;
    }
    return null;
  };

  const validarArrayTexto = (arr, nombreCampo, obligatorio = true) => {
    // Si no es obligatorio y el array está vacío, no generamos error
    if (obligatorio && arr.length === 0) {
      return `${nombreCampo} es obligatorio y debe tener entre 3 y 60 caracteres.`;
    }

    // Validamos los elementos del array
    for (const item of arr) {
      if (typeof item !== 'string' || item.trim() === '') {
        return `Cada elemento de ${nombreCampo} debe ser un texto no vacío.`;
      }

      const valor = item.trim();
      if (valor.length < 3 || valor.length > 60) {
        return `Cada elemento de ${nombreCampo} debe tener entre 3 y 60 caracteres.`;
      }
    }

    return null;
  };

  if (!esEdicion) {
    // Validaciones principales para crear
    const nombreSuperheroeError = validarTexto(datos.nombreSuperheroe, 'El nombre del superhéroe');
    if (nombreSuperheroeError) errores.push(nombreSuperheroeError);

    const nombreRealError = validarTexto(datos.nombreReal, 'El nombre real');
    if (nombreRealError) errores.push(nombreRealError);

    if (!datos.edad || isNaN(Number(datos.edad)) || Number(datos.edad) < 0) {
      errores.push('La edad debe ser un número válido y no puede ser negativa.');
    }    

    // Validación de los arrays de manera uniforme
    const camposArray = [
      { campo: datos.poderes, nombre: 'Poderes' },
      { campo: datos.aliados, nombre: 'Aliados', obligatorio: false },
      { campo: datos.enemigos, nombre: 'Enemigos', obligatorio: false },
    ];

    camposArray.forEach(({ campo, nombre, obligatorio = true }) => {
      const error = validarArrayTexto(campo, nombre, obligatorio);
      if (error) errores.push(error);
    });

  } else {
    // Validación de edición: se puede editar solo algunos campos
    const campos = [
      'nombreSuperheroe', 'nombreReal', 'edad',
      'planetaOrigen', 'debilidad', 'poderes',
      'aliados', 'enemigos'
    ];

    const algunCampoEditado = campos.some(campo => {
      const valor = datos[campo];
      if (Array.isArray(valor)) {
        return valor.some(item => item && item.trim() !== '');
      } else {
        return valor && valor.toString().trim() !== '';
      }
    });

    if (!algunCampoEditado) {
      errores.push("Debes modificar al menos un campo.");
    } else {
      // Solo validamos los campos que estén presentes
      if (datos.nombreSuperheroe) {
        const e = validarTexto(datos.nombreSuperheroe, 'El nombre del superhéroe');
        if (e) errores.push(e);
      }

      if (datos.nombreReal) {
        const e = validarTexto(datos.nombreReal, 'El nombre real');
        if (e) errores.push(e);
      }

      if (datos.edad !== undefined && datos.edad !== null && datos.edad.toString().trim() !== '') {
        if (isNaN(datos.edad) || Number(datos.edad) < 0) {
          errores.push('La edad debe ser un número válido y no puede ser negativa.');
        }
      }

      // Validación de arrays en edición
      const camposArrayEdicion = [
        { campo: datos.poderes, nombre: 'Poderes' },
        { campo: datos.aliados, nombre: 'Aliados', obligatorio: false },
        { campo: datos.enemigos, nombre: 'Enemigos', obligatorio: false },
      ];

      camposArrayEdicion.forEach(({ campo, nombre, obligatorio = true }) => {
        if (campo) {
          const error = validarArrayTexto(campo, nombre, obligatorio);
          if (error) errores.push(error);
        }
      });
    }
  }

  return errores;
};
