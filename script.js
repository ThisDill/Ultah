const texts = {
  page1: "Selamat HBD ayanggg 😚❤️ Semoga di umur ta sekarang, bisaki jadi pribadi yang lebih baik, lebih penyayang, lebih sabar, dan dilancarkan rezekinya. Semoga selalu disayang banyak orang dan dikelilingi orang-orang baik. Semoga kesehatan selalu dijaga, pikiranta selalu tenang, dan senyumnya tidak pernah pudar. Semoga apa pun yang kita jalani hari ini dan ke depannya selalu diberi kemudahan dan kelancaran.",

  page2: "Dijauhkan dari hal-hal yang bikin sakit hati, dari orang-orang yang niatnya kurang baik, dan dari pikiran-pikiran yang bikin capek sendiri. Apa yang kita impikan semoga pelan-pelanki tercapai satu per satu, walaupun prosesnya tidak selalu mudah. Kalau ada masalah besar atau hari berat, semoga selalu ada jalan keluarnya dan selalu diberi kekuatan untuk bertahan. Semoga ayang selalu bisa bangkit walaupun lagi capek dan lelah.",

  page3: "Semoga sama-sama ki belajar jadi lebih dewasa, saling mengerti dalam keadaan apa pun, saling jaga perasaan, dan saling menguatkan satu sama lain. Semoga kita bisa tumbuh jadi pribadi yang lebih baik ke depannya, lebih sabar, lebih dewasa, dan lebih saling percaya. Semoga kebahagiaan selalu ikut di setiap langkahta, di setiap doa-doata, dan di setiap rencana yang kita jalani. Lopyuuuuuuuuu 😚❤️"
};





// Variabel global
let currentPage = 'main';
const pages = ['mainPage', 'page1', 'page2', 'page3'];
let typingSpeed = 60; // Lebih lambat (sebelumnya 30ms, sekarang 60ms)

// Deteksi device mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
if (isMobile) {
    typingSpeed = 50; // Lebih lambat di mobile (sebelumnya 25ms, sekarang 50ms)
}

// Fungsi untuk mengetik text secara animasi
function typeText(element, text, callback) {
    let index = 0;
    element.textContent = '';
    
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
            if (callback) callback();
        }
    }, typingSpeed);
}

// Fungsi untuk mengganti halaman
function switchPage(fromPage, toPage) {
    const from = document.getElementById(fromPage);
    const to = document.getElementById(toPage);
    
    from.style.opacity = '0';
    
    setTimeout(() => {
        from.classList.remove('active');
        to.classList.add('active');
        
        setTimeout(() => {
            to.style.opacity = '1';
        }, 50);
    }, 800);
}

// Fungsi untuk membuat hearts animation
function createHearts() {
    const heartsContainer = document.querySelectorAll('.hearts-bg');
    
    heartsContainer.forEach(container => {
        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 2 + 1 + 'rem';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '-10%';
            heart.style.opacity = '0.3';
            heart.style.animation = `float ${15 + Math.random() * 10}s infinite`;
            heart.style.animationDelay = Math.random() * 5 + 's';
            container.appendChild(heart);
        }
    });
}

// Fungsi untuk memutar musik
function playMusic() {
    const audio = document.getElementById('bgMusic');
    
    console.log('🎵 Mencoba play musik...');
    console.log('📁 Audio src:', audio.src);
    console.log('⏱️ Audio duration:', audio.duration);
    console.log('🔊 Audio volume:', audio.volume);
    
    // Reset audio ke awal
    audio.currentTime = 0;
    audio.volume = 0.5;
    
    // Force play
    audio.play()
        .then(() => {
            console.log('✅✅✅ MUSIK BERHASIL DIPUTAR!');
            console.log('🔊 Volume:', audio.volume);
            console.log('⏯️ Paused:', audio.paused);
        })
        .catch(error => {
            console.error('❌❌❌ ERROR PLAY MUSIK:', error);
            console.log('📍 Error name:', error.name);
            console.log('📍 Error message:', error.message);
            
            // Coba lagi dengan user interaction
            alert('Musik gagal play otomatis. Klik OK untuk mencoba lagi.');
            audio.play()
                .then(() => console.log('✅ Musik play setelah alert'))
                .catch(e => console.error('❌ Masih gagal:', e));
        });
}

// Fungsi untuk cek apakah audio sudah dimuat
function checkAudioReady() {
    const audio = document.getElementById('bgMusic');
    
    console.log('🔍 Checking audio element...');
    console.log('📁 Audio element:', audio);
    console.log('📍 Audio src:', audio.currentSrc || audio.src);
    
    audio.addEventListener('canplaythrough', () => {
        console.log('✅ Audio siap diputar (canplaythrough)');
        console.log('⏱️ Duration:', audio.duration);
    });
    
    audio.addEventListener('error', (e) => {
        console.error('❌ ERROR LOADING AUDIO!');
        console.log('📍 Error:', e);
        console.log('📍 Audio error code:', audio.error?.code);
        console.log('📍 Audio error message:', audio.error?.message);
        console.log('');
        console.log('🚨 SOLUSI:');
        console.log('1. Pastikan file music.mp3 ada di folder yang sama dengan index.html');
        console.log('2. Cek nama file persis: music.mp3 (huruf kecil)');
        console.log('3. Coba buka music.mp3 langsung di browser');
    });
    
    audio.addEventListener('loadeddata', () => {
        console.log('✅ Audio data loaded');
    });
    
    audio.addEventListener('loadedmetadata', () => {
        console.log('✅ Audio metadata loaded');
        console.log('⏱️ Duration:', audio.duration, 'seconds');
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    createHearts();
    checkAudioReady();
    
    // Tombol Start
    document.getElementById('startBtn').addEventListener('click', () => {
        console.log('🎵 Tombol Mulai diklik, mencoba play musik...');
        playMusic();
        
        switchPage('mainPage', 'page1');
        currentPage = 'page1';
        
        setTimeout(() => {
            const textElement = document.getElementById('text1');
            typeText(textElement, texts.page1, () => {
                document.getElementById('next1').classList.remove('hidden');
            });
        }, 1000);
    });
    
    // Tombol Next 1
    document.getElementById('next1').addEventListener('click', () => {
        switchPage('page1', 'page2');
        currentPage = 'page2';
        
        setTimeout(() => {
            const textElement = document.getElementById('text2');
            typeText(textElement, texts.page2, () => {
                document.getElementById('next2').classList.remove('hidden');
            });
        }, 1000);
    });
    
    // Tombol Next 2
    document.getElementById('next2').addEventListener('click', () => {
        switchPage('page2', 'page3');
        currentPage = 'page3';
        
        setTimeout(() => {
            const textElement = document.getElementById('text3');
            typeText(textElement, texts.page3);
        }, 1000);
    });
    
    // Tombol Restart - Kembali ke Awal
    document.getElementById('restartBtn').addEventListener('click', () => {
        // Reset semua text
        document.getElementById('text1').textContent = '';
        document.getElementById('text2').textContent = '';
        document.getElementById('text3').textContent = '';
        
        // Sembunyikan tombol next
        document.getElementById('next1').classList.add('hidden');
        document.getElementById('next2').classList.add('hidden');
        
        // Kembali ke halaman utama
        switchPage('page3', 'mainPage');
        currentPage = 'main';
    });
});

// Coba autoplay musik saat halaman dimuat (biasanya diblokir browser)
window.addEventListener('load', () => {
    console.log('📱 Halaman dimuat');
    console.log('ℹ️ Klik tombol "Mulai" untuk memutar musik');
});