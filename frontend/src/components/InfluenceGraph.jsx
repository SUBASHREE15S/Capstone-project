import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";

function InfluenceGraph({ influence }) {

    if (!influence || influence.length === 0) {
        return (
            <div style={{ background: "white", padding: "20px", marginTop: "30px", borderRadius: "10px", boxShadow: "0px 2px 10px rgba(0,0,0,0.15)" }}>
                <h2>Requirement Influence Ranking</h2>
                <p>No Influence Data available.</p>
            </div>
        );
    }

    return (

        <div
            style={{
                background: "white",
                padding: "20px",
                marginTop: "30px",
                borderRadius: "10px",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.15)"
            }}
        >

            <h2>
                Requirement Influence Ranking
            </h2>

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart data={influence}>

                    <XAxis dataKey="requirement_id"/>

                    <YAxis/>

                    <Tooltip/>

                    <Bar
                        dataKey="influence_score"
                    >

                        {

                            influence.map((item,index)=>{

                                let color="#4CAF50";

                                if(item.influence_score>90)
                                    color="#D32F2F";

                                else if(item.influence_score>75)
                                    color="#FF9800";

                                else if(item.influence_score>50)
                                    color="#FFC107";

                                return(

                                    <Cell
                                        key={index}
                                        fill={color}
                                    />

                                );

                            })

                        }

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}

export default InfluenceGraph;
