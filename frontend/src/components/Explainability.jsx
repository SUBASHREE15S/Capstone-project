function Explainability({ explanation=[] }) {
    const safeExplanation = explanation || [];

    return (

        <div className="panel">

            <h2>

                Explainable AI

            </h2>

            <ul>

            {

                safeExplanation.map(

                    (item,index)=>

                    <li key={index}>

                        {item}

                    </li>

                )

            }

            </ul>

        </div>

    );

}

export default Explainability;
