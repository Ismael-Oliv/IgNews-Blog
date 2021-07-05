import styles from "./styles.module.scss";

interface SubscriptionProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscriptionProps) {
  return <button className={styles.subscribeButton}>Subscribe</button>;
}
