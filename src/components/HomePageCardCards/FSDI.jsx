import React from 'react';
import styles from'../../css/HomePageCardCards.module.css';

function FSDI() {
    const fullStackDeveloperIntern = [
        'Staj sürecime QA (Quality Assurance) ekibiyle başlayarak, yazılım test süreçleri, manuel test senaryoları ve hata tespiti üzerine deneyim kazandım.',
        'QA sürecinin ardından yazılım geliştirme ekibine geçiş yaparak, Nuxt.js ile frontend geliştirmelerine başladım.',
        'Nuxt.js projelerinde kullanıcı etkileşimleri, API çağrıları ve bileşen yönetimi gibi konularda kod geliştirdim.',
        'Frontend tarafında oluşturduğum buton etkileşimi aracılığıyla, backend tarafına HTTP isteği atan bir yapı kurdum.',
        'Backend tarafında Golang dilini kullanarak API endpointleri yazdım ve Nuxt.js frontend ile bu endpointleri entegre ettim.',
        'Backend kodlarımı test edebilmek için Mock yapılar oluşturarak Jest ve Golang test kütüphaneleri ile test senaryoları yazdım.',
        'API ile veri iletişimini yönetirken async/await ve hata yakalama (error handling) konularında uygulamalı deneyim edindim.',
        'Tüm bu süreç sonunda Nuxt.js + Golang teknolojilerini birlikte kullanarak çalışan bir proje geliştirdim.'
    ];

    return (
        <div className='fsdi'>
            <h3>Full-Stack Developer Intern</h3>
            <h4>Modanisa · Stajyer</h4>
            <h5>Mar 2024 - May 2024 · 3 ay</h5>
            <h5>Üsküdar, İstanbul, Türkiye · Hibrit</h5>
            <ul>
                {fullStackDeveloperIntern.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <hr className={styles.Hr}/>

        </div>
    );
}

export default React.memo(FSDI);
