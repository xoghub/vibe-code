export const generateTokens = () => {
  // Menggunakan randomUUID sebagai placeholder untuk JWT sederhana
  const accessToken = crypto.randomUUID();
  const refreshToken = crypto.randomUUID();
  
  return { accessToken, refreshToken };
};
