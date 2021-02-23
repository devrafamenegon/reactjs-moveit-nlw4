import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img src="https://avatars.githubusercontent.com/u/65569815?s=400&u=2eb534f97df7189a146cf904cd18ca112bce28d8&v=4" alt="Rafael Menegon"/>
      <div>
        <strong>Rafael Menegon</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
          </p>
      </div>
    </div>
  );
}