import cloudinary from "@/lib/cloudinary";
import { connectDB } from "@/lib/db";
import { Product } from "@/models/product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const cutprice = Number(formData.get("cutprice"));
    const model = formData.get("model") as string;
    const condition = formData.get("condition") as string;
    const year = Number(formData.get("year"));
    const mileage = Number(formData.get("mileage"));
    const fuel = formData.get("fuel") as string;
    const category = formData.get("category") as string;
    const trnasmission = formData.get("trnasmission") as string;

    const files = formData
      .getAll("images")
      .filter((f): f is File => f instanceof File);

    if (
      !files ||
      !title ||
      !description ||
      isNaN(price) ||
      !model ||
      !condition ||
      isNaN(year) ||
      isNaN(mileage) ||
      !fuel ||
      !category ||
      !trnasmission
    ) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }

    const imagesUrls: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result: any = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (err, res) => {
            if (err) return reject(err);
            resolve(res);
          })
          .end(buffer);
      });

      imagesUrls.push(result.secure_url);
    }

    const product = Product.create({
      title,
      description,
      price,
      cutprice,
      category,
      model,
      condition,
      year,
      mileage,
      fuel,
      image: imagesUrls,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (e) {
    console.error("POST /api/products error:", e);
    return NextResponse.json(
      { error: "Failed to make a Post request" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const limit = searchParams.get("limit");
    const sale = searchParams.get("sale");
    const condition = searchParams.get("condition")
    const query: any = {};

    if (category && category !== "all") {
      query.category = { $regex: `^${category}`, $options: "i" };
    }

    if(condition) {
         query.condition = {$regex: `^${condition}$`,$options: "i"}
    }

    if (search) query.title = { $regex: search, $options: "i" };
    if (sale === "true") {
      query.$expr = { $gt: ["$cutprice", "$price"] };
    }

    let mongooseQuery = Product.find(query);
    if (sort === "newest") {
      mongooseQuery = mongooseQuery.sort({ createdAt: -1 });
    }

    if (limit) {
      mongooseQuery = mongooseQuery.limit(Number(limit));
    }

    const products = await mongooseQuery.lean();
    return NextResponse.json(products, { status: 200 });
  } catch (e) {
    console.error("POST /api/products error:", e);
    return NextResponse.json(
      { error: "Failed to fetch Products" },
      { status: 500 },
    );
  }
}
