import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"

type ActorFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const ActorForm = ({ initialValues, onSubmit }: ActorFormProps) => {
  return (
    <div>
      <Form
        className="text-white"
        initialValues={initialValues}
        onSubmit={onSubmit}
        submitText="add"
      >
        <LabeledTextField name="image" placeholder="image" />
        <LabeledTextField name="name" placeholder="name" />
        <LabeledTextField name="age" placeholder="age" />
      </Form>
    </div>
  )
}

export default ActorForm
