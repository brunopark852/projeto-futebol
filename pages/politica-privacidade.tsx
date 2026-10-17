import type { GetServerSideProps } from 'next';

export default function PoliticaPrivacidadeAlias() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/privacidade',
    permanent: true,
  },
});
