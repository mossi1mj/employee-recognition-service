import confetti from "canvas-confetti";

export const useConfetti = () => {
  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  };

  const fireConfetti = () => {
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 },
    });
  };

  return { fireConfetti };
};
