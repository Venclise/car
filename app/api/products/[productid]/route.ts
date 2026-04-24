import { connectDB } from "@/lib/db";
import { Product } from "@/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ productid: string }> },
) {
  try {
    await connectDB();

    const { productid } = await params;

    const product = await Product.findById(productid);
if(!product) {
    return NextResponse.json({message: "Product not found"},{status:404})
}

return NextResponse.json(product,{status:200})

  } catch (e) {
        console.error("GET Product error:", e);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


export async function DELETE(
    req: NextRequest,
  { params }: { params: Promise<{ productid: string }> },
) {
 try {
  await connectDB()
const {productid} = await params

  const product = await Product.findByIdAndDelete(productid)

  if(!product) {
        return NextResponse.json({message: "Failed to delete product"},{status:404})
  }


return NextResponse.json({message:"Product Deleted"},{status:200})

 }catch(e) {
        console.error("GET Product error:", e);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
 } 
}
