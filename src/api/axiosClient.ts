import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "https://backend-homestock.onrender.com/api/v1", // tu backend
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxMCIsImlzcyI6ImhvbWVzdG9jayIsImlhdCI6MTc2MTU0OTgxMiwiZXhwIjoxNzYxNTUwNzEyLCJlbWFpbCI6ImdhYm9AZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsInR5cCI6ImFjY2VzcyJ9.08jYsR_LGvkaHtQA_YbfY8JsFm5xc_4PFM5hRIJoZwoCkPMlFea5Bb_Aa-QQpOub",
  },
});