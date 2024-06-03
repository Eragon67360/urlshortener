import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST() {

    const client = await pool.connect();

    try {
        const result = await pool.query('DELETE FROM entries WHERE expires_at <= NOW()');
        return NextResponse.json({ message: 'Expired entries deleted', deletedCount: result.rowCount }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting expired entries', error: error }, { status: 500 });
    } finally {
        client.release();
    }
};

