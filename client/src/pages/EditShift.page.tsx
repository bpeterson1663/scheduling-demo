import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { PageContainer, PageTitle } from './pages.styles'
import { getShiftById } from '../api'

interface ParamTypes {
  id: string
}

const EditShift = () => {
  const { id } = useParams<ParamTypes>()
  const history = useHistory()
  const getShift = async (id: string) => {
    try {
      const { data } = await getShiftById(id)
    } catch {
        history.push('/')
    }
  }

  useEffect(() => {
    getShift(id)
  }, [])

  return (
    <PageContainer>
      <PageTitle>Edit Shift</PageTitle>
    </PageContainer>
  )
}

export default EditShift
