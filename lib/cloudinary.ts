import {v2 as cloudinary} from "cloudinary"


if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  throw new Error("Cloudinary environment variables are missing");
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});





export async function uploadToCloudinary(
  buffer: Buffer,
  folder = "products"
): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
        },
        (error, result) => {
          if (error) return reject(error)
          if (!result) return reject(new Error("Upload failed"))
          resolve(result.secure_url)
        }
      )
      .end(buffer)
  })
}


export default cloudinary