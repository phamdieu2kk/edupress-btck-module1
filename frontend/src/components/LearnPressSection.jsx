import React from "react";
<<<<<<< HEAD
import { Box, Typography, Button, Stack } from "@mui/material";

const LearnPressSection = () => {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 4, md: 6 },
        background: "linear-gradient(135deg, #6A5AF9 0%, #FF6B00 100%)",
        color: "#fff",
        borderRadius: 3,
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 6 }}
        alignItems="center"
        justifyContent="space-between"
      >
        {/* Text Content */}
        <Box sx={{ maxWidth: { xs: "100%", md: "60%" } }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 500, mb: 1, color: "#F0F0F0" }}
          >
            Get more power from
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, mb: 2, lineHeight: 1.3 }}
          >
            LearnPress Premium Add-ons
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#E0E0E0", mb: { xs: 3, md: 0 } }}
          >
            The next level of LearnPress - LMS WordPress Plugin. More Powerful,
            Flexible and Magical Inside.
          </Typography>
        </Box>

        {/* Button */}
        <Box>
          <Button
            variant="contained"
            color="warning"
            href="https://thimpress.com/wordpress/plugins/learnpress/?utm_source=Home&utm_medium=Header&utm_campaign=MainMenu"
            target="_blank"
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              whiteSpace: "nowrap",
            }}
          >
            View More
          </Button>
        </Box>
      </Stack>
    </Box>
=======

const LearnPressSection = () => {
  return (
    <section
      className="elementor-section elementor-top-section elementor-element elementor-element-f30a1c8 elementor-section-boxed elementor-section-height-default elementor-section-height-default"
      data-id="f30a1c8"
      data-element_type="section"
    >
      <div className="elementor-container elementor-column-gap-no">
        <div
          className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-35d4f7d"
          data-id="35d4f7d"
          data-element_type="column"
        >
          <div className="elementor-widget-wrap elementor-element-populated">
            <section
              className="elementor-section elementor-inner-section elementor-element elementor-element-3cae5e5 animated-slow elementor-section-boxed elementor-section-height-default elementor-section-height-default animated ekit--slide-up"
              data-id="3cae5e5"
              data-element_type="section"
              data-settings='{"background_background":"gradient","animation":"ekit--slide-up"}'
            >
              <div className="elementor-background-overlay" />
              <div className="elementor-container elementor-column-gap-custom">
                <div
                  className="elementor-column elementor-col-100 elementor-inner-column elementor-element elementor-element-951d1a6"
                  data-id="951d1a6"
                  data-element_type="column"
                >
                  <div className="elementor-widget-wrap elementor-element-populated">
                    {/* Heading */}
                    <div
                      className="elementor-element elementor-element-53c1f9b elementor-widget__width-initial elementor-widget-tablet__width-initial elementor-widget-mobile__width-inherit elementor-widget elementor-widget-thim-ekits-heading"
                      data-id="53c1f9b"
                      data-element_type="widget"
                      data-widget_type="thim-ekits-heading.default"
                    >
                      <div className="elementor-widget-container">
                        <div className="thim-ekits-heading thim-ekit__heading">
                          <h5 className="sub-heading">Get more power from</h5>
                          <h2 className="title">
                            LearnPress Premium Add-ons
                          </h2>
                          <div className="desc">
                            <div>
                              The next level of LearnPress - LMS WordPress Plugin.
                              More Powerful, Flexible and Magical Inside.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Button */}
                    <div
                      className="elementor-element elementor-element-142b547 elementor-widget elementor-widget-thim-ekits-button"
                      data-id="142b547"
                      data-element_type="widget"
                      data-widget_type="thim-ekits-button.default"
                    >
                      <div className="elementor-widget-container">
                        <div className="thim-ekits-button">
                          <a
                            href="https://thimpress.com/wordpress/plugins/learnpress/?utm_source=Home&utm_medium=Header&utm_campaign=MainMenu"
                            target="_blank"
                            role="button"
                          >
                            <span className="button-content-wrapper">
                              View More
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
>>>>>>> 6016b22a4f722684f02e99cf3f5371caf5aed30b
  );
};

export default LearnPressSection;
