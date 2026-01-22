import "./carouselIndicator.scss";

const CarouselIndicator = () => {
    return (
        <svg width="100%" height="100%" viewBox="0 -10 100 20"
             xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="gooey">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
                    <feColorMatrix in="blur" type="matrix"
                                   values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -6"
                                   result="gooey"/>
                    <feBlend in="SourceGraphic" in2="gooey" mode="hue"/>
                </filter>
            </defs>

            <g id="carousel-indicator" filter="url(#gooey)">
                <g id="pages">
                    <ellipse className="dot dot-1" cx="15" cy="0" rx="4" ry="4" fill="#b9aaff"/>
                    <ellipse className="dot dot-2" cx="45" cy="0" rx="4" ry="4" fill="#b9aaff"/>
                    <ellipse className="dot dot-3" cx="75" cy="0" rx="4" ry="4" fill="#b9aaff"/>
                </g>

                <rect id="active-indicator" x="5" y="-4" width="20" height="8" rx="3"
                      fill="#7763EA"/>
            </g>
        </svg>
    )
}

export default CarouselIndicator;