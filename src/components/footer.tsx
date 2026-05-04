import React from 'react';
import '../styles/footer.css';
import { FaGithub, FaDiscord, FaInstagram, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
        
        <ul className="footer-links">
            <li className="item"><a href="https://github.com/amechanos/slugterra"><FaGithub/></a></li>
            <li className="item"><a href="https://discord.gg/E46X78Wd8k"><FaDiscord/></a></li>
            <li className="item"><a href="https://instagram.com/jhxu_07"><FaInstagram/></a></li>
            <li className="item"><a href="https://youtube.com/@jhxu"><FaYoutube/></a></li>
        </ul>

        <hr className="footer-divider" />

        <div className="footer-content">
          <p className="copyright">
            © <a href="https://amechanos.github.io">jhxu</a> {currentYear}
          </p>
          <div className="disclaimers">
            <span>This fanmade production is not official or endorsed by Slugterra.</span>
            <span>Slugterra is property of Wildbrain / DHX Media / Nerdcorps.</span>
          </div>
        </div>

    </footer>
  );
}