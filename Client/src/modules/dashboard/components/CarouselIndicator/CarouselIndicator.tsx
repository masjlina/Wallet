// Styles
import "./carouselIndicator.scss";

interface IProps {
    accountQuantity: number;
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
}

const CarouselIndicator = ({
                               accountQuantity = 1,
                               currentIndex = 0,
                               setCurrentIndex
                           }: IProps) => {
    const safeCurrentIndex = Math.min(
        Math.max(currentIndex, 0),
        Math.max(accountQuantity - 1, 0)
    );

    const spacing = 28;
    const maxVisibleCount = 3;

    const visibleCount = Math.min(accountQuantity, maxVisibleCount);
    const visibleWidth = spacing * visibleCount;
    const visibleStartIndex = Math.min(
        Math.max(safeCurrentIndex - 1, 0),
        Math.max(accountQuantity - visibleCount, 0)
    );
    const dots = Array.from({length: visibleCount}, (_, offset) => visibleStartIndex + offset);

    const activeIndicatorOffset = safeCurrentIndex - visibleStartIndex;

    return (
        <svg
            width={visibleWidth}
            height="32"
            viewBox={`14 -16 ${visibleWidth} 32`}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
        >
            <defs>
                <filter
                    id="gooey"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"/>
                    <feColorMatrix in="blur" type="matrix"
                                   values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
                                   result="gooey"/>
                    <feBlend in="SourceGraphic" in2="gooey" mode="hue"/>
                </filter>
                <clipPath id="clip0">
                    <rect
                        x="14"
                        y="-16"
                        width={visibleWidth}
                        height="32"
                    />
                </clipPath>
            </defs>

            <g id="carousel-indicator" filter="url(#gooey)" clipPath="url(#clip0)">
                <g id="pages">
                    {dots.map((dotIndex, i) => (
                        <ellipse
                            key={dotIndex}
                            onClick={() => setCurrentIndex(dotIndex)}
                            style={{cursor: "pointer"}}
                            className={`dot dot-${dotIndex + 1}`}
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
                    transform={`translate(${activeIndicatorOffset * spacing}, 0)`}
                />
            </g>
        </svg>
    );
};

export default CarouselIndicator;
