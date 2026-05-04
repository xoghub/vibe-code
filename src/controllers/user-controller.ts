import { registerUser } from "../services/user-service";

export const registerUserController = async ({ body, set }: any) => {
  try {
    await registerUser(body);
    set.status = 201;
    return {
      message: "User registered successfully"
    };
  } catch (error: any) {
    if (error.message === "User already exists") {
      set.status = 409;
      return {
        error: "User already exists"
      };
    }
    set.status = 500;
    return {
      error: "Internal server error"
    };
  }
};
