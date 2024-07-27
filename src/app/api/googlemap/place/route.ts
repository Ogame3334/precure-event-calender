import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLEMAP_APIKEY || '';
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    
    const REQ_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY}`;
    
    const searchPlace = async () => {
        try {
            const response = await fetch(REQ_URL);
            const data = await response.json();
            if (data.results) {
                return data.results[0];
            }
        } catch (error) {
            return { error: 'cannot request Google Place API' };
        }
    }

    return NextResponse.json(await searchPlace());

};
