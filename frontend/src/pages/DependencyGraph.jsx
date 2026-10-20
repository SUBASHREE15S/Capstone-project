// Placeholder for React component/service
import React, { useEffect, useState } from "react";
import GraphView from "../components/GraphView";

function DependencyGraph() {

    const [requirements, setRequirements] = useState([]);

    useEffect(() => {

        const storedRequirements = localStorage.getItem("requirements");

        if (storedRequirements) {
            setRequirements(JSON.parse(storedRequirements));
        }

    }, []);

    return (

        <div style={{ padding: "20px" }}>

            <h1>Requirement Dependency Graph</h1>

            <p>
                This graph shows the relationships between
                extracted software requirements.
            </p>

            <hr />

            {
                requirements.length > 0 ? (

                    <GraphView
                        requirements={requirements}
                    />

                ) : (

                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "50px"
                        }}
                    >

                        <h3>No Requirement Data Available</h3>

                        <p>
                            Please upload and analyze an SRS
                            document first.
                        </p>

                    </div>

                )
            }

        </div>

    );

}

export default DependencyGraph;