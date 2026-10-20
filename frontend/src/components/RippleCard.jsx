import React from "react";

function RippleCard({ rippleScore }) {

    const score = rippleScore * 100;

    let color = "#4CAF50";

    let status = "Low";

    if(score > 80){

        color = "#E53935";

        status = "Critical";

    }

    else if(score > 60){

        color = "#FB8C00";

        status = "High";

    }

    else if(score > 40){

        color = "#FDD835";

        status = "Medium";

    }

    return(

        <div

        style={{

        background:"white",

        padding:"20px",

        borderRadius:"12px",

        boxShadow:"0 2px 10px rgba(0,0,0,0.15)"

        }}

        >

        <h2>

        🌊 Ripple Score

        </h2>

        <h1

        style={{color, fontSize: "2.5rem", fontWeight: "800", margin: "10px 0"}}

        >

        {score.toFixed(0)}%

        </h1>

        <h3 style={{ fontSize: "1.2rem", color: "var(--text-muted)" }}>

            {status} Impact

        </h3>

        </div>

    );

}

export default RippleCard;
