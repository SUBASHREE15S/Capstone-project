function Recommendation({ recommendations=[] }) {
    const safeRecommendations = recommendations || [];

    return (

        <div className="panel">

            <h2>

                AI Recommendation

            </h2>

            <ul>

            {

                safeRecommendations.map(

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

export default Recommendation;
