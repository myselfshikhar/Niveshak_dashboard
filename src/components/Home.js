import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const API_BASE_URL =
    window.location.hostname === "localhost"
      ? "http://localhost:3002"
      : "https://niveshak-backend.onrender.com";


    const Frontend_link =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://niveshak-frontend.vercel.app";

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth`, {}, { withCredentials: true });
        if (!data.status) {
          window.location.replace(`${Frontend_link}/Login`);
        }
      } catch (err) {
        window.location.replace(`${Frontend_link}/Login`);
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [cookies, navigate]);

  if (loading) return <h3>Checking authentication...</h3>;


  return (
    <>
      <TopBar />
      <Dashboard />
    </>
  );
};

export default Home;
