import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { id } = await context.params;

    // Fetch from Strapi backend
    const strapiResponse = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
      }/api/quizzes/${id}`,
    );

    if (!strapiResponse.ok) {
      return NextResponse.json(
        {
          error: "Not Found",
          message: `Quiz with ID "${id}" not found`,
        },
        { status: strapiResponse.status },
      );
    }

    const quiz = await strapiResponse.json();

    return NextResponse.json(quiz);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
