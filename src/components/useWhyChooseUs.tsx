import { useTranslation } from "react-i18next";
import Livraison from "../assets/livraison.png"; // Exemple d'importation d'images
import Chef from "../assets/chef.png";
import Fast from "../assets/fast-food.png";


const useWhyChooseUs = () => {
  const { t } = useTranslation();

  const WHY_CHOOSE_US = [
    {
      title: t("whyChooseUs.freeDelivery.title"),
      description: t("whyChooseUs.freeDelivery.description"),
      image: Livraison,
    },
    {
      title: t("whyChooseUs.renownedChef.title"),
      description: t("whyChooseUs.renownedChef.description"),
      image: Chef,
    },
    {
      title: t("whyChooseUs.freshFood.title"),
      description: t("whyChooseUs.freshFood.description"),
      image: Fast,
    },
  ];

  return WHY_CHOOSE_US;
};

export default useWhyChooseUs;
