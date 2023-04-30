import { Container, textAlign } from "@mui/system";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Avatar, Button, Link } from "@mui/material";
import useAuth from "../../../hooks/useAuth";
import {
  BellIcon,
  InformationCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import InfoSettings from "../InfoSettings/InfoSettings";
import NotificationSettings from "../NotificationSettings/NotificationSettings";
import { Image } from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SettingHome = () => {
  const [value, setValue] = React.useState(0);
  const { user } = useAuth();
  const [profile, setProfile] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch(`https://link-depo.vercel.app/profile/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });
  }, [user.email]);

  return (
    <div>
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: "100%",
                  height: "100%",
                },
              }}
            >
              <Paper elevation={3}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    className="h-40 w-40 mt-3 rounded-full"
                    src={`data:image/png;base64,${profile.profilePic}`}
                    alt=""
                  />
                </div>

                <Box
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    padding: "25px",
                    textAlign: "left",
                  }}
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    orientation="vertical"
                    sx={{
                      width: "100%",
                    }}
                    // TabIndicatorProps={{
                    //   style: {
                    //     // display: "none",
                    //     // width: "100%",
                    //     backgroundColor: "blue",
                    //     borderRadius: "10px",
                    //   },
                    // }}
                  >
                    {/* My profile  */}

                    <Tab
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        display: "flow",
                        justifyContent: "left",
                        textAlign: "left",
                        // marginTop: "-5px",
                        // marginBottom: "-5px",
                      }}
                      {...a11yProps(0)}
                      iconPosition="start"
                      icon={
                        <UserIcon
                          className="h-11 w-11 pr-5"
                          aria-hidden="true"
                        />
                      }
                      label="Profile"
                    />

                    {/* personal information */}

                    <Tab
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        display: "flow",
                        justifyContent: "left",
                        textAlign: "left",
                        // marginTop: "-5px",
                        // marginBottom: "-5px",
                        lineHeight: 2,
                      }}
                      icon={
                        <InformationCircleIcon
                          className="h-11 w-11 pr-5"
                          aria-hidden="true"
                        />
                      }
                      iconPosition="start"
                      label="Personal Information"
                      {...a11yProps(1)}
                    />

                    {/* Notification */}

                    <Tab
                      style={{
                        fontWeight: "bold",
                        fontSize: "15px",
                        display: "flow",
                        justifyContent: "left",
                        textAlign: "left",
                        // marginTop: "-5px",
                        // marginBottom: "-5px",
                      }}
                      icon={
                        <BellIcon
                          className="h-11 w-11 pr-5"
                          aria-hidden="true"
                        />
                      }
                      iconPosition="start"
                      label="Notification"
                      {...a11yProps(2)}
                    />
                  </Tabs>
                </Box>
              </Paper>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: "100%",
                  height: "100%",
                },
              }}
            >
              <Paper elevation={3}>
                {/* My Profile */}

                <TabPanel value={value} index={0}>
                  <ProfileSettings
                    key={profile.userName}
                    profile={profile}
                  ></ProfileSettings>
                </TabPanel>

                {/* personal info */}

                <TabPanel value={value} index={1}>
                  <InfoSettings
                    key={profile.userName}
                    profile={profile}
                  ></InfoSettings>
                </TabPanel>

                {/* notification */}

                <TabPanel value={value} index={2}>
                  <NotificationSettings></NotificationSettings>
                </TabPanel>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default SettingHome;
