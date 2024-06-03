import { GetServerSideProps } from 'next';
import pool from '@/lib/db';

export default function RedirectPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { code } = context.params!;
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
