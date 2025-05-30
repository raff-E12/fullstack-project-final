import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scorre la finestra in cima
  }, [pathname]); // Dipendenza da 'pathname': l'effetto si attiva ogni volta che il pathname cambia

  return null; // Questo componente non renderizza nulla visivamente
}

export default ScrollToTop;