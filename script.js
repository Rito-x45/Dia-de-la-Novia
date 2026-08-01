document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------
     Año dinámico en el pie de página
  --------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------
     Numeración automática de los enlaces
     (para que se vean como líneas de código,
     tipo 01, 02, 03... aunque agregues o
     quites enlaces en el HTML)
  --------------------------------------- */
  document.querySelectorAll('.link-row__no').forEach((el, i) => {
    el.textContent = String(i + 1).padStart(2, '0');
  });

  /* ---------------------------------------
     Efecto de "escritura" tipo terminal
     Cambia este arreglo por tus propios roles
  --------------------------------------- */
  const typedEl = document.getElementById('typed');
  const roles = [
    'Desarrollador Full-Stack',
    'Creador de contenido',
    'Amante del código limpio'
  ];

  if (typedEl) {
    if (prefersReducedMotion) {
      // Si el usuario prefiere menos movimiento, mostramos texto fijo
      typedEl.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let deleting = false;

      const type = () => {
        const current = roles[roleIndex];
        charIndex += deleting ? -1 : 1;
        typedEl.textContent = current.slice(0, charIndex);

        let delay = deleting ? 40 : 70;

        if (!deleting && charIndex === current.length) {
          deleting = true;
          delay = 1400; // pausa antes de borrar
        } else if (deleting && charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          delay = 300; // pausa antes de escribir el siguiente
        }

        setTimeout(type, delay);
      };

      type();
    }
  }

  /* ---------------------------------------
     Aviso flotante al hacer clic en el correo
  --------------------------------------- */
  const mailLink = document.getElementById('mailLink');
  const toast = document.getElementById('toast');
  let toastTimeout;

  if (mailLink && toast) {
    mailLink.addEventListener('click', () => {
      toast.textContent = 'Abriendo tu cliente de correo…';
      toast.classList.add('is-visible');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('is-visible');
      }, 2200);
    });
  }
});
