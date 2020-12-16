const API = (target) => {
    const base =
        process.env.NODE_ENV === "production"
            ? process.env.API_BASE
            : "http://localhost:3000/api";
    return base + target;
};

export default API;
