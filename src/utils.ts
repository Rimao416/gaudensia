export const truncateTitle = (title: string | undefined, length: number = 20) => {
    if (title) {
      if (title.length > length) {
        return title.substring(0, length) + "...";
      } else {
        return title;
      }
    }
  };