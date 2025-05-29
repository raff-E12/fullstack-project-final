import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // Rimuovi A11y per ora
import { useState, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';

import '../index.css'

export default function Social() {

    // Stato per indicare se le immagini o il contenuto sono stati "caricati"
    // Puoi immaginare che questo diventi 'true' dopo un fetch API reale
    const [contentLoaded, setContentLoaded] = useState(false);

    useEffect(() => {

        const timer = setTimeout(() => {
            setContentLoaded(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (!contentLoaded) {
        return <div>Caricamento del carosello...</div>; // O un loader
    }


    return (
        <Swiper
            modules={[Navigation]}
            spaceBetween={10} // Meno spazio per debugging
            slidesPerView={4} // Prova con 3 per vedere se cambia qualcosa
            navigation
            loop={true}
            className="test-swiper" // Classe specifica per il test
        >
            <SwiperSlide>

                <img src="https://picsum.photos/id/100/200/300" alt="Immagine 1" className="slide-image" /> {/* Usiamo un nome di classe standard */}

            </SwiperSlide>

            <SwiperSlide>

                <img src="https://picsum.photos/id/101/200/300" alt="Immagine 2" className="slide-image" />

            </SwiperSlide>

            <SwiperSlide>

                <img src="https://picsum.photos/id/102/200/300" alt="Immagine 3" className="slide-image" />

            </SwiperSlide>

            <SwiperSlide>

                <img src="https://picsum.photos/id/103/200/300" alt="Immagine 4" className="slide-image" />

            </SwiperSlide>

            <SwiperSlide>

                <img src="https://picsum.photos/id/104/200/300" alt="Immagine 5" className="slide-image" />

            </SwiperSlide>

            <SwiperSlide>

                <img src="https://picsum.photos/id/105/200/300" alt="Immagine 6" className="slide-image" />

            </SwiperSlide>

            <SwiperSlide>

                <img src="https://picsum.photos/id/106/200/300" alt="Immagine 7" className="slide-image" />

            </SwiperSlide>

            <SwiperSlide>

                <img src="https://picsum.photos/id/107/200/300" alt="Immagine 8" className="slide-image" />

            </SwiperSlide>

            <SwiperSlide>

                <img src="https://picsum.photos/id/108/200/300" alt="Immagine 9" className="slide-image" />

            </SwiperSlide>

            <SwiperSlide>

                <img src="https://picsum.photos/id/109/200/300" alt="Immagine 10" className="slide-image" />

            </SwiperSlide>
        </Swiper>
    );
}