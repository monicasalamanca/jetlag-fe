import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // const url = new URL(req.url);
  // const { slug } = context.params;
  // const slug = url.pathname.split("/").at(-2); // "like" is the last one
  const slug = req.nextUrl.pathname.split("/")[4]; // blogs/[slug]/view

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  const strapiUrl = process.env.STRAPI_URL;
  const strapiToken = process.env.STRAPI_WRITE_API_TOKEN;

  try {
    // 1. Get blog post by slug
    const res = await fetch(
      `${strapiUrl}/api/blogs?filters[slug][$eq]=${slug}&fields[0]=likes`,
      {
        headers: {
          Authorization: `Bearer ${strapiToken}`,
        },
      }
    );

    console.log("res", res.json());

    const data = await res.json();
    const blog = data.data?.[0];
    if (!blog)
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });

    const blogId = blog.id;
    const currentLikes = blog.attributes.likes || 0;

    const updateRes = await fetch(`${strapiUrl}/api/blogs/${blogId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
      },
      body: JSON.stringify({
        data: {
          likes: currentLikes + 1,
        },
      }),
    });

    const updateJson = await updateRes.json();

    return NextResponse.json({
      success: true,
      likes: updateJson.data.attributes.likes,
    });
  } catch (err) {
    console.error("[LIKE ERROR]", err);
    return NextResponse.json({ error: "Failed to like post" }, { status: 500 });
  }
}
