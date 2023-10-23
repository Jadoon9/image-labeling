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
  projectName: yup.string().required("Please enter Project Name"),
  options: yup.string().required("Please select an option"),
  question: yup.string().required("Please select a Question"),
  referenceClass: yup.string().required("Please select a reference class"),

  label: yup.string().required("Please enter a label"),
  evaluationPageLayout1: yup.string().required("Please layout"),
  evaluationPageLayout2: yup.string().required("Please layout"),
  labels: yup.number().required("Please enter some labels"),
  cat1: yup.string().required("Please select a category"),
  cat2: yup.string().required("Please select a category"),
  type1: yup.string().required("Please select a type"),
  type2: yup.string().required("Please select a type"),
  type3: yup.string().required("Please select a type"),
});

export const projectSchema = yup.object({
  option1: yup.string().required("Please enter Project Name"),
});
