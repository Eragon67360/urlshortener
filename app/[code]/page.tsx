"use client"

import pool from '@/lib/db';
import { redirect, useParams } from 'next/navigation';

interface Entry {
    slug: string;
    long_url: string;
}

const fetchEntry = async (code: string): Promise<Entry | null> => {
    const client = await pool.connect();
    try {
        const res = await pool.query('SELECT long_url FROM urls WHERE short_code=$1', [code]);

        if (res.rows.length > 0) {
            return res.rows[0];
        }
        return null;
    } finally {
        client.release();
    }
};

const SlugPage = async () => {
    const slug = useParams<{ code: string }>();
    const entry = await fetchEntry(slug.code);
    if (entry) {
        redirect(entry.long_url);
    }

    return (
        <div>
            <h1>404 - Entry not found</h1>
            <p>The entry with slug "{slug.code}" does not exist.</p>
        </div>
    );
};

export default SlugPage;