function NumberList ({numbers, onRemove}){
    return(
        <ul>
            {numbers.map((number, index) =>
             <li key={index}> {number}
             <button onClick={()=>onRemove(index)}>x</button>
             </li>
            )}
        </ul>
    )
}
export default NumberList;