import React from 'react';
import Layout from '../components/Layout';
import HomeContent from '../components/HomeCard';

function Home() {

  return (
    <Layout videoUrl="https://burakgundogan.net/videos/857045-hd_1920_1080_30fps.mp4">
      <HomeContent />
    </Layout>
  );
}

export default Home;