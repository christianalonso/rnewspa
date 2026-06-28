import React, { useRef } from 'react'

const InputsApp = (
    {
        handleTableApp,
        tablesApp,
        index,
        handleTipoCaja,
        refTipoCaja,
        refradioButtons
    }
) => {

        const refCalibre = useRef(null)
        const refDescripcion = useRef(null)
        const refSaldo = useRef(null)
        const refnroPallet = useRef(null)

        const isOk = () => {

            const flag = false
            const esUnNumero = (value) => /^\d+$/.test(value)

            if(refTipoCaja.current.value === "Tipo"){
                return flag
            }

            if(refCalibre.current.value === ""){
                return flag
            }

            if(!esUnNumero(refCalibre.current.value)){
                return flag
            }

            if(refSaldo.current.value === ""){
                return flag
            }

            if(!esUnNumero(refSaldo.current.value)){
                return flag
            }

            if(refnroPallet.current.value === ""){
                return flag
            }

            return !flag

        }

        const addRemontes = () => {

            if(!isOk()){
                alert("campos vacio o entrada de datos incorrecta")
                return
            }
            const radio = [...refradioButtons.current].filter((item) => item[1].checked)[0]
            
            const row = {
                        calibre: refCalibre.current.value,
                        descripcion: refDescripcion.current.value.toUpperCase(),
                        tipoCaja: getTextSelect(refTipoCaja.current),
                        cama: parseInt(refTipoCaja.current.value),
                        numCajasPallet: parseInt(radio[1].value),
                        saldo: parseInt(refSaldo.current.value),
                        nroPallet: refnroPallet.current.value,
                    }
            
            tablesApp[index].push(
                row
            )
            handleTableApp(tablesApp)
            refCalibre.current.focus()
        }

        const getTextSelect = (select) => {
            return select.options[select.selectedIndex].text
        }

        const handleChange = (select) => {
            const options = select.target.options
            const _tipocaja = options[options.selectedIndex].text
            handleTipoCaja(_tipocaja)
        }

        return (
            
                <div className="todo-input">
                    <div className="todo-input-item">
                        <label>Tipo Caja</label>
                        <select 
                            ref={refTipoCaja} 
                            style={{width:"110px"}} 
                            className="form-select" 
                            aria-label="Default select example"
                            onChange={ (e) => handleChange(e) }
                        >
                            <option>Tipo</option>
                            <option value="12">4 kg</option>
                            <option value="8">5.6 kg</option>
                            <option value="8">10 kg</option>
                            <option value="8">11.34 kg</option>
                        </select>
                    </div>
                    
                    <div className="todo-input-item">
                        <label>Descripcion</label>
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Describe los remontes"
                            ref={refDescripcion}
                        />
                    </div>

                    <div className="todo-input-item">
                        <label>Calibre</label>
                        <input
                            style={{width:"75px"}}
                            className="form-control"
                            type="text"
                            placeholder="Nro."
                            ref={refCalibre}
                        />
                    </div>
                    
                    <div className="todo-input-item">
                        <label>Saldo</label>
                        <input
                            className="form-control"
                            style={{width:"75px"}}
                            type="text"
                            placeholder="Nro."
                            ref={refSaldo}
                        />
                    </div>
                    <div className="todo-input-item">
                        <label>Nro Pallet</label>
                        <input
                            className="form-control"
                            style={{width:"75px"}}
                            type="text"
                            placeholder="Nro."
                            ref={refnroPallet}
                        />
                    </div>
                    <div className="todo-input-item">
                        <button style={{marginTop:"35px"}}
                            type="button"
                            className="btn btn-success text-white"
                            onClick={ () => addRemontes() }
                        >
                            Add
                        </button>
                    </div>
                </div>
        )
}
export default InputsApp