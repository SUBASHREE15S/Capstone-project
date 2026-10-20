import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

function EvolutionChart({ data = [] }) {

    return (

        <LineChart
            width={700}
            height={300}
            data={data}
        >

            <Line
                type="monotone"
                dataKey="probability"
            />

            <CartesianGrid stroke="#ccc"/>

            <XAxis dataKey="version"/>

            <YAxis/>

            <Tooltip/>

        </LineChart>

    );

}

export default EvolutionChart;
