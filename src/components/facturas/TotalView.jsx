export const TotalView = ( { total }) => {

    return (
        <>
            <div className="text-end">
            <span className="badge bg-secondary fs-6 m-1"> SUB TOTAL: { total.toFixed(2) }</span>
            </div>
            <div className="text-end">
                <span className="badge bg-danger fs-6 m-1"> IGV: 18%</span>
            </div>
            <div className="text-end">
                <span className="badge bg-success fs-6 m-1"> TOTAL: { (total + total * 0.18).toFixed(2) }</span>
            </div>
        </>
    )
}