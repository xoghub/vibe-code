import { loginUser, logoutUser } from "../services/auth-service";

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

export const logoutController = async ({ accessToken, set }: any) => {
  try {
    if (!accessToken) {
      throw new Error("Unauthorized");
    }

    await logoutUser(accessToken);
    
    set.status = 200;
    return {
      message: "User logged out successfully"
    };
  } catch (error: any) {
    set.status = 401;
    return {
      error: "Unauthorized or User Already Logged Out"
    };
  }
};
