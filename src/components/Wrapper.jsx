import React, { useRef, useState } from 'react'
import InputsApp from './InputsApp'
import TableApp from './TableApp'
import Switch from './Switch'

const Wrapper = ({index,handleTableApp,tablesApp,rows}) => {

    const [tipoCaja, setTipoCaja] = useState(null)
    const refTipoCaja = useRef(null)
    const refradioButtons = useRef(new Map())
    
    const handleTipoCaja = (tipoCaja) => {
        setTipoCaja(tipoCaja)
    }

    return (
        <div key={index} className="todo-wrapper">
            <Switch 
                index={index}
                tipoCaja={tipoCaja}
                refradioButtons={refradioButtons}
            />
            <InputsApp 
                handleTableApp={ handleTableApp } 
                tablesApp={tablesApp}
                index={index}
                handleTipoCaja={handleTipoCaja}
                refTipoCaja={refTipoCaja}
                refradioButtons={refradioButtons}
            />
            <TableApp 
                rows={rows}
                handleTableApp = {handleTableApp}
                tablesApp = {tablesApp}
                index={index}
            />
        </div>
    )
}

export default Wrapper