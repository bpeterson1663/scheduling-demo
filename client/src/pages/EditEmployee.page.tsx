import React from 'react'
import { useHistory } from 'react-router-dom'
import { PageContainer, PageTitle, ContentContainer, BackButton } from './pages.styles'
export const EditEmployee = () => {
  const history = useHistory()
  return (
    <PageContainer>
      <BackButton onClick={() => history.goBack()}>Back</BackButton>
      <PageTitle>Edit Employee</PageTitle>

      <ContentContainer></ContentContainer>
    </PageContainer>
  )
}

export default EditEmployee
