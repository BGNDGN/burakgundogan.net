const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:7000"
    : "https://burakgundogan.net";

export default baseURL;