import React from "react";
import "./carouselIndicator.scss";

const CarouselIndicator = ({
                               accountQuantity = 1,
                               currentIndex = 0,
                               setCurrentIndex
                           }) => {
    const dots = Array.from({length: accountQuantity});

    // 1. Увеличили расстояние между точками (было 20)
    const spacing = 28;
    const maxVisibleCount = 3;

    const visibleCount = Math.min(accountQuantity, maxVisibleCount);
    const visibleWidth = spacing * visibleCount;

    const centerX = (currentIndex + 1) * spacing;

    const minViewBoxX = spacing / 2; // 14

    const maxViewBoxX = Math.max(
        minViewBoxX,
        (accountQuantity * spacing) + (spacing / 2) - visibleWidth
    );

    let viewBoxX = centerX - visibleWidth / 2;
    viewBoxX = Math.max(minViewBoxX, Math.min(viewBoxX, maxViewBoxX));

    return (
        <svg
            width={visibleWidth}
            height="32"
            viewBox={`${viewBoxX} -16 ${visibleWidth} 32`}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
        >
            <defs>
                <filter id="gooey">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
                    <feColorMatrix in="blur" type="matrix"
                                   values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
                                   result="gooey"/>
                    <feBlend in="SourceGraphic" in2="gooey" mode="hue"/>
                </filter>
            </defs>

            <g id="carousel-indicator" filter="url(#gooey)">
                <g id="pages">
                    {dots.map((_, i) => (
                        <ellipse
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            style={{cursor: "pointer"}}
                            className={`dot dot-${i + 1}`}
                            cx={(i + 1) * spacing}
                            cy="0"
                            rx="6"
                            ry="6"
                            fill="#b9aaff"
                        />
                    ))}
                </g>

                <rect
                    className="active-indicator"
                    x="14"
                    y="-6"
                    width="28"
                    height="12"
                    rx="6"
                    transform={`translate(${currentIndex * spacing}, 0)`}
                />
            </g>
        </svg>
    );
};

export default CarouselIndicator;