import { SigInButton } from "../SignInButton";
import { ActiveLink } from "../ActiveLink";

import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="logo ig.news" />
        <nav>
          <ActiveLink activeCalssName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          <ActiveLink activeCalssName={styles.active} href="/posts" prefetch>
            <a>Posts</a>
          </ActiveLink>
        </nav>
        <SigInButton />
      </div>
    </header>
  );
}
