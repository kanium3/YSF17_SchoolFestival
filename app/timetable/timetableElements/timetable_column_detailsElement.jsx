export function Column_detailsElement({ programsDetail }){
    return(
        <div>
            <p>{programsDetail.explanation}</p>
            <p>{`@${programsDetail.place}`}</p>
        </div>
    )
}