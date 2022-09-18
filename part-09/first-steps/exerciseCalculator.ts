interface ExerciseValues {
  target: number;
  daily_exercises: Array<number>;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  daily_exercises: Array<number>,
  target: number
): Result => {
  const total = daily_exercises.reduce((a, b) => a + b, 0);
  const average = total / daily_exercises.length;
  const success = average >= target;
  const rating = success ? 3 : average >= target / 2 ? 2 : 1;
  const ratingDescription =
    rating === 3
      ? "good, keep it up!"
      : rating === 2
        ? "not too bad but could be better"
        : "bad";

  return {
    periodLength: daily_exercises.length,
    trainingDays: daily_exercises.filter((d) => d > 0).length,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

export { calculateExercises, ExerciseValues };
