import * as yup from "yup";

export const loginValSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const instructionsSchema = yup.object({
  notes: yup.string().required("Please enter some notes"),
  randomizeCases: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions") // Ensures the checkbox is checked
    .required("You must accept the terms and conditions"), // Ensures the checkbox is checked
  randomizeCat: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions") // Ensures the checkbox is checked
    .required("You must accept the terms and conditions"), // Ensures the checkbox is checked
});

export const taxonomySchema = yup.object({
  projectName: yup.string().required("Please enter some notes"),
  options: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required("Please select at least one option"),
      })
    )
    .required("Please select at least one option"),
  question: yup.string().required("Please select atlease one option"),
  referenceClass: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required("Please select at least one option"),
      })
    )
    .required("Please select at least one option"),
  label: yup.string().required("Please enter a label"),
  evaluationPageLayout: yup.string().required("Please enter some notes"),
  labels: yup.number().required("Please enter some labels"),
  selectOptions: yup
    .array()
    .of(
      yup.object({
        value: yup.string().required("Please select at least one option"),
      })
    )
    .required("Please select at least one option"),
});
