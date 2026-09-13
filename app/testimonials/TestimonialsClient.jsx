"use client";

import { useState } from "react";
import TestimonialsHero from "./TestimonialsHero";
import TrustPillars from "./TrustPillars";
import FeaturedStory from "./FeaturedStory";
import TestimonialWall from "./TestimonialWall";
import IndustryStories from "./IndustryStories";
import VideoTestimonials from "./VideoTestimonials";
import TestimonialsCTA from "./TestimonialsCTA";
import StoryModal from "./StoryModal";
import { FEATURED_STORY } from "./testimonialsData";

export default function TestimonialsClient() {
  const [activeStory, setActiveStory] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const handleOpenStory = (story) => {
    setActiveVideo(null);
    setActiveStory(story);
  };

  const handleOpenVideo = (video) => {
    setActiveStory(null);
    setActiveVideo(video);
  };

  const handleCloseModal = () => {
    setActiveStory(null);
    setActiveVideo(null);
  };

  return (
    <div className="tm-container">
      <TestimonialsHero onOpenStory={handleOpenStory} featuredStory={FEATURED_STORY} />
      <TrustPillars />
      <FeaturedStory onOpenStory={handleOpenStory} />
      <TestimonialWall onOpenQuote={handleOpenStory} />
      <IndustryStories onOpenStory={handleOpenStory} />
      <VideoTestimonials onOpenVideo={handleOpenVideo} />
      <TestimonialsCTA />

      {(activeStory || activeVideo) && (
        <StoryModal story={activeStory} video={activeVideo} onClose={handleCloseModal} />
      )}
    </div>
  );
}
