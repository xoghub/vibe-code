import { registerUser, getUserProfile } from "../services/user-service";

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

export const getCurrentUserController = async ({ userId, set }: any) => {
  try {
    const profile = await getUserProfile(userId);
    set.status = 200;
    return profile;
  } catch (error: any) {
    set.status = 401;
    return {
      error: "Unauthorized"
    };
  }
};
