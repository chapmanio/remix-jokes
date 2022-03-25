import { Link, LinksFunction } from 'remix';

import styles from '../styles/index.css';

// Remix
export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

// React
const Index = () => {
  return (
    <div className="container">
      <div className="content">
        <h1>
          Remix <span>Jokes!</span>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="jokes">Read Jokes</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Index;
