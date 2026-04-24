import { connectDB } from "@/lib/db";
import { Product } from "@/models/product";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const productId = searchParams.get("productId");

    if (!category || !productId) {
      return NextResponse.json(
        { error: "Missing params: category or productId" },
        { status: 400 },
      );
    }

    const products = await Product.find({
      category,
      _id: { $ne: productId },
    })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(products, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Failed to fetch related products" },
      { status: 500 },
    );
  }
}
