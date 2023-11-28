export const errorHandler = (
  error: unknown,
  callback: (message: string) => void
) => {
  let message;

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "An error occured";
  }

  callback(message);
};
