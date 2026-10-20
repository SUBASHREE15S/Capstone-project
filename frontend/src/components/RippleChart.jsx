import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function RippleChart({ summary }){

    if(!summary)
        return null;

    const data = Object.keys(summary).map(level=>({
        level:"Level "+level,
        affected:summary[level]
    }));

    return(

        <div

        style={{

        marginTop:"30px",

        background:"white",

        padding:"20px",

        borderRadius:"10px",

        boxShadow:"0 2px 10px rgba(0,0,0,0.15)"

        }}

        >

        <h2>

            Ripple Levels

        </h2>

        <ResponsiveContainer

        width="100%"

        height={320}

        >

        <BarChart

        data={data}

        >

        <XAxis

        dataKey="level"

        />

        <YAxis/>

        <Tooltip/>

        <Bar

        dataKey="affected"

        fill="#2196F3"

        />

        </BarChart>

        </ResponsiveContainer>

        </div>

    );

}

export default RippleChart;
