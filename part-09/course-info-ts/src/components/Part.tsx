import { CoursePart } from "../types";

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case "normal":
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <i>{coursePart.description}</i> <br /> <br />
        </div>
      );
    case "groupProject":
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          project exercises {coursePart.groupProjectCount} <br /> <br />
        </div>
      );
    case "submission":
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>{" "}
          <br />
          <i>{coursePart.description}</i> <br />
          submit to {coursePart.exerciseSubmissionLink} <br /> <br />
        </div>
      );
    case "special":
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <i>{coursePart.description}</i> <br />
          required skills: {coursePart.requirements.join(", ")} <br /> <br />
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;

const assertNever = (coursePart: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(coursePart)}`
  );
};
