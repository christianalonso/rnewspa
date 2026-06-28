import React, { useRef } from 'react'

const Switch = ({index, tipoCaja,refradioButtons}) => {
 
  const switchComponent = [
      {
        tipocaja : "10 kg",
        label : "standar (120 cajas)",
        value : 120,
        checked: true
      },
      {
        tipocaja : "4 kg",
        label : "standar (264 cajas)",
        value : 264,
        checked: true
      },
      {
        tipocaja : "5.6 kg",
        label : "standar (160 cajas)",
        value : 160,
        checked: true
      },
      {
        tipocaja : "11.34 kg",
        label : "standar (96 cajas)",
        value : 96,
        checked: true
      },
      {
        tipocaja : "10 kg",
        label : "Chile (104 cajas, 13 de alto)",
        value : 104
      },
      {
        tipocaja : "4 kg",
        label : "216 cajas, 18 de alto",
        value : 216
      },
      {
        tipocaja : "4 kg",
        label : "240 cajas, 20 de alto",
        value : 240
      },
      
   ]

  return (
    <div className="d-flex mb-4">
      {
        switchComponent.filter(({tipocaja}) => tipocaja == tipoCaja)
                    .map((item,indice) => {
                      return(
                          <div key={indice} className="form-check form-switch me-5">
                            <input
                              ref={ 
                                (nodo) => {
                                  nodo ? refradioButtons.current.set(indice,nodo)
                                  : refradioButtons.current.delete(indice)
                                }
                               } 
                              className="form-check-input pointer-cursor"
                              type="radio"
                              value={item.value}
                              name={"switch-button-"+index}
                              { ...(indice === 0 && {defaultChecked:true}) }
                              id={`switch${index}_${indice}`}
                            />
                            <label 
                              className="form-check-label pointer-cursor fw-bolder"
                              htmlFor={`switch${index}_${indice}`}
                            >
                                {item.label}
                            </label>
                        </div>
                      )
                    })
      }
    </div>
  )
}

export default Switch