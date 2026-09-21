const REQUIRED_ENV = [
  "MONGO_URI",
  "JWT_SECRET",
  "ADMIN_USER",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

const failOrWarn = (message) => {
  if (process.env.NODE_ENV === "production") {
    throw new Error(message);
  }

  console.warn(message);
};

export const validateEnv = () => {
  const missing = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missing.length) {
    failOrWarn(`Missing required environment variables: ${missing.join(", ")}`);
  }

  if ((process.env.JWT_SECRET || "").length < 32) {
    failOrWarn("JWT_SECRET must be at least 32 characters in production");
  }

  if (!process.env.ADMIN_PASS_HASH && !process.env.ADMIN_PASS) {
    failOrWarn("ADMIN_PASS_HASH or ADMIN_PASS is required");
  }

  if (!process.env.ADMIN_PASS_HASH && (process.env.ADMIN_PASS || "").length < 12) {
    failOrWarn("ADMIN_PASS must be at least 12 characters in production when ADMIN_PASS_HASH is not set");
  }
};
