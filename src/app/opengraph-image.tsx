import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0c0f",
          color: "#ececf1",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, color: "#8b8cf8" }}>
          QUALITY ENGINEER II · SDET II
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700 }}>{site.name}</div>
          <div style={{ fontSize: 38, color: "#a1a1aa", marginTop: 16 }}>
            Automation systems that help teams ship with confidence.
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#a1a1aa" }}>
          Playwright · Selenium · Appium · Python · Java · CI/CD · AI × QA
        </div>
      </div>
    ),
    size,
  );
}
