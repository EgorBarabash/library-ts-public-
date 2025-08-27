import styles from "./Friend.module.scss";

interface IFriend {
  img: string;
  name: string;
  text: string;
}

interface IProps<T> {
  x: T;
}

function Friend<T extends IFriend>({x} : IProps<T>) {
  return (
    <div className={styles.friend}>
      <div className={styles.avatar}>
        <img height="100%" src={x.img} />
      </div>
      <div className={styles.friendDescription}>
        <div className={styles.name}>{x.name}</div>
        <div className={styles.description}>{x.text}</div>
      </div>
    </div>
  );
}

export default Friend;
