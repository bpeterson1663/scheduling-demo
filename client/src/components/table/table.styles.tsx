import styled from 'styled-components'

export const StyledTable = styled.table`
  border: none;
  border-collapse: collapse;
  width: 100%;
  td,
  th {
    border: none;
  }
  td {
    padding: 5px 10px;
    text-align: center;
  }
  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: #c2c2c2;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
`

export const TableContainer = styled.div`
  width: 100%;
`
