import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import memoApi from "../api/memoApi";
import MainCard from "../components/common/MainCard";
import PostForm from "../components/common/PostForm";

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const createMemo = async () => {
    try {
      setLoading(true);
      const res = await memoApi.create();
      navigate(`/memo/${res._id}`);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <MainCard />
      </Grid>
      <Grid item xs={4}>
        <PostForm />
      </Grid>
    </Grid>
  );
}

export default Home;
