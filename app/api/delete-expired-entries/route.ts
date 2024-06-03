import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST() {

    const client = await pool.connect();

    try {
        const { rows } = await client.query('SELECT next_run FROM urls LIMIT 1');
        const nextRun = rows[0]?.next_run;
        if (!nextRun || new Date(nextRun) > new Date()) {
            return NextResponse.json({ message: 'Not time to run yet' }, { status: 200 });
        }

        await client.query('DELETE FROM urls WHERE expires_at <= NOW()');

        await client.query('UPDATE urls SET next_run = NOW() + INTERVAL \'7 days\'');

        const result = await pool.query('DELETE FROM urls WHERE expires_at <= NOW()');
        return NextResponse.json({ message: 'Expired urls deleted and next_run updated' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting expired urls', error: error }, { status: 500 });
    } finally {
        client.release();
    }
};

