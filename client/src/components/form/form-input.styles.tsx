import styled, { css } from 'styled-components'

const subColor = 'grey'
const mainColor = 'black'

export const GroupContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: left;
  align-items: center;
`

export const FormInputContainer = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 5px;
  display: block;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 8px;
  &:focus {
    outline: none;
  }
`

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
`
