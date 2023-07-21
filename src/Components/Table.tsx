import React from 'react'
import { TableStyled } from './TableStyled'

function Table({ cols, data } : any) {

    const displayRow = (row : any) => (
        <tr key={row.id}>
            {cols.map((col: any, i: number) =>
                <td key={i}>
                    {col.display ? col.display(row) : row[col.property]}
                </td>
            )}
        </tr>
    )

  return (
    <TableStyled>
        <thead>
            <tr>
                {cols.map( (col: any, i: number) => 
                    <th key={i}>
                        {col.label}
                    </th>
                )}
            </tr>
        </thead>
        <tbody>
            {data.map(displayRow)}
        </tbody>
    </TableStyled>
  )
}

export default Table