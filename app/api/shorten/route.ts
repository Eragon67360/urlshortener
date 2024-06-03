import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { nanoid } from 'nanoid';

async function parseRequestBody(request: NextRequest): Promise<FormData> {
    const body = await request.json();
    return body as FormData;
}

export async function POST(req: NextRequest) {
    const { longUrl } = await req.json();

    if (!longUrl) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const shortCode = nanoid(6);
    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortCode}`;

    try {
        await pool.query(
            "INSERT INTO urls (short_code, long_url, expires_at) VALUES ($1, $2, NOW() + INTERVAL '1 minute')",
            [shortCode, longUrl]
        );
        return NextResponse.json({ shortUrl }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
