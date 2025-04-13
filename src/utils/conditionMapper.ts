 // Conditions' estonian translations for classname "infoContainer"

  export const conditionMapper = (condition: string) => {
    switch (condition) {
      case "dry":
        return "Kuiv";
      case "rain":
        return "Märg";
      case "snow":
        return "Lumine";
      default:
        return " ";
    }
  }