// utils/zoomApi.js
const axios = require("axios");

const createZoomMeeting = async (userId, topic, startTime) => {
  try {
    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type: 2, // Scheduled meeting
        start_time: startTime,
        duration: 60, // 1 hour
        timezone: "Asia/Kolkata",
        agenda: "Online lesson",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.ZOOM_JWT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error creating Zoom meeting");
  }
};

module.exports = { createZoomMeeting };
