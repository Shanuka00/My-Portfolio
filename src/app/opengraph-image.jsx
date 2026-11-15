import { ImageResponse } from "next/og";
import { site } from "../data/site";

export const alt = "Shanuka Dissanayake — Software Engineer & Full Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", background: "linear-gradient(135deg, #191924, #112959)", color: "#f2f3f4" }}>
        <div style={{ fontSize: 28, color: "#719fff", marginBottom: 28 }}>PORTFOLIO</div>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1 }}>{site.name}</div>
        <div style={{ fontSize: 34, marginTop: 32 }}>Software Engineer & Full Stack Developer</div>
        <div style={{ fontSize: 26, marginTop: 48, color: "#b1b2b3" }}>{new URL(site.url).host}</div>
      </div>
    ),
    size,
  );
}
