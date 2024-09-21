/* eslint-disable import/no-cycle */
import Head from 'next/head';
import MainLayout from '../../layouts/main';
import LayoutXAgency from '../../layouts/main/freelance';

const XAgencyVote = () => (
    <>
    </>
  );

  XAgencyVote.getLayout = (page: React.ReactElement) => (
  <MainLayout>
    <Head>
      <title>Vote | Agency</title>
    </Head>
    <LayoutXAgency> {page} </LayoutXAgency>
  </MainLayout>
);

export default XAgencyVote;
