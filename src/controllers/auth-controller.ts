import { loginUser } from "../services/auth-service";

export const loginController = async ({ body, set }: any) => {
  try {
    const { accessToken, refreshToken } = await loginUser(body);
    
    set.status = 200;
    return {
      message: "User logged in successfully",
      accessToken,
      refreshToken
    };
  } catch (error: any) {
    if (error.message === "User or Password is not valid") {
      set.status = 401;
      return {
        error: "User or Password is not valid"
      };
    }
    set.status = 500;
    return {
      error: "Internal server error"
    };
  }
};
