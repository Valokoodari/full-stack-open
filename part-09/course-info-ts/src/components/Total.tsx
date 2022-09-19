import { CourseParts } from "../types";

const Total = ({ courseParts }: CourseParts) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

export default Total;
