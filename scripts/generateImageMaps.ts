import { readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "..", "src", "client", "assets", "image_data.json");
const newFilePath = join(__dirname, "..", "src", "client", "assets", "imageUrls.tsx");

async function generateImageMaps() {
  console.log(filePath);
  try {
    const data: Array<{ name: string; url: string }> = JSON.parse(await readFile(filePath, "utf-8")) as Array<{ name: string; url: string }>;
    const imageUrls: { [key: string]: string } = {};
    data.forEach((item) => {
      imageUrls[item.name] = item.url;
    });
    const output = `export const imageUrls = ${JSON.stringify(imageUrls, null, 2)} as const;\n\nexport type imageName = keyof typeof imageUrls;\n`;
    await writeFile(newFilePath, output, "utf-8");
    console.log("Image map generated successfully");
  } catch (error) {
    console.error("Error generating image map", error);
  }
}
generateImageMaps();
