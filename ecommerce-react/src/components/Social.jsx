import React, { useState, useRef, useEffect } from "react";
import "../style/Social.css";

const SocialSwiper = () => {
  // Stati per gestire il comportamento dello slider
  const [currentSlide, setCurrentSlide] = useState(0); // Indice della slide corrente
  const [slidesToShow, setSlidesToShow] = useState(4); // Numero di slide visibili contemporaneamente
  const [isTransitioning, setIsTransitioning] = useState(false); // Flag per prevenire click multipli durante la transizione
  const sliderRef = useRef(null); // Riferimento all'elemento slider

  // Array con i nomi delle tue immagini nella cartella public/img
  const originalImages = [
    "img-slider-1.jpg",
    "img-slider-3.jpg",
    "img-slider-2.jpg",
    "img-slider-4.jpg",
    "img-slider-5.jpg",
  ];

  // Crea un array con più copie delle immagini per l'effetto infinito
  const images = [
    ...originalImages,
    ...originalImages,
    ...originalImages,
    ...originalImages,
    ...originalImages,
  ];

  // Indice di partenza per iniziare dalla copia centrale (per l'effetto infinito)
  const startIndex = originalImages.length * 2;

  useEffect(() => {
    // Funzione per gestire il responsive design basato sulla larghezza della finestra
    const handleResize = () => {
      const width = window.innerWidth;
      // Imposta il numero di slide da mostrare in base alla larghezza dello schermo
      if (width < 576) setSlidesToShow(1.5); // Mobile piccolo
      else if (width < 768) setSlidesToShow(2.5); // Mobile
      else if (width < 992) setSlidesToShow(3); // Tablet
      else if (width < 1200) setSlidesToShow(4); // Desktop piccolo
      else setSlidesToShow(4.5); // Desktop grande
    };

    // Esegue il resize al mount del componente
    handleResize();
    // Aggiunge il listener per il resize della finestra
    window.addEventListener("resize", handleResize);

    // Imposta la slide iniziale al centro dell'array per l'effetto infinito
    setCurrentSlide(startIndex);

    // Cleanup: rimuove il listener quando il componente viene smontato
    return () => window.removeEventListener("resize", handleResize);
  }, [startIndex]);

  // Funzione per andare alla slide successiva
  const nextSlide = () => {
    // Previene click multipli durante la transizione
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      const newSlide = prev + 1;

      // Se abbiamo raggiunto la fine dell'array, torniamo all'inizio senza animazione
      if (newSlide >= images.length - Math.ceil(slidesToShow)) {
        setTimeout(() => {
          setCurrentSlide(startIndex); // Torna alla posizione iniziale
          setIsTransitioning(false);
        }, 300); // Aspetta che finisca l'animazione
        return newSlide;
      }

      // Fine transizione normale
      setTimeout(() => setIsTransitioning(false), 300);
      return newSlide;
    });
  };

  // Funzione per andare alla slide precedente
  const prevSlide = () => {
    // Previene click multipli durante la transizione
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      const newSlide = prev - 1;

      // Se siamo andati prima dell'inizio, saltiamo alla fine senza animazione
      if (newSlide < 0) {
        setTimeout(() => {
          setCurrentSlide(startIndex + originalImages.length - 1); // Va alla fine dell'array
          setIsTransitioning(false);
        }, 300); // Aspetta che finisca l'animazione
        return newSlide;
      }

      // Fine transizione normale
      setTimeout(() => setIsTransitioning(false), 300);
      return newSlide;
    });
  };

  // Calcola la larghezza di ogni slide in percentuale
  const slideWidth = 100 / slidesToShow;
  // Calcola quanto spostare il contenitore per mostrare la slide corrente
  const translateX = -(currentSlide * slideWidth);

  return (
    <div className="social-swiper-container my-5">
      <div className="social-swiper-wrapper">
        {/* Card informativa a sinistra */}
        <div className="social-card-container">
          <div className="social-card-base" />
          <div className="social-card-green">
            <div className="social-card-icon">
              <i className="bi bi-instagram fs-1"></i>
            </div>
            <h4 className="social-card-title">We are active on</h4>
            <h3 className="social-card-subtitle">
              <a href="https://www.instagram.com/secco.ai/?hl=it">Instagram</a>
            </h3>
          </div>
        </div>

        {/* Contenitore dello slider */}
        <div className="social-slider">
          <div className="social-slider-base-card" />

          <div className="social-slider-content">
            {/* Track principale che contiene tutte le slide */}
            <div
              ref={sliderRef}
              className="social-slider-track"
              style={{
                // Sposta il contenitore orizzontalmente per mostrare la slide corrente
                transform: `translateX(${translateX}%)`,
                // Gestisce l'animazione: nessuna transizione durante i reset infiniti
                transition:
                  isTransitioning &&
                  (currentSlide < 0 ||
                    currentSlide >= images.length - Math.ceil(slidesToShow))
                    ? "none" // Nessuna animazione per i salti infiniti
                    : "transform 0.3s ease-in-out", // Animazione normale
              }}
            >
              {/* Genera tutte le slide */}
              {images.map((id, index) => (
                <div
                  key={`${id}-${index}`}
                  className="social-slider-item"
                  style={{
                    // Calcola la larghezza di ogni slide considerando i gap
                    width: `calc(${slideWidth}% - ${
                      (20 * (slidesToShow - 1)) / slidesToShow
                    }px)`,
                  }}
                >
                  <div className="social-slider-card">
                    {/* Immagine della slide dalle tue immagini locali */}
                    <img
                      src={`/img/${id}`}
                      alt={`Social content ${
                        (index % originalImages.length) + 1
                      }`}
                      className="social-slider-image"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottone per andare alla slide precedente */}
            <button
              onClick={prevSlide}
              className="social-slider-btn social-slider-btn-prev"
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {/* Bottone per andare alla slide successiva */}
            <button
              onClick={nextSlide}
              className="social-slider-btn social-slider-btn-next"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSwiper;
