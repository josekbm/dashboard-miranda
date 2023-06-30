import React from 'react'
import { TableStyled } from './TableStyled'

function Table({ cols, data }) {

    const displayRow = (row) => (
        <tr key={row.id}>
            {cols.map((col, i) =>
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
                {cols.map( (col, i) => 
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