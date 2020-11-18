import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"

type ReviewFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const ReviewForm = ({ initialValues, onSubmit }: ReviewFormProps) => {
  return (
    <div>
      <Form
        className="text-white"
        submitText="Submit"
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <LabeledTextField name="title" placeholder="title" />
        <LabeledTextField name="content" placeholder="content" />
      </Form>
    </div>
  )
}

export default ReviewForm
