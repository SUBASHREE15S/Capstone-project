function ConflictTable({ conflicts=[] }) {

    return (

        <table className="table">

            <thead>

                <tr>

                    <th>Requirement</th>

                    <th>Probability</th>

                    <th>Impact</th>

                    <th>Priority</th>

                </tr>

            </thead>

            <tbody>

            {

                conflicts.map(

                    (row,index)=>(

                        <tr key={index}>

                            <td>{row.requirement}</td>

                            <td>{row.probability}</td>

                            <td>{row.impact}</td>

                            <td>{row.priority}</td>

                        </tr>

                    )

                )

            }

            </tbody>

        </table>

    );

}

export default ConflictTable;
