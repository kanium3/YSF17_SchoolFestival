export function Column_heading({programsInfo}){
    return(
        <div>
            <p>{programsInfo.name}</p>
            <p>{programsInfo.summary}</p>
            <ul>
                {programsInfo.tags.map((x,i)=><li key={i}>{`#${x}`}</li>)}
            </ul>
            <button>詳細</button>
        </div>
    )
}