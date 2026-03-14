import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import classNames from 'classnames';

import styles from './App.module.scss';

import { Header } from './shared/components/Header';
import { Footer } from './shared/components/Footer';
import { Aside } from './shared/components/Aside';
import { Favorites } from './shared/components/Favorites';
import { Orders } from './shared/components/Orders';

export const App = () => {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);

  return (
    <>
      <Header
        isFavoritesOpen={isFavoritesOpen}
        isOrdersOpen={isOrdersOpen}
        setIsFavoritesOpen={setIsFavoritesOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main
        className={classNames(`${styles.main}`, {
          [styles.mainModified]: isFavoritesOpen,
        })}
      >
        <Outlet context={{ setIsOrdersOpen }} />
        <Orders isOrdersOpen={isOrdersOpen} setIsOrdersOpen={setIsOrdersOpen} />
        <Favorites
          isFavoritesOpen={isFavoritesOpen}
          setIsFavoritesOpen={setIsFavoritesOpen}
        />
      </main>
      <Aside
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Footer />
    </>
  );
};
