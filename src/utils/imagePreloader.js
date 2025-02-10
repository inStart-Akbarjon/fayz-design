export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = reject;
  });
};

export const preloadImages = (images) => {
  return Promise.all(images.map(src => preloadImage(src)));
};
