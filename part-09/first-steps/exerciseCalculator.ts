interface ExerciseValues {
  daily_exercises: Array<number>;
  target: number;
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

const parseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const daily_exercises = [];
  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error("At least one of the provided values was not a number!");
    }
    daily_exercises.push(Number(args[i]));
  }

  if (!isNaN(Number(args[2]))) {
    return {
      daily_exercises,
      target: Number(args[2]),
    };
  } else {
    throw new Error("At least one of the provided values was not a number!");
  }
};

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
      : "you should really try harder";

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

try {
  const { daily_exercises, target } = parseArguments(process.argv);
  console.log(calculateExercises(daily_exercises, target));
} catch (e) {
  console.log("Error, something bad happened, message:", e.message);
}

export {};
