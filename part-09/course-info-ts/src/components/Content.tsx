import { CoursePart } from "../types";
import Part from "./Part";

const Contents = ({ courseParts }: { courseParts: CoursePart[] }) => (
  <div>
    {courseParts.map((part) => (
      <Part key={part.name} coursePart={part} />
    ))}
  </div>
);

export default Contents;
