export const playNotification = async () => {
  try {
    const audio = new Audio("/sounds/notification.mp3");
    await audio.play();
    return true;
  } catch (error) {
    console.log('Sound playback failed:', error);
    return false;
  }
};

export const preloadSounds = () => {
  const sounds = ['/sounds/notification.mp3'];
  sounds.forEach(sound => {
    const audio = new Audio(sound);
    audio.load();
  });
};