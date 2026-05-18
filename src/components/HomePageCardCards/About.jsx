import React from 'react';
import styles from'../../css/HomePageCardCards.module.css';

function About() {
    return (
        <div className={styles.usingTechText}>

            <hr className={styles.Hr}/>

            <p><strong>📌 Kişisel Bilgiler ve Eğitim</strong></p>
            <p>Merhaba, adım <strong>Burak Gündoğan</strong>.</p>
            <p><strong>Plevne Anadolu Lisesi</strong>'nden <strong>2022</strong> yılında mezun oldum.</p>
            <p>Ardından <strong>Topkapı Üniversitesi</strong> Bilgisayar Programlama bölümünü kazandım ve <strong>2024</strong> yılında başarıyla mezun oldum.</p>
            

            <hr className={styles.Hr}/>

            <p><strong>👨🏻‍✈️ Askerliğim</strong></p>
            <p>Askerlik görevimi <strong>7 Mayıs 2026</strong> yılında tamamladım.</p>

            <hr className={styles.Hr}/>

            <p><strong>🛠️ İş Akışım</strong></p>
            <p>Stajıma <strong>Modanisa</strong> firmasında başladım. Yaklaşık <strong>3</strong> ay süren staj dönemimi tamamladım. Bu süreçte <strong>QA (Quality Assurance)</strong> ve ardından <strong>Frontend/Backend</strong> geliştirme ekiplerinde görev aldım.</p>
            <p>Ardından <strong>Yazılım Destek Uzmanı</strong> olarak yaklaşık <strong>5</strong> ay boyunca <strong>Condolife</strong> bünyesinde çalıştım.</p>
            <p>Detaylı açıklama, aşağıdaki <strong>İş Deneyimlerim</strong> bölümündedir.</p>

            <hr className={styles.Hr}/>

            <p><strong>💻 Geliştirdiğim Teknolojiler</strong></p>
            <ul>
                <li><strong>React.js</strong>, <strong>Nuxt.js</strong>, <strong>Next.js</strong> ile <strong>Frontend</strong> kodları yazıyorum.</li>
                <li><strong>Node.js</strong> ile <strong>Backend</strong> kodları yazıyorum.</li>
            </ul>

            <hr className={styles.Hr}/>

            <p><strong>🎯 Hedef Pozisyonlarım</strong></p>
            <ul>
                <li>Junior Frontend Developer <strong>(önceliğim)</strong></li>
                <li>Junior Full-Stack Developer</li>
                <li>Junior Backend Developer</li>
            </ul>

            <hr className={styles.Hr}/>

            <p><strong>🧭 Kariyer Hedefim</strong></p>
            <p><strong>GitHub</strong> hesabımda geliştirdiğim projelerim mevcuttur.</p>
            <p><strong>Hedef pozisyonlarımda</strong> çalışmak istiyorum.</p>
            <p><strong>GitHub</strong> hesabıma ulaşmak için{' '}<a href="https://github.com/BGNDGN?tab=repositories" target="_blank" rel="noopener noreferrer">tıklayınız!</a></p>

            <hr className={styles.Hr}/>

            <p><strong>🔧 Ekstra Bilgiler:</strong></p>
            <p>Ayrıca <strong>bireysel</strong>olarak öğrendiğim<strong>programlama dilleri</strong> şunlardır:</p>
                <ul>
                    <li>C</li>
                    <li>C#</li>
                    <li>PHP</li>
                </ul>
            <p>Bu dilleri <strong>online eğitimlerle</strong> ve <strong>okulda</strong> edindiğim bilgilerle öğrendim ve kendimi geliştirdim.</p>

            <hr className={styles.Hr}/>

        </div>
    );
}

export default React.memo(About);