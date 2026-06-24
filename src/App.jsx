import React, { useState } from 'react'
import '@coreui/coreui/dist/css/coreui.min.css'
import './css/App.css'
import Wrapper from "./components/Wrapper"

const App = () => {

  const [tablesApp, setTablesApp] = useState([[]])

  const handleCount = () => {
    setTablesApp([...tablesApp,[]])
  }

  const handleTableApp = (tables) => {
    setTablesApp([...tables])
  }

  const handlePrint = async (data) => {
  
      try {
        
        const template = `${window.location.origin}/template.html`
        const response = await fetch(template)

        if(!response.ok){
          throw new Error(`No se pudo cargar el archivo ${response.statusText}`);
        }

        const pageContent = await response.text()

        const domParser = new DOMParser()
        const doc = domParser.parseFromString(pageContent,"text/html")
        const node = doc.querySelector(".print")
        node.append(createTableRemonte(data))

        const newPage = window.open("","_blank")
        newPage.document.write(doc.documentElement.innerHTML)
        newPage.document.close()

        newPage.onload = () => {
          newPage.focus()
          newPage.print()
          newPage.close()
        }

      } catch (error) {
        console.error("Error al intentar imprimir:", error)
        alert("Ocurrió un error al cargar el documento para imprimir.")
      }

  }

  const createTableRemonte = (data) => {

    const containerTable = document.createElement("div")
    containerTable.classList.add("content-tables")

    const tables = data.map((item,index) => {

        if(item.length == 0){
          return ""
        }
        
        const table = document.createElement("table")
        table.classList.add("my-table")
        const tbody = document.createElement("tbody")
        
        
        table.innerHTML = `<thead>
                                <tr class="title">
                                    <th colspan="5" class="text-center">
                                        ${item[0].descripcion}
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="col">#</th>
                                    <th>Calibre</th>
                                    <th>Remonte (cajas)</th>
                                    <th>Altura + Cajas</th>
                                    <th>Nro Pallet</th>
                                </tr>
                            </thead>`
    
        
        const rows = item.map((row,linea) => {

          const remonte = row.numCajasPallet - row.saldo
          const alto = Math.trunc(remonte / row.cama)
          const cajas = remonte - (alto * row.cama)
            
            const tr = document.createElement("tr")
            tr.innerHTML = `
                              <th scope="row">${linea + 1}</th>
                              <td class='text-center'>${row.calibre}</td>
                              <td class='text-center'>${ remonte }</td>
                              <td class='text-center'>${ `${alto} + ${cajas}`  }</td>
                              <td class='text-center'>${row.nroPallet}</td>
                            `
            return tr
        })

        tbody.append(...rows)
        table.append(tbody)

        return table
        
    })
    containerTable.append(...tables)
    return containerTable
  } 

  return (
    <div className='App'>
      <div className="d-flex justify-content-center align py-2">
        <h1 className="mb-0 me-3">Remontes</h1>
        <div>
          <button 
            className="btn btn-success text-white mt-2"
            onClick={ () => handleCount() }
          >
            Nuevo +
          </button>
        </div>
        <div className="ms-2">
          <button 
            className="btn btn-primary text-white mt-2"
            onClick={ () => handlePrint(tablesApp) }
          >
            Imprimir
          </button>
        </div>
      </div>
      
      {
        tablesApp.map( (row,index) => {
          return (
            <Wrapper
              key={index} 
              index={index}
              handleTableApp={handleTableApp}
              tablesApp={tablesApp}
              rows={row}
            />
          )
        })
      }

    </div>
  )
}

export default App
