import { CourseParts } from "../types";

const Contents = ({ courseParts }: CourseParts) => (
  <div>
    <p>
      {courseParts[0].name} {courseParts[0].exerciseCount}
    </p>
    <p>
      {courseParts[1].name} {courseParts[1].exerciseCount}
    </p>
    <p>
      {courseParts[2].name} {courseParts[2].exerciseCount}
    </p>
  </div>
);

export default Contents;
