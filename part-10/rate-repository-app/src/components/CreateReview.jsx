import * as yup from "yup";
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import { useNavigate } from "react-router-native";
import useCreateReview from "../hooks/useCreateReview";
import FormikTextInput from "./FormikTextInput";
import Button from "./Button";
import theme from "../theme";

const style = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
  },
});

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),
  text: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={style.container}>
      <FormikTextInput
        autoCapitalize="none"
        name="ownerName"
        placeholder="Repository owner name"
      />
      <FormikTextInput
        autoCapitalize="none"
        name="repositoryName"
        placeholder="Repository name"
      />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline />
      <Button onPress={onSubmit} text="Create a review" />
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log(values);
    const { ownerName, repositoryName, rating, text } = values;
    try {
      await createReview({
        ownerName,
        repositoryName,
        rating: Number(rating),
        text,
      });
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
