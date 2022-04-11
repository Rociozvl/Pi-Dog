import React from "react";
import PaginatedCSS from "./Paginated.module.css"



export default function Paginated({DogsOnPage, allDogs ,paginated}){
    const pageNumbers=[]

    for(let i = 0 ; i<= Math.ceil(allDogs/DogsOnPage);i++){
        pageNumbers.push(i+1)
    }
    return(
        <div className={PaginatedCSS.container}>
            <ul>
                {pageNumbers?.map( p=>(
                    <li className={PaginatedCSS.li} onClick={()=> paginated(p)} key={p}>
                    <a className={PaginatedCSS.btn}></a>
                    </li>
                ))}
            </ul>
        </div>
    )
}