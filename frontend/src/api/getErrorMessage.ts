import axios from "axios";

const DEFAULT_ERROR_TEXT = "Something went wrong";

export const getErrorMessage = (err: unknown): string | null => {
  if (axios.isAxiosError(err) && err.response?.data?.message) {
    return err.response.data.message;
  }

  if (axios.isAxiosError(err)) {
    return DEFAULT_ERROR_TEXT;
  }

  console.error(err);
  return null;
};
