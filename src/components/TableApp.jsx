import React from 'react'

const TableApp = ({rows,index,handleTableApp,tablesApp}) => {

    const handleRemovefila = (nroPallet) => {
        const newRows = rows.filter((item) => item.nroPallet != nroPallet)
        tablesApp[index] = newRows
        handleTableApp(tablesApp)
    }

    return (
        rows.length != 0 && (
            <div className="todo-list">
                <table className="table table-dark table-bordered">
                    <thead>
                        <tr>
                            <th colSpan={7} className='text-center'>
                                {
                                    rows[0].descripcion
                                }
                            </th>
                        </tr>
                        <tr>
                            <th scope="col">#</th>
                            <th className='text-center' scope="col">Calibre</th>
                            <th className='text-center' scope="col">Saldo</th>
                            <th className='text-center' scope="col">Remonte (cajas)</th>
                            <th className='text-center' scope="col">Altura + Cajas</th>
                            <th className='text-center' scope="col">Nro Pallet</th>
                            <th className='text-center' scope="col">FN</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows.map( (item,index) => {

                                const remonte = item.numCajasPallet - item.saldo
                                const alto = Math.trunc(remonte / item.cama)
                                const cajas = remonte - (alto * item.cama)


                                return(
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td className='text-center'>{item.calibre}</td>
                                        <td className='text-center'>{item.saldo}</td>
                                        <td className='text-center'>{ remonte }</td>
                                        <td className='text-center'>{ `${alto} + ${cajas}`  }</td>
                                        <td className='text-center'>{item.nroPallet}</td>
                                        <td className="d-flex justify-content-center">
                                            <button
                                                value={item.nroPallet}
                                                className="btn btn-danger btn-sm"
                                                style={{height:"24px",width:"26px",padding:"0"}}
                                                onClick={ (e) => handleRemovefila(e.currentTarget.value)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#fff" className="bi bi-trash3-fill margen-svg" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    )
}

export default TableApp