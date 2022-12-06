import { Box, Chip, Typography, Stack, Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ApiService } from "./../../service/api.service";
import ReactPlayer from "react-player";
import {
  CheckCircle,
  FavoriteOutlined,
  LocalActivity,
  MarkChatRead,
  Tag,
  Visibility,
} from "@mui/icons-material";
// import renderHTML from "react-render-html";
import Loader from "./../loader/loader";

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

  if (!videoDetail?.snippet) return <Loader />;

  // const {
  //   snippet: { title, channelId, channelTitle, description, tags, thumbnails },
  //   statistics: { viewCount, likeCount, commentsCount },
  // } = videoDetail;

  return (
    <Box minHeight={"90vh"} mb={10}>
      <Box display={"flex"} sx={{ flexDirection: { xs: "column", md: "row" } }}>
        <Box width={{ xs: "100%", md: "75%" }}>
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
          <Typography variant="h6" fontWeight="bold" p={2}>
            {videoDetail.snippet.title}
          </Typography>
          <Typography variant="subtitle2" p={2} sx={{ opacity: "0.7" }}>
            {videoDetail.snippet.description.slice(0, 600)}
          </Typography>
          <Stack direction="row" gap="20px" alignItems="center" py={1} px={2}>
            <Stack
              sx={{ opacity: "0.7" }}
              direction="row"
              gap="20px"
              alignItems="center"
            >
              <Visibility />
              {parseInt(videoDetail.statistics.viewCount).toLocaleString()}{" "}
              views
            </Stack>
            <Stack
              sx={{ opacity: 0.7 }}
              direction="row"
              alignItems="center"
              gap="3px"
            >
              <FavoriteOutlined />
              {parseInt(videoDetail.statistics.likeCount).toLocaleString()}{" "}
              likes
            </Stack>
            <Stack
              sx={{ opacity: 0.7 }}
              direction="row"
              alignItems="center"
              gap="3px"
            >
              <MarkChatRead />
              {parseInt(
                videoDetail.statistics.commentCount
              ).toLocaleString()}{" "}
              comment
            </Stack>
          </Stack>
          <Stack direction={"row"} py={1} px={2}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={"5px"}
              marginTop={"5px"}
            >
              <Avatar
                alt={videoDetail.snippet.channelTitle}
                src={videoDetail.snippet.thumbnails.default.url}
              />
              <Typography variant="subtitle2" color="gray">
                {videoDetail.snippet.channelTitle}
                <CheckCircle
                  sx={{ fontSize: "12px", color: "gray", ml: "5px" }}
                />
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box width={{ xs: "100%", md: "25%" }}>suggested video</Box>
      </Box>
    </Box>
  );
};

export default VideoDetail;
