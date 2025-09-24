import React, { useState } from 'react';
import styles from '../css/Layout.module.css';

function Layout({ children, videoUrl, onLoaded }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles.layoutContainer}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}

      <video
        autoPlay
        loop
        muted
        className={loading ? styles.hiddenVideo : styles.layoutBackgroundVideo}
        playsInline
        preload="auto"
        onCanPlay={() => {
          setLoading(false);
          onLoaded?.(); 
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>

      {!loading && <div className={styles.layoutContent}>{children}</div>}
    </div>
  );
}

export default Layout;
