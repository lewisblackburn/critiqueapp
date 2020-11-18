import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"

type ActorSearchFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const ActorSearchForm = ({ initialValues, onSubmit }: ActorSearchFormProps) => {
  return (
    <div>
      <Form
        className="text-white"
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitText="Search"
      >
        <LabeledTextField name="search" placeholder="search actors" />
      </Form>
    </div>
  )
}

export default ActorSearchForm
