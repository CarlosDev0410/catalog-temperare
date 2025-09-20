import { AppService } from "@/services/app-service";
import { SearchFilters } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const category = searchParams.get("category") || undefined;
  const tags = searchParams.get("tags")?.split(",") || undefined;

  const filters: SearchFilters = { query, category, tags };

  try {
    const appService = new AppService();
    const results = await appService.searchApps(filters);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API error:", error);
    return NextResponse.json(
      { message: "Erro ao buscar aplicações" },
      { status: 500 }
    );
  }
}
