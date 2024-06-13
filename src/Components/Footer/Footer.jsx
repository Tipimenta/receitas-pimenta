import github from "../../assets/img/GitHub.svg";
import linkedin from "../../assets/img/LinkedIn.svg";
import email from "../../assets/img/Email.svg";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="link-social">
        <ul className="conteudo-footer">
          <li>
            <a href="https://github.com/Tipimenta" target="_black">
              <img src={github} className="social" alt="logo-gitHub" />
              github.com/Tipimenta
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/tipimenta/" target="_black">
              <img src={linkedin} className="social" alt="logo-gitHub" />
              linkedin.com/in/tipimenta
            </a>
          </li>
          <li>
            <a href="mailto:tiagopimenta.ata@gmail.com">
              <img
                src={email}
                className="social"
                alt="logo-gitHub"
                target="_black"
              /> tiagopimenta.ata@gmail.com
            </a>
          </li>
        </ul>
        <p>Receitas Pimenta© 2024 | All rights reserved</p>
      </div>
    </div>
  );
}

export default Footer;
