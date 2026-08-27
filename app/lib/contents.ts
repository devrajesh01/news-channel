// lib/contents.ts
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaYoutubeSquare,
} from "react-icons/fa";
import { NewsComments } from "../types/news";

export const breakingNews = [
  {
    id: 1,
    title: "India announces major changes to its technology policy",
    slug: "india-technology-policy",
  },
  {
    id: 2,
    title: "Global markets react to latest economic developments",
    slug: "global-markets-economic-development",
  },
];

export const newsPosts = [
  {
    id: 1,
    title: "Latest Technology Trends in 2026",
    slug: "latest-technology-trends-2026",
    category: "Technology",
  },
  {
    id: 2,
    title: "Major Political Developments Today",
    slug: "major-political-developments",
    category: "Politics",
  },
];

export const categories = [
  {
    id: 1,
    name: "Politics",
    slug: "politics",
  },
  {
    id: 2,
    name: "World",
    slug: "world",
  },
  {
    id: 3,
    name: "Technology",
    slug: "technology",
  },
];

export const socialLinks = [
  {
    label: "Facebook",
    href: "#",
    icon: FaFacebookF,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: FaLinkedin,
  },
  {
    label: "Instagram",
    href: "#",
    icon: FaInstagram,
  },
  {
    label: "YouTube",
    href: "#",
    icon: FaYoutube,
  },
];
export const posts: NewsComments[] = [
  {
    id: 1,
    title: "Vehicles Without Valid Fitness Was Docs Can't Collect Fuels Respect Dem Clarifications From Italy",
    category: "WORLD",
    date: "22 Feb, 2020",
    comments: 0,
    image: "/images/news-1.png",
    excerpt:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.",
  },
  {
    id: 2,
    title: "Vehicles Without Valid Fitness Was Docs Can't Collect",
    category: "WORLD",
    date: "21 Feb, 2020",
    comments: 0,
     image: "/images/news-2.png",
    excerpt: "Add a real excerpt here.",
  },
  {
    id: 3,
    title: "Vehicles Without Valid Fitness Was Docs Can't Collect Fuels Respect Dem Clarifications From Italy",
    category: "WORLD",
    date: "22 Feb, 2020",
    comments: 0,
    image: "/images/news-1.png",
    excerpt:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.",
  },
  {
    id: 4,
    title: "Vehicles Without Valid Fitness Was Docs Can't Collect",
    category: "WORLD",
    date: "21 Feb, 2020",
    comments: 0,
     image: "/images/news-2.png",
    excerpt: "Add a real excerpt here.",
  },
  {
    id: 5,
    title: "Vehicles Without Valid Fitness Was Docs Can't Collect Fuels Respect Dem Clarifications From Italy",
    category: "WORLD",
    date: "22 Feb, 2020",
    comments: 0,
    image: "/images/news-1.png",
    excerpt:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.",
  },
  
  // ...same for posts 3-5
];