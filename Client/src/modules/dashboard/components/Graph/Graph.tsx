// Styles
import "./graph.scss";
import {sortedDaysOfWeek} from "@/shared/consts/date";

interface IProps {
    data: number[]
}

const Graph = ({
                   data = [1000, 3000, 2200, 2350, 1200, 900, 5000]
               }: IProps
) => {
    const maxItem = Math.max(...data, 1);

    const graphTopPadding = 30;
    const graphBottomPadding = 50;
    const graphLeftPadding = 50;
    const graphRightPadding = 30;

    const width = 710;
    const height = 332;

    const innerWidth = width - graphLeftPadding - graphRightPadding;
    const innerHeight = height - graphTopPadding - graphBottomPadding;

    const week = sortedDaysOfWeek() ? sortedDaysOfWeek().slice().reverse() : [];

    // helpers
    const formatY = (v: number) => {
        if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`;
        return `$${v}`;
    };

    const getX = (i: number) => graphLeftPadding + i * (innerWidth / (data.length - 1));
    const getY = (value: number) => {
        const normalized = (value / maxItem) * innerHeight;
        return graphTopPadding + (innerHeight - normalized);
    };

    // generate line path (M/L)
    const generateLinePath = (arr: number[]) =>
        arr
            .map((v, i) => `${i === 0 ? "M" : "L"} ${getX(i)} ${getY(v)}`)
            .join(" ");

    // generate closed area path (baseline -> points -> baseline -> Z)
    const generateAreaPath = (arr: number[]) => {
        const baselineY = height - graphBottomPadding;
        const firstX = getX(0);
        const lastX = getX(arr.length - 1);

        // start at baseline under first point
        let path = `M ${firstX} ${baselineY} `;
        // line up to first graph point
        path += `L ${getX(0)} ${getY(arr[0])} `;
        // through all points
        for (let i = 1; i < arr.length; i++) {
            path += `L ${getX(i)} ${getY(arr[i])} `;
        }
        // down to baseline under last point and back to start
        path += `L ${lastX} ${baselineY} Z`;
        return path;
    };

    const linePath = generateLinePath(data);
    const areaPath = generateAreaPath(data);

    // grid ticks (horizontal) and labels
    const yGridCount = 4; // number of horizontal segments (not counting baseline) => will produce yGridCount+1 lines
    const yLines = Array.from({length: yGridCount + 1}, (_, i) => {
        const y = graphTopPadding + (innerHeight * i) / yGridCount;
        // label value: from top (max) to bottom (0)
        const value = Math.round(maxItem * (1 - i / yGridCount));
        return {y, value};
    });

    // x labels: show every Nth label if too crowded (here show all, you can change)
    const xLabels = data.map((_, i) => ({x: getX(i), label: week[i] ?? `#${i + 1}`}));

    return (
        <div className="graph-wrap">
            <svg
                width="100%"
                height="100%"
                className="graph"
                preserveAspectRatio="none"
                viewBox={`0 0 ${width} ${height}`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{fontFamily: "Inter, Arial, sans-serif"}}
            >
                <defs>
                    <linearGradient id="areaGradient" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#7763EA" stopOpacity={0.05}/>
                        <stop offset="60%" stopColor="#EA6363" stopOpacity={0.12}/>
                        <stop offset="100%" stopColor="#EA6363" stopOpacity={0.25}/>
                    </linearGradient>

                    <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#4CDFE8"/>
                        <stop offset="100%" stopColor="#7947F7"/>
                    </linearGradient>
                </defs>

                {/* Grid lines */}
                <g stroke="#DCE3EB" strokeDasharray="3 4" strokeLinecap="round" strokeWidth={1}>
                    {yLines.map((ln, idx) => (
                        <line
                            key={idx}
                            x1={graphLeftPadding}
                            x2={width - graphRightPadding}
                            y1={ln.y}
                            y2={ln.y}
                        />
                    ))}
                </g>

                {/* Area (filled polygon) */}
                <path d={areaPath} fill="url(#areaGradient)" stroke="none"/>

                {/* Line on top */}
                <path
                    key={linePath}
                    className="graph__line-animated"
                    d={linePath}
                    pathLength={1}
                    stroke="url(#lineGradient)"
                    strokeWidth={2}
                    fill="none"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                />

                {/* Axes */}
                <g stroke="#DCE3EB" strokeWidth={1.5}>
                    {/* Y axis */}
                    <line
                        x1={graphLeftPadding}
                        x2={graphLeftPadding}
                        y1={graphTopPadding}
                        y2={height - graphBottomPadding}
                    />
                    {/* X axis */}
                    <line
                        x1={graphLeftPadding}
                        x2={width - graphRightPadding}
                        y1={height - graphBottomPadding}
                        y2={height - graphBottomPadding}
                    />
                </g>

                {/* Y labels (aligned to axis) */}
                <g fill="#707D8A" fontSize={12}>
                    {yLines.map((ln, idx) => (
                        <text
                            key={idx}
                            x={graphLeftPadding - 10}
                            y={ln.y + 4} // small vertical offset to vertically center with line
                            textAnchor="end"
                        >
                            {formatY(ln.value)}
                        </text>
                    ))}
                </g>

                {/* X labels (centered under points) */}
                <g fill="#8b95a3" fontSize={11}>
                    {xLabels.map((t, i) => (
                        <text key={i} x={t.x} y={height - graphBottomPadding + 20} textAnchor="middle">
                            {t.label}
                        </text>
                    ))}
                </g>

                {/* Axis titles */}
                <text
                    x={graphLeftPadding - 35}
                    y={graphTopPadding + innerHeight / 2}
                    textAnchor="middle"
                    transform={`rotate(-90 ${graphLeftPadding - 41} ${graphTopPadding + innerHeight / 2})`}
                    fill="#707D8A"
                    fontSize={12}
                >
                    Amount ($)
                </text>

                <text x={graphLeftPadding + innerWidth / 2}
                      y={height - 8}
                      textAnchor="middle"
                      fill="#707D8A"
                      fontSize={12}>
                    Week
                </text>
            </svg>
        </div>
    );
};

export default Graph;
