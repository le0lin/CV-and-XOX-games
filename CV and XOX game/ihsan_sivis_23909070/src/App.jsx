import React, { useState } from "react";
import "./App.css";
import logo from './assets/aaa.jpg';
import TicTacToe from './xox';
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

function App() {
  const [showCV, setShowCV] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [showStartScreen, setShowStartScreen] = useState(true);

  // Başlangıç ekranını gizleme
  const hideStartScreen = () => {
    setShowStartScreen(false);
  };

  // CV'yi gösterme
  const showCVPage = () => {
    setShowCV(true);
    setShowGame(false);
    hideStartScreen();
  };

  // XOX oyununu gösterme
  const showGamePage = () => {
    setShowGame(true);
    setShowCV(false);
    hideStartScreen();
  };

  // Geri dönme fonksiyonları
  const backToStart = () => {
    setShowStartScreen(true);
    setShowCV(false);
    setShowGame(false);
  };

  return (
    <div className="App">
      {/* Başlangıç Ekranı */}
      <div className={`start-screen ${!showStartScreen ? "hide" : ""}`}>
        <h1>Hoşgeldiniz!</h1>
        <button onClick={showCVPage}>CV'yi Görüntüle</button>
        <button onClick={showGamePage}>XOX Oyunu Oyna</button>
      </div>

      {/* İçerik bölümleri */}
      <div className="content">
        {/* CV Bölümü */}
        <section className={`cv-section ${showCV ? "show" : ""}`}>
          <h2>Kişisel Bilgiler</h2>
          <p><strong>Ad:</strong> İhsan</p>
          <p><strong>Soyad:</strong> Siviş</p>
          <p><strong>İletişim:</strong> ihsansivis2004@gmail.com</p>
          <div className="profile-photo">
            <img src={logo} alt="Profil Fotoğrafı" />
          </div>

          <section className="education">
            <h3>Eğitim Bilgileri</h3>
            <p><strong>Üniversite:</strong> Kapadokya Üniversitesi</p>
            <p><strong>Bölüm:</strong> Bilgisayar Programcılığı</p>
            <p><strong>Mezuniyet Yılı:</strong> 2025</p>
          </section>

          <section className="experience">
            <h3>İş Deneyimi</h3>
            <p>Geçmiş bir iş kariyerim bulunmamakta</p>
          </section>

          <section className="skills">
            <h3>Yetenekler</h3>
            <ul>
              <li>Html, Css, JavaScript, Scss, React</li>
              <li>Python, C#, PHP</li>
              <li>MySQL</li>
            </ul>
          </section>

          <section className="hobbies">
            <h3>Hobiler ve İlgi Alanları</h3>
            <p>Yazılım geliştirme</p>
            <p>Bilgisayar Oyunları</p>
            <p>Film izlemek</p>
          </section>

          <section className="social-media">
            <h3>Sosyal Medya</h3>
            <a href="https://www.linkedin.com/in/ihsan-sivi%C5%9F-a298a5295" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={30} />
            </a>
            <a href="https://github.com/le0lin" target="_blank" rel="noopener noreferrer">
              <FaGithub size={30} />
            </a>
            <a href="https://www.instagram.com/ihsansiviss/" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} />
            </a>
          </section>

          <button className="back-button" onClick={backToStart}>Ana Menüye Dön</button>
        </section>

        {/* XOX Oyunu Bölümü */}
        <section className={`game-section ${showGame ? "show" : ""}`}>
          <h2 className="game-title">XOX Oyunu</h2>
          <TicTacToe />
          <button className="back-button" onClick={backToStart}>Ana Menüye Dön</button>
        </section>
      </div>
    </div>
  );
}

export default App;
