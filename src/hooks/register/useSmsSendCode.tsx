import React, { useRef, useState } from 'react';

export const useSmsSendCode = () => {
  const [timer, setTimer] = useState(0);

  const refTimer = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  React.useEffect(() => {
    if (timer > 0) {
      refTimer.current = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  const handleTimerStarted = () => {
    setTimer(60);
  };

  return {
    timer,
    handleTimerStarted,
  };
};
