import React from 'react';
import './footer.scss';

const Footer: React.FC = (): JSX.Element => (
  <div className="footer__wrapper">
    <a className="footer__link" href="https://github.com/SergBily" target="_blank" rel="noreferrer">GitHub</a>
    <p className="footer__text">Sergey Belyavsky</p>
  </div>
);

export default Footer;
