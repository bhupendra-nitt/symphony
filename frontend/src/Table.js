import React from 'react';
import './_table.scss';

class Table extends React.Component {
  render () {
    const { data } = this.props; 
    return (
      <table className="table">
        {
          data.map((ele, index) => {
            return <TableRow data={ele} key={index}/>
          })
        }
      </table>
    )
  }
}

const TableRow = ({data}) => {
  return (
    <tr className="table__row">
      <td className="table__row__name">{data.name}</td>
      <td className="table__row__state">{data.state}</td>
      <td className="table__row__address">{data.address}</td>
      <td className="table__row__zipcode">{data.zipcode}</td>
    </tr>
  )
}

export default Table;
