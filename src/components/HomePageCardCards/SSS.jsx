import React from 'react';
import styles from'../../css/HomePageCardCards.module.css';

function SSS() {
    const softwareSupportSpecialist = [
        'Frontend ve Backend Developer ekipleriyle çalışarak yazılım geliştirme süreçlerinde rol aldım.',
        'Jira üzerinde tanımlanan görevleri analiz edip, geliştiricilerin izlemesi gereken adımları planladım ve yazılım geliştirme senaryoları oluşturdum.',
        'Gerekli durumlarda Postman ile API endpointlerine istek atarak APIlerin düzgün çalışıp çalışmadığını test ettim.',
        'SQL kullanarak veritabanı sorguları yazma ve sistemden veri çekme işlemlerini gerçekleştirdim.',
        'Kiosk (ödeme noktası) cihazlarının yazılımsal güncellemelerini yaptım ve yazılımla ilgili oluşan hataları tespit edip çözüme kavuşturdum.',
        'Otopark bariyer sistemlerindeki loop yapısını ve plaka okuma kameralarının doğruluğunu kontrol ederek log analizi ve hata ayıklama gerçekleştirdim.',
        'Kiosk cihazlarında ödeme loglarını analiz ederek sistemsel hataları belirledim.',
        'Gerektiğinde cihaz yazılımlarını inceleyerek teknik müdahalelerde bulundum ve problemleri çözdüm.',
        'Plaka tanıma sistemlerinde blur alan ayarlama, okuma çizgisi düzenleme gibi optimizasyonlar yaptım.'
    ];

    return (
        <div className={styles.sss}>
            <h3>Software Support Specialist</h3>
            <h4>CondoLife | Tam zamanlı</h4>
            <h5>Şub 2025 - Haz 2025 · 5 ay</h5>
            <h5>Beykoz, İstanbul, Türkiye · Hibrit</h5>
            <ul>
                {softwareSupportSpecialist.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
                
            </ul>

            <hr className={styles.Hr}/>

        </div>
    );
}

export default React.memo(SSS);
