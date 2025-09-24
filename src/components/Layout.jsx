import React, { useState } from 'react';
import styles from '../css/Layout.module.css';

function Layout({ children, videoUrl, onLoaded }) {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <div className={styles.layoutContainer}>
      {!videoReady && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}

      <video
        autoPlay
        loop
        muted
        className={videoReady ? styles.layoutBackgroundVideo : styles.hiddenVideo}
        playsInline
        preload="auto"
        onCanPlay={() => {
          setVideoReady(true); 
          onLoaded?.();         
        }}
      >
        <source src={videoUrl} type="video/mp4" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>

      {videoReady && <div className={styles.layoutContent}>{children}</div>}
    </div>
  );
}

export default Layout;
