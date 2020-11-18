import Form from "app/components/Form"
import LabeledTextField from "app/components/LabeledTextField"
import React from "react"

type MovieFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const MovieForm = ({ initialValues, onSubmit }: MovieFormProps) => {
  return (
    <div>
      <Form
        className="text-white"
        submitText="Submit"
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        <LabeledTextField name="banner" placeholder="Banner" />
        <LabeledTextField name="art" placeholder="Art" />
        <LabeledTextField name="title" placeholder="Title" />
        <LabeledTextField name="age" placeholder="Age" />
        <LabeledTextField name="release" placeholder="DD/MM/YY" />
        <LabeledTextField name="trailer" placeholder="Trailer" />
        <LabeledTextField name="tagline" placeholder="Tagline" />
        <LabeledTextField name="overview" placeholder="Overview" />
        <LabeledTextField name="runtime" placeholder="runtime" />
        <LabeledTextField name="status" placeholder="status" />
        <LabeledTextField name="language" placeholder="language" />
        <LabeledTextField name="budget" placeholder="budget" />
        <LabeledTextField name="revenue" placeholder="revenue" />
      </Form>
    </div>
  )
}

export default MovieForm
