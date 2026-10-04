import BackButton from "../components/BackButton/BackButton";

function LegalNotice() {
  return (
    <div>
      <BackButton />
      <h1>Impressum</h1>

      <p>
        Johannes Linnecke
        <br />
        Im Kleifeld 16
        <br />
        29389 Bad Bodenteich
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: 015165934150
        <br />
        E-Mail: jlinnecke@gmail.com
      </p>

      <p>
        Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a>
      </p>
    </div>
  );
}

export default LegalNotice;
