'use client'
import pool from '@/lib/db';
import { useParams } from 'next/navigation';

const page = async () => {

  const { code } = useParams();

  console.log(code);
  const result = await pool.query('SELECT long_url FROM urls WHERE short_code = $1', [code]);

  if (result.rows.length > 0) {
    return {
      redirect: {
        destination: result.rows[0].long_url,
        permanent: false,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
export default page