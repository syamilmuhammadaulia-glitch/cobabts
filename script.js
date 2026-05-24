// Daftar seluruh gambar (45 Spread)
const images = [
  "1-1ACover BTSR copy.jpg",
  "1-2 Skiblat copy.jpg",
  "3-4 Semboyan & Logo copy.jpg",
  "5-6 Kepsek & Teacher copy.jpg",
  "7-8 Teacher copy.jpg",
  "9-10 Teacher copy.jpg",
  "11-12 Gedung Sekolah copy.jpg",
  "13-14 kelas 9A1 copy.jpg",
  "15-16 kelas 9A1 copy.jpg",
  "17-18 kelas 9A1 copy.jpg",
  "19-20 kelas 9A1 copy.jpg",
  "21-22 kelas 9A1 copy.jpg",
  "23-24 kelas 9A2 copy.jpg",
  "25-26 kelas 9A2 copy.jpg",
  "27-28 kelas 9A2 copy.jpg",
  "29-30 kelas 9A2 copy.jpg",
  "31-32 kelas 9A2 copy.jpg",
  "33-34 kelas 9B1 copy.jpg",
  "35-36 kelas 9B1 copy.jpg",
  "37-38 kelas 9B1 copy.jpg",
  "39-40 kelas 9B1 copy.jpg",
  "41-42 kelas 9B1 copy.jpg",
  "43-44 kelas 9B2 copy.jpg",
  "45-46 kelas 9B2 copy.jpg",
  "47-48 kelas 9B2 copy.jpg",
  "49-50 kelas 9B2 copy.jpg",
  "51-52 kelas 9B2 copy.jpg",
  "53-54 Class of 9A1&A2 copy.jpg",
  "55-56 Class of 9B1&B2 copy.jpg",
  "57-58 Group copy.jpg",
  "59-60 Group copy.jpg",
  "61-62 Group copy.jpg",
  "63-64 Group copy.jpg",
  "65-66 ESKUL copy.jpg",
  "67-68 ESKUL copy.jpg",
  "69-70 ESKUL copy.jpg",
  "71-72 Seragam copy.jpg",
  "73-74 Kegiatan copy.jpg",
  "75-76 Kegiatan copy.jpg",
  "77-78 Kegiatan copy.jpg",
  "79-80 Kegiatan copy.jpg",
  "81-82 Kegiatan copy.jpg",
  "83-84 Foto Kegiatan & Panitia BTSR copy.jpg",
  "85-86 Foto Angkatan copy.jpg",
  "87-88 skiblat belakangR copy.jpg"
];

const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const bookElement = document.querySelector("#book");
const pageCounter = document.querySelector("#page-counter");
const bookShifter = document.querySelector("#book-shifter");

const pagesData = [];

// Cover Depan - Kembalikan ke format setengah (bagian kanan dari gambar spread)
pagesData.push({ img: images[0], pos: "right" }); 

for (let i = 1; i < images.length; i++) {
    pagesData.push({ img: images[i], pos: "left" });  
    pagesData.push({ img: images[i], pos: "right" }); 
}

// Cover Belakang - Setengah (bagian kiri dari gambar spread pertama)
pagesData.push({ img: images[0], pos: "left" }); 

pagesData.forEach((data, index) => {
    const pageDiv = document.createElement("div");
    pageDiv.classList.add("my-page");
    
    if (index === 0 || index === pagesData.length - 1) {
        pageDiv.setAttribute("data-density", "hard");
    }

    const encodedImg = encodeURI(data.img).replace(/'/g, "%27");
    pageDiv.innerHTML = `
        <div class="page-content" style="background-image: url('${encodedImg}'); background-position: ${data.pos} center;"></div>
    `;
    bookElement.appendChild(pageDiv);
});

// Logika pemusatan buku secara dinamis (tanpa mengubah koordinat X pada tombol langsung)
function centerBook(pageIndex) {
    if (pageIndex === 0) {
        // Halaman cover depan
        bookShifter.classList.add("front-cover");
        bookShifter.classList.remove("back-cover");
    } else if (pageIndex >= pagesData.length - 2 && pageIndex !== 0) {
        // Halaman cover belakang
        bookShifter.classList.add("back-cover");
        bookShifter.classList.remove("front-cover");
    } else {
        // Mode Spread (Dua Halaman)
        bookShifter.classList.remove("front-cover");
        bookShifter.classList.remove("back-cover");
    }
}

// Deteksi global variable StPageFlip
const PageFlipClass = (typeof St !== "undefined" && St.PageFlip) ? St.PageFlip : 
                     (typeof StPageFlip !== "undefined" ? StPageFlip.PageFlip : null);

if (!PageFlipClass) {
    console.error("Library StPageFlip gagal dimuat!");
} else {
    const pageFlip = new PageFlipClass(bookElement, {
        width: 400, // Basis rasio halaman
        height: 565,
        size: "fixed", // Kembali ke fixed mode
        minWidth: 400,
        maxWidth: 1000,
        minHeight: 200,
        maxHeight: 1500,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false,
        usePortrait: false
    });

    pageFlip.loadFromHTML(document.querySelectorAll('.my-page'));

    pageFlip.on('flip', (e) => {
        updateCounter(e.data);
        centerBook(e.data);
    });

    function updateCounter(pageIndex) {
        if (pageIndex === 0) {
            pageCounter.textContent = "Cover Depan";
        } else if (pageIndex >= pagesData.length - 2 && pageIndex !== 0) { 
            pageCounter.textContent = "Cover Belakang";
        } else {
            let leftPage = pageIndex;
            if (leftPage % 2 === 0) leftPage--; 
            let rightPage = leftPage + 1;
            pageCounter.textContent = `Halaman ${leftPage} - ${rightPage}`;
        }
    }

    nextBtn.addEventListener("click", () => {
        pageFlip.flipNext();
    });

    prevBtn.addEventListener("click", () => {
        pageFlip.flipPrev();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === "ArrowRight") pageFlip.flipNext();
        if (e.key === "ArrowLeft") pageFlip.flipPrev();
    });

    // Panggilan inisial
    centerBook(0);
}

// =========================================================
// INTRO ANIMATION & MUSIC SELECTION
// =========================================================
const introScreen = document.getElementById("intro-screen");
const appContainer = document.querySelector(".app-container");
const bgMusic = document.getElementById("bg-music");
bgMusic.volume = 0.5;

// Generate Magical Dust Particles
const particlesContainer = document.getElementById("particles");
for (let i = 0; i < 40; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    
    // Randomize position, size, and animation delay
    const size = Math.random() * 4 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}vw`;
    
    // Randomize animation duration and delay
    const floatDuration = Math.random() * 10 + 5;
    const floatDelay = Math.random() * 5;
    const twinkleDuration = Math.random() * 2 + 1;
    
    particle.style.animation = `floatUp ${floatDuration}s ${floatDelay}s infinite linear, twinkle ${twinkleDuration}s infinite ease-in-out`;
    
    particlesContainer.appendChild(particle);
}

const logo = document.getElementById("intro-logo");
const text1 = document.getElementById("text-1");
const text2 = document.getElementById("text-2");
const text3 = document.getElementById("text-3");
const musicSelection = document.getElementById("music-selection");
const musicCards = document.querySelectorAll("#music-selection .music-card");

// Animasi berurutan yang sangat dramatis
setTimeout(() => {
    // 1. Tampilkan Logo Terlebih Dahulu
    logo.style.display = "block";
    setTimeout(() => {
        logo.classList.add("visible");
    }, 100);

    // 2. Tahan logo sebentar, lalu fade out dan pindah ke Teks
    setTimeout(() => {
        logo.classList.remove("visible");
        logo.classList.add("fade-out");
        
        setTimeout(() => {
            logo.style.display = "none";
            
            // 3. Tampilkan Teks 1
            text1.style.display = "block";
            setTimeout(() => {
                text1.classList.add("visible");
            }, 50);
            
            // Sembunyikan Teks 1
            setTimeout(() => {
                text1.classList.remove("visible");
                text1.classList.add("fade-out");
                
                setTimeout(() => {
                    text1.style.display = "none";
                    
                    // Tampilkan Teks 2
                    text2.style.display = "block";
                    setTimeout(() => {
                        text2.classList.add("visible");
                    }, 50);
                    
                    // Sembunyikan Teks 2
                    setTimeout(() => {
                        text2.classList.remove("visible");
                        text2.classList.add("fade-out");
                        
                        setTimeout(() => {
                            text2.style.display = "none";
                            
                            // Tampilkan Teks 3 (The Rhapsodia)
                            text3.style.display = "block";
                            setTimeout(() => {
                                text3.classList.add("visible");
                            }, 50);
                            
                            // Sembunyikan Teks 3
                            setTimeout(() => {
                                text3.classList.remove("visible");
                                text3.classList.add("fade-out");
                                
                                setTimeout(() => {
                                    text3.style.display = "none";
                                    
                                    // Tampilkan Pemilihan Musik setelah semua teks bersih
                                    musicSelection.style.display = "block";
                                    setTimeout(() => {
                                        musicSelection.classList.add("visible");
                                    }, 50);
                                    
                                }, 1500); // Waktu fade out teks 3
                            }, 3500); // Waktu teks 3 tayang
                            
                        }, 1500); // Waktu fade out teks 2
                    }, 3000); // Durasi Teks 2 tayang
                }, 1500); // Waktu fade out teks 1
            }, 3000); // Durasi Teks 1 tayang
        }, 1500); // Waktu fade out logo
    }, 4000); // Waktu logo tayang di layar
}, 500); // Delay awal

// DOM Elements tambahan untuk Mode Selection
const modeSelection = document.getElementById("mode-selection");
const modeEbookBtn = document.getElementById("mode-ebook");
const modeGalleryBtn = document.getElementById("mode-gallery");
const galleryContainer = document.getElementById("gallery-container");
const galleryGrid = document.getElementById("gallery-grid");
const backToGalleryBtn = document.getElementById("back-to-gallery-btn");

let isGalleryGenerated = false;

// Event handler saat lagu dipilih
musicCards.forEach(card => {
    card.addEventListener("click", () => {
        // Ambil URL lagu
        const src = card.getAttribute("data-src");
        bgMusic.src = src;
        
        // Putar lagu
        bgMusic.play().catch(error => {
            console.error("Browser memblokir autoplay:", error);
        });
        
        // Sembunyikan music selection
        musicSelection.style.opacity = "0";
        setTimeout(() => {
            musicSelection.style.display = "none";
            
            // Tampilkan mode selection
            modeSelection.style.display = "block";
            setTimeout(() => {
                modeSelection.classList.add("visible");
            }, 50);
        }, 1000);
    });
});

// Pilih Mode E-Book
modeEbookBtn.addEventListener("click", () => {
    // Fade out Intro Screen
    introScreen.style.opacity = "0";
    introScreen.style.visibility = "hidden";
    
    setTimeout(() => {
        introScreen.style.display = "none";
        
        // Fade in Buku Tahunan
        appContainer.style.opacity = "1";
        appContainer.style.pointerEvents = "auto";
        // Sembunyikan tombol kembali jika masuk dari awal
        backToGalleryBtn.style.display = "none"; 
    }, 1500);
});

// Pilih Mode Galeri
modeGalleryBtn.addEventListener("click", () => {
    // Generate galeri jika belum
    if (!isGalleryGenerated) {
        generateGallery();
    }

    // Fade out Intro Screen
    introScreen.style.opacity = "0";
    introScreen.style.visibility = "hidden";
    
    setTimeout(() => {
        introScreen.style.display = "none";
        
        // Fade in Galeri
        galleryContainer.style.opacity = "1";
        galleryContainer.style.pointerEvents = "auto";
    }, 1500);
});

// Fungsi untuk membuat Grid Galeri
function generateGallery() {
    // Ingat bahwa pagesData berisi: { img: "url", type: "full" } atau { img: "url", pos: "left"/"right" }
    // Untuk kemudahan di galeri, kita tampilkan gambar aslinya saja (1 gambar per file)
    images.forEach((imgUrl, index) => {
        const img = document.createElement("img");
        // Encode URL agar aman
        img.src = encodeURI(imgUrl).replace(/'/g, "%27");
        img.className = "gallery-item";
        // Tambahkan lazy loading agar tidak lag
        img.loading = "lazy";
        // Dekode gambar di background thread (PENTING untuk file 10MB+)
        img.decoding = "async";
        
        // Saat diklik, tampilkan Pop-up Lightbox!
        img.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            const lightbox = document.getElementById("gallery-lightbox");
            const lightboxImg = document.getElementById("lightbox-img");
            
            if (lightbox && lightboxImg) {
                lightboxImg.src = this.src;
                lightbox.classList.add("visible");
                lightbox.style.opacity = "1";
                lightbox.style.pointerEvents = "auto";
            }
        };
        
        galleryGrid.appendChild(img);
    });
    
    isGalleryGenerated = true;
}

// Tutup Lightbox saat tombol X diklik ATAU saat background hitam diklik
const lightboxElem = document.getElementById("gallery-lightbox");
if (lightboxElem) {
    lightboxElem.onclick = function(e) {
        // Tutup jika yang diklik adalah background (id gallery-lightbox) atau tombol close
        if (e.target.id === "gallery-lightbox" || (e.target.className && e.target.className.includes("close-lightbox"))) {
            this.classList.remove("visible");
            this.style.opacity = "0";
            this.style.pointerEvents = "none";
        }
    };
}

// Tombol Kembali ke Galeri dari dalam E-Book
backToGalleryBtn.addEventListener("click", () => {
    // Sembunyikan buku
    appContainer.style.opacity = "0";
    appContainer.style.pointerEvents = "none";
    
    setTimeout(() => {
        // Tampilkan galeri lagi
        galleryContainer.style.opacity = "1";
        galleryContainer.style.pointerEvents = "auto";
    }, 1000);
});

// ==========================================
// DYNAMIC BOOK SCALING
// ==========================================
function updateBookScale() {
    const container = document.querySelector('.book-container');
    if (!container) return;
    
    // Dimensi asli buku (saat terbuka = 800x565)
    const bookWidth = 800;
    const bookHeight = 565;
    
    // Ukuran layar
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Ruang yang tersedia (dikurangi ruang navigasi / margin)
    const availableWidth = windowWidth - 120; // Sisa margin samping
    const availableHeight = windowHeight - 80; // Sisa margin atas bawah
    
    // Hitung persentase skala yang dibutuhkan pada kedua sumbu
    const scaleWidth = availableWidth / bookWidth;
    const scaleHeight = availableHeight / bookHeight;
    
    // Ambil nilai terkecil agar buku muat sempurna di layar mana pun tanpa terpotong!
    const scale = Math.min(1, scaleWidth, scaleHeight);
    
    // Update variable CSS
    container.style.setProperty('--book-scale', scale);
}

window.addEventListener('resize', updateBookScale);
updateBookScale();
