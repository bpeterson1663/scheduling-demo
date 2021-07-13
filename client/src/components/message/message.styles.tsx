import styled, { css } from 'styled-components'

const messageStyle = css`
  padding: 4px;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
  text-align: center;
`
export const ErrorMessage = styled.span`
  color: #d8000c;
  background-color: #ffd2d2;
  ${messageStyle}
`

export const SuccessMessage = styled.span`
  color: #4f8a10;
  background-color: #dff2bf;
  ${messageStyle}
`
