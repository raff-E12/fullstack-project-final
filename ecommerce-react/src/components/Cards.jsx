import React from 'react'
import ProdList from "../context/jsons/ProdList.json"

export default function Cards() {
  return (<>
    {ProdList.map((element, index) => {
      return (

        <div className="card cards-prod" key={index}>
          <img src={element.image_url} className="card-img-top" alt="dress" />
          <div className="card-body">
            <p className="card-text">{element.description}</p>
          </div>
        </div>
      )
    })}
  </>
  )
}
