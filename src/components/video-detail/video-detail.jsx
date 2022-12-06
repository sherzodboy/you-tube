import { Box, Chip, Typography, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "./../../service/api.service";
import ReactPlayer from "react-player";
import {
  FavoriteOutlined,
  MarkChatRead,
  Tag,
  Visibility,
} from "@mui/icons-material";
// import renderHTML from "react-render-html";

const VideoDetail = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await ApiService.fetching(
          `videos?part=snippet,statistics&id=${id}`
        );
        setVideoDetail(data.items[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [id]);

  console.log(videoDetail);

  // const {
  //   snippet: { title, channelId, channelTitle, description, tags, thumbnails },
  //   statistics: { viewCount, likeCount, commentsCount },
  // } = videoDetail;

  return (
    <Box minHeight={"90vh"} mb={10}>
      <Box display={"flex"}>
        <Box width={"75%"}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${id}`}
            className="react-payer"
            controls
          />
          {videoDetail.snippet.tags.map((item, idx) => (
            <Chip
              label={item}
              key={idx}
              sx={{ marginTop: "10px", cursor: "pointer", ml: "10px" }}
              deleteIcon={<Tag />}
              onDelete={() => {}}
              variant="autlined"
            />
          ))}
          <Typography variant="h5" fontWeight="bold" p={2}>
            {videoDetail.snippet.title}
          </Typography>
          <Typography variant="subtitle2" p={2} sx={{ opacity: "0.7" }}>
            {/* {renderHTML(videoDetail.snippet.description)} */}
          </Typography>
          <Stack
            direction={"row"}
            gap={"20px"}
            alignItems="center"
            py={1}
            px={2}
          >
            <Visibility />
            {parseInt(videoDetail.statistics.viewCount).toLocaleString()} views
          </Stack>
          <Stack
            sx={{ opacity: 0.7 }}
            direction={"row"}
            alignItems={"center"}
            gap={"3px"}
          >
            <FavoriteOutlined />
            {parseInt(videoDetail.statistics.likeCount).toLocaleString()} likes
          </Stack>
          <Stack
            sx={{ opacity: 0.7 }}
            direction={"row"}
            alignItems={"center"}
            gap={"3px"}
          >
            <MarkChatRead />
            {parseInt(
              videoDetail.statistics.commentsCount
            ).toLocaleString()}{" "}
            comments
          </Stack>
        </Box>
        <Box width={"25%"}>suggested video</Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;
