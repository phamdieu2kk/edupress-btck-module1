import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Container,
  Link,
  Button,
  Stack,
} from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BlogCard from "./blog/BlogCard";

// Sample articles
const articles = [
  {
    id: 1,
    image:
      "https://edupress.thimpress.com/wp-content/uploads/2023/01/best-learnpress-wordpress-theme-collection-800x488.png",
    title: "Best LearnPress WordPress Theme Collection for 2023",
    date: "January 24, 2023",
    excerpt:
      "Looking for an amazing & well-functional LearnPress WordPress Theme?...",
    link: "https://edupress.thimpress.com/blog/online-course-creation-secrets/",
  },
  {
    id: 2,
    image:
      "https://edupress.thimpress.com/wp-content/uploads/2023/01/best-education-wordpress-themes-800x488.jpg",
    title: "Best LearnPress WordPress Theme Collection For 2023",
    date: "January 24, 2023",
    excerpt:
      "Looking for an amazing & well-functional LearnPress WordPress Theme?...",
    link: "https://edupress.thimpress.com/blog/applying-natural-laws-to-technology-and-society/",
  },
  {
    id: 3,
    image:
      "https://edupress.thimpress.com/wp-content/uploads/2023/01/wordpress-plugins-learnpress-800x488.png",
    title: "Best LearnPress WordPress Theme Collection For 2023",
    date: "January 24, 2023",
    excerpt:
      "Looking for an amazing & well-functional LearnPress WordPress Theme?...",
    link: "https://edupress.thimpress.com/blog/allow-edit-on-the-frontend/",
  },
];



// Carousel settings
const responsive = {
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, gutter: 30 },
  tablet: { breakpoint: { max: 1024, min: 600 }, items: 2, gutter: 20 },
  mobile: { breakpoint: { max: 600, min: 0 }, items: 1 },
};

const LatestArticles = () => {
  return (
    <Box sx={{ py: { xs: 4, md: 6 }, bgcolor: "#f9f9f9" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Typography variant="h4" fontWeight={700}>
            Latest Articles
          </Typography>
          
          <Button
  href="#"
  sx={{
    textTransform: "none",
    fontWeight: 500,
    border: "1px solid",
    borderColor: "primary.main", // màu viền theo theme
    borderRadius: 2,
    px: 2,
    py: 0.5,
    color: "primary.main",
    "&:hover": {
      backgroundColor: "primary.main",
      color: "#fff",
    },
  }}
>
  All Articles
</Button>

        </Stack>

        {/* Carousel */}
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          arrows={false}
          showDots={false}
          draggable
        >
          {articles.map((article) => (
            <Card
              key={article.id}
              sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                mx: 1,
                "&:hover": {
                  transform: "translateY(-5px)",
                },
                "&:hover .zoom-img": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {/* <CardMedia
                component="img"
                height="180"
                image={article.image}
                alt={article.title}
                className="zoom-img"
                sx={{
                  width: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
              />
              <CardContent
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  <Link
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      textDecoration: "none",
                      color: "text.primary",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    {article.title}
                  </Link>
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {article.date}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {article.excerpt}
                </Typography>
              </CardContent> */}
             <BlogCard key={article.id} post={article} view="grid" />

            </Card>
          ))}
        </Carousel>
      </Container>
    </Box>
  );
};

export default LatestArticles;
