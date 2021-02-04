import React from "react"

type TeamsetFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const TeamsetForm = ({ initialValues, onSubmit }: TeamsetFormProps) => {
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <button type="submit">Generate</button>
    </form>
  )
}

export default TeamsetForm
