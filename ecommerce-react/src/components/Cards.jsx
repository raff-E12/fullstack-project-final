import React from 'react'
import ProdList from "../context/jsons/ProdList.json"

export default function Cards() {
  return (<>
    {ProdList.map((element, index) => {
       return(
         <>
         <div key={index}>
            <div>
              <img src={element.image_url} alt="dress"/>
            </div>
         </div>
         </>
       )    
    })}
  </>
  )
}
