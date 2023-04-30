import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import SocialMedia from "../SocialMedia/SocialMedia";
import useAuth from "../../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    fetch(`https://link-depo.vercel.app/profile/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });
  }, [user.email]);

  return (
    <div class="container mx-auto px-0 lg:px-5">
      <Header key={profile.userName} profile={profile}></Header>
      <SocialMedia></SocialMedia>
    </div>
  );
};

export default Profile;
