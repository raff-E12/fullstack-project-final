import React from 'react'
import ProdList from "../context/jsons/ProdList.json"

export default function Cards() {
  return (<>
    {ProdList.map((element, index) => {
       return(
         <>
        <div class="card cards-prod">
          <img src={element.image_url} class="card-img-top" alt="dress" />
          <div class="card-body">
            <p class="card-text">{element.description}</p>
          </div>
        </div>
        </>
       )    
    })}
  </>
  )
}
