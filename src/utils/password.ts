const generateRandomPassword = (): string => {
  return Math.random().toString(36).slice(-8);
};

export {
  generateRandomPassword
};
