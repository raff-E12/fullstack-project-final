import React, { useState } from 'react';

export default function Accordion({ material, sku }) {
    const [activeIndex, setActiveIndex] = useState(null);
    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="accordion">
            {/* Description Section */}
            <div className="accordion-item">
                <button
                    className={`accordion-title ${activeIndex === 0 ? 'active' : ''}`}
                    onClick={() => toggleAccordion(0)}
                >
                    {<p>Sku</p>}
                    <span className="accordion-icon">{activeIndex === 0 ? '−' : '+'}</span>
                </button>
                <div
                    className="accordion-content"
                    style={{
                        maxHeight: activeIndex === 0 ? '1000px' : '0',
                        opacity: activeIndex === 0 ? '1' : '0'
                    }}
                >
                    <p>{sku}</p>
                </div>
            </div>

            {/* Availability Section */}
            <div className="accordion-item">
                <button
                    className={`accordion-title ${activeIndex === 1 ? 'active' : ''}`}
                    onClick={() => toggleAccordion(1)}
                >
                    {<p> Material</p>}
                    <span className="accordion-icon">{activeIndex === 1 ? '−' : '+'}</span>
                </button>
                <div
                    className="accordion-content"
                    style={{
                        maxHeight: activeIndex === 1 ? '1000px' : '0',
                        opacity: activeIndex === 1 ? '1' : '0'
                    }}
                >
                    <p>{material}</p>
                </div>
            </div>
        </div>
    );
}