import { useEffect, useState } from 'react';
import './App.css';
import DotGrid from './component/DotGrid';
import Marquee from './component/Marquee';
import SmoothCursor from './component/SmoothCursor';
import TextType from './component/TextType';

// Memecah teks menjadi beberapa span agar setiap huruf bisa muncul bergantian.
function App() {
  // Menyimpan status tema: false berarti siang, true berarti malam.
  const [isNightMode, setIsNightMode] = useState(false);

  // Menampilkan frame dan teks ketika section mulai terlihat saat pengguna scroll.
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    // Class night-mode hanya ditambahkan ketika tema malam sedang aktif.
    <div className={`page${isNightMode ? ' night-mode' : ''}`}>
      {/* Cursor halus aktif di desktop dan otomatis nonaktif pada touch device. */}
      <SmoothCursor />

      {/* Efek cyber diletakkan di belakang agar tidak menghalangi konten utama. */}
      <div className="cyber-backdrop" aria-hidden="true">
        {/* DotGrid menjadi pola titik interaktif untuk memperkuat tema digital. */}
        <div className="dot-grid-background">
          <DotGrid
            dotSize={6}
            gap={24}
            baseColor="#111111"
            activeColor="#ff66a3"
            proximity={140}
            shockRadius={220}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </div>
      </div>

      {/* Struktur utama halaman personal: navbar, konten, lalu footer. */}
      <header className="site-header fixed inset-x-0 top-4 z-50">
        <a className="brand" href="#home" aria-label="Kembali ke halaman utama">
          Neha<span>.</span>
        </a>
        <nav className="site-nav" aria-label="Navigasi utama">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        {/* Toggle menjadi bagian dari bubble navbar dan mengubah tema halaman. */}
        <label className="theme-switch" aria-label={isNightMode ? 'Aktifkan tema siang' : 'Aktifkan tema malam'}>
          {/* Checkbox tersembunyi ini mengendalikan status tema siang/malam. */}
          <input
            className="theme-switch__checkbox"
            type="checkbox"
            checked={isNightMode}
            onChange={() => setIsNightMode((currentMode) => !currentMode)}
          />
          {/* CSS membuat visual matahari, bulan, awan, bintang, dan meteor. */}
          <span className="theme-switch__container">
            <span className="theme-switch__circle-container">
              <span className="theme-switch__sun-moon-container">
                <span className="theme-switch__moon">
                  <span className="theme-switch__spot"></span>
                  <span className="theme-switch__spot"></span>
                  <span className="theme-switch__spot"></span>
                </span>
              </span>
            </span>
            <span className="theme-switch__clouds"></span>
            <span className="theme-switch__stars-cluster">
              <span className="star"></span>
              <span className="star"></span>
              <span className="star"></span>
              <span className="star"></span>
              <span className="star"></span>
            </span>
            <span className="theme-switch__shooting-star"></span>
            <span className="theme-switch__shooting-star-2"></span>
            <span className="theme-switch__meteor"></span>
          </span>
        </label>
      </header>

      <main className="main-content">
        {/* HERO: isi nama, julukan, profesi, tagline, dan ganti tombol sesuai kebutuhan. */}
        <section className="hero hero-section reveal-on-scroll" id="home">
          <div className="hero-copy">
            <TextType as="p" className="eyebrow" text="PERSONAL WEBSITE / 2026" loop={false} startOnVisible showCursor={false} />
            <TextType as="h1" className="hero-title-type" text="Halo, saya Nama Kamu." typingSpeed={75} pauseDuration={1800} startOnVisible />
            <TextType as="p" className="hero-role text-reveal" text="Web Developer / UI Designer" loop={false} startOnVisible showCursor={false} />
            <TextType as="p" className="hero-description" text="Tulis tagline singkat yang menjelaskan keahlian dan nilai yang kamu tawarkan." loop={false} startOnVisible showCursor={false} />
            <div className="hero-actions">
              <a className="neo-button hero-button" href="#contact"><TextType as="span" text="Contact Me" loop={false} startOnVisible showCursor={false} /></a>
              <a className="neo-button secondary-button" href="/cv-kamu.pdf" download><TextType as="span" text="Download CV" loop={false} startOnVisible showCursor={false} /></a>
            </div>
          </div>
          {/* Foto dibaca dari folder public, jadi path-nya tidak memakai /public. */}
          <div className="hero-photo-frame">
            <img
              className="hero-photo"
              src="/tegar.jpeg"
              alt="Foto Tegar Imansyah"
            />
          </div>
        </section>

        {/* Marquee berada sebelum About; ganti data review di component/Marquee.jsx. */}
        <Marquee />

        {/* ABOUT: isi cerita singkat tentang latar belakang dan prinsip kerjamu. */}
        <section className="template-section about-section reveal-on-scroll" id="about">
          <div className="section-heading">
            <TextType as="p" className="eyebrow" text="01 / ABOUT ME" loop={false} startOnVisible showCursor={false} />
            <TextType as="h2" text="Tentang Saya" loop={false} startOnVisible showCursor={false} />
          </div>
          <div className="about-copy">
            <TextType as="p" text="Tulis ringkasan perjalanan karir, pendidikan, atau latar belakang akademismu di sini." loop={false} startOnVisible showCursor={false} />
            <TextType as="p" text="Ceritakan minat khususmu, filosofi kerja, dan cara kamu menyelesaikan masalah dalam proyek." loop={false} startOnVisible showCursor={false} />
          </div>
        </section>

        {/* SKILLS: ganti isi badge di bawah dengan teknologi yang benar-benar kamu kuasai. */}
        <section className="template-section reveal-on-scroll" id="skills">
          <div className="section-heading">
            <TextType as="p" className="eyebrow" text="02 / SKILLS" loop={false} startOnVisible showCursor={false} />
            <TextType as="h2" text="Skills & Tech Stack" loop={false} startOnVisible showCursor={false} />
          </div>
          <div className="skills-grid">
            <div className="skill-group"><TextType as="h3" text="Programming Languages" loop={false} startOnVisible showCursor={false} /><div className="badge-list"><span><TextType as="span" text="JavaScript" loop={false} startOnVisible showCursor={false} /></span><span><TextType as="span" text="Python" loop={false} startOnVisible showCursor={false} /></span><span><TextType as="span" text="HTML/CSS" loop={false} startOnVisible showCursor={false} /></span></div></div>
            <div className="skill-group"><TextType as="h3" text="Frameworks & Libraries" loop={false} startOnVisible showCursor={false} /><div className="badge-list"><span><TextType as="span" text="React" loop={false} startOnVisible showCursor={false} /></span><span><TextType as="span" text="Node.js" loop={false} startOnVisible showCursor={false} /></span><span><TextType as="span" text="Tailwind" loop={false} startOnVisible showCursor={false} /></span></div></div>
            <div className="skill-group"><TextType as="h3" text="Tools & Platforms" loop={false} startOnVisible showCursor={false} /><div className="badge-list"><span><TextType as="span" text="Git" loop={false} startOnVisible showCursor={false} /></span><span><TextType as="span" text="VS Code" loop={false} startOnVisible showCursor={false} /></span><span><TextType as="span" text="Figma" loop={false} startOnVisible showCursor={false} /></span></div></div>
          </div>
        </section>

        {/* PROJECTS: duplikasi project-card untuk menambahkan karya lain. */}
        <section className="template-section reveal-on-scroll" id="projects">
          <div className="section-heading"><TextType as="p" className="eyebrow" text="03 / SELECTED WORK" loop={false} startOnVisible showCursor={false} /><TextType as="h2" text="Projects & Portfolio" loop={false} startOnVisible showCursor={false} /></div>
          <div className="projects-grid">
            <article className="project-card"><TextType as="p" className="project-number" text="PROJECT / 01" loop={false} startOnVisible showCursor={false} /><TextType as="h3" text="Nama Proyek Pertama" loop={false} startOnVisible showCursor={false} /><TextType as="p" text="Jelaskan masalah yang diselesaikan, fitur utama, dan hasil proyek ini." loop={false} startOnVisible showCursor={false} /><div className="badge-list"><span><TextType as="span" text="React" loop={false} startOnVisible showCursor={false} /></span><span><TextType as="span" text="CSS" loop={false} startOnVisible showCursor={false} /></span></div><div className="project-links"><a href="https://example.com" target="_blank" rel="noreferrer"><TextType as="span" text="Live Demo" loop={false} startOnVisible showCursor={false} /></a><a href="https://github.com" target="_blank" rel="noreferrer"><TextType as="span" text="Source Code" loop={false} startOnVisible showCursor={false} /></a></div></article>
            <article className="project-card"><TextType as="p" className="project-number" text="PROJECT / 02" loop={false} startOnVisible showCursor={false} /><TextType as="h3" text="Nama Proyek Kedua" loop={false} startOnVisible showCursor={false} /><TextType as="p" text="Tambahkan deskripsi singkat dan teknologi yang digunakan di sini." loop={false} startOnVisible showCursor={false} /><div className="badge-list"><span><TextType as="span" text="JavaScript" loop={false} startOnVisible showCursor={false} /></span><span><TextType as="span" text="Node.js" loop={false} startOnVisible showCursor={false} /></span></div><div className="project-links"><a href="https://example.com" target="_blank" rel="noreferrer"><TextType as="span" text="Live Demo" loop={false} startOnVisible showCursor={false} /></a><a href="https://github.com" target="_blank" rel="noreferrer"><TextType as="span" text="Source Code" loop={false} startOnVisible showCursor={false} /></a></div></article>
            <article className="project-card"><TextType as="p" className="project-number" text="PROJECT / 03" loop={false} startOnVisible showCursor={false} /><TextType as="h3" text="Nama Proyek Ketiga" loop={false} startOnVisible showCursor={false} /><TextType as="p" text="Fokuskan proyek pada karya terbaik dan paling relevan dengan tujuanmu." loop={false} startOnVisible showCursor={false} /><div className="badge-list"><span><TextType as="span" text="Figma" loop={false} startOnVisible showCursor={false} /></span><span><TextType as="span" text="UI/UX" loop={false} startOnVisible showCursor={false} /></span></div><div className="project-links"><a href="https://example.com" target="_blank" rel="noreferrer"><TextType as="span" text="Live Demo" loop={false} startOnVisible showCursor={false} /></a><a href="https://github.com" target="_blank" rel="noreferrer"><TextType as="span" text="Source Code" loop={false} startOnVisible showCursor={false} /></a></div></article>
          </div>
        </section>

        {/* EXPERIENCE: isi item timeline dengan pengalaman, pendidikan, dan sertifikasi. */}
        <section className="template-section reveal-on-scroll" id="experience">
          <div className="section-heading"><TextType as="p" className="eyebrow" text="04 / JOURNEY" loop={false} startOnVisible showCursor={false} /><TextType as="h2" text="Experience & Education" loop={false} startOnVisible showCursor={false} /></div>
          <div className="timeline">
            <article className="timeline-item"><TextType as="span" text="2024 - SEKARANG" loop={false} startOnVisible showCursor={false} /><div><TextType as="h3" text="Posisi / Peran Kamu" loop={false} startOnVisible showCursor={false} /><TextType as="p" text="Nama perusahaan atau organisasi" loop={false} startOnVisible showCursor={false} /><TextType as="p" text="Tambahkan pencapaian utama dan tanggung jawabmu." loop={false} startOnVisible showCursor={false} /></div></article>
            <article className="timeline-item"><TextType as="span" text="2020 - 2024" loop={false} startOnVisible showCursor={false} /><div><TextType as="h3" text="Nama Universitas / Sekolah" loop={false} startOnVisible showCursor={false} /><TextType as="p" text="Jurusan dan gelar pendidikan" loop={false} startOnVisible showCursor={false} /><TextType as="p" text="Tambahkan sertifikasi atau pelatihan yang relevan." loop={false} startOnVisible showCursor={false} /></div></article>
          </div>
        </section>

        {/* CONTACT: form ini siap dikembangkan ke layanan email atau backend. */}
        <section className="contact-card reveal-on-scroll" id="contact">
          <div><TextType as="p" className="eyebrow" text="05 / LET'S CONNECT" loop={false} startOnVisible showCursor={false} /><TextType as="h2" text="Mari bekerja sama." loop={false} startOnVisible showCursor={false} /><TextType as="p" text="Isi kontak dan media sosialmu agar pengunjung mudah menghubungimu." loop={false} startOnVisible showCursor={false} /><div className="contact-links"><a href="mailto:hello@example.com"><TextType as="span" text="Email" loop={false} startOnVisible showCursor={false} /></a><a href="https://github.com" target="_blank" rel="noreferrer"><TextType as="span" text="GitHub" loop={false} startOnVisible showCursor={false} /></a><a href="https://linkedin.com" target="_blank" rel="noreferrer"><TextType as="span" text="LinkedIn" loop={false} startOnVisible showCursor={false} /></a></div></div>
          <form className="contact-form"><input type="text" placeholder="Nama kamu" aria-label="Nama kamu" /><input type="email" placeholder="Email kamu" aria-label="Email kamu" /><textarea placeholder="Pesan kamu" aria-label="Pesan kamu" rows="4"></textarea><button className="neo-button" type="submit">Kirim Pesan</button></form>
        </section>
      </main>

      <footer className="site-footer">
        <TextType as="p" text="© 2026 Nama Kamu. Dibuat dengan React." loop={false} startOnVisible showCursor={false} />
        <div className="footer-links">
          <a href="https://github.com" target="_blank" rel="noreferrer"><TextType as="span" text="GitHub" loop={false} startOnVisible showCursor={false} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><TextType as="span" text="LinkedIn" loop={false} startOnVisible showCursor={false} /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
