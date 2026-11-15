import App from "../App";
import { Bio } from "../data/constants";
import { site } from "../data/site";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${site.url}/#profile`,
    url: site.url,
    name: site.title,
    description: site.description,
    mainEntity: {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: Bio.name,
      url: site.url,
      jobTitle: "Software Engineer",
      description: Bio.description,
      sameAs: [Bio.github, Bio.linkedin, Bio.insta, Bio.facebook],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <App />
    </>
  );
}
