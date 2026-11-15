import { Bio } from "./constants";

export const site = {
  name: Bio.name,
  title: `${Bio.name} | Software Engineer & Full Stack Developer`,
  description: Bio.description,
  url: new URL(process.env.SITE_URL || "https://shanuka.vercel.app").origin,
};
