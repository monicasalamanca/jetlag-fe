import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import s from "./promote-bundle-section.module.scss";
import { faArrowRight, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

// TypeScript interfaces for bundle data structure
interface CityGuide {
  id: string | number;
  name: string;
}

interface Bundle {
  id: string | number;
  title: string;
  description: string;
  savingsAmount: number;
  originalPrice: number;
  totalPages: number;
  cityGuides: CityGuide[];
}

// Color variant type for cycling through border colors
type ColorVariant = "purple" | "pink" | "orange" | "teal";

const PromoteBundlesSection = () => {
  // Helper function to get color class based on index
  const getColorClass = (index: number): ColorVariant => {
    const variants: ColorVariant[] = ["purple", "pink", "orange", "teal"];
    return variants[index % variants.length];
  };

  // TODO: Replace with dynamic data from API
  const bundleData: Bundle = {
    id: "thailand-bundle-1",
    title: "Thailand Bundle",
    description:
      "Everything you need to launch your nomad life in Southeast Asia's top 5 cites",
    savingsAmount: 48,
    originalPrice: 84,
    totalPages: 126,
    cityGuides: [
      { id: "bangkok-1", name: "Bangkok" },
      { id: "chiang-mai-1", name: "Chiang Mai" },
      { id: "bali-1", name: "Bali" },
      { id: "ho-chi-minh-1", name: "Ho Chi Minh City" },
      { id: "phuket-1", name: "Phuket" },
    ],
  };

  return (
    <section className={s.promoteBundleSection}>
      <div className={s.wrapper}>
        <div className={s.pill}>
          <FontAwesomeIcon icon={faLayerGroup} className={s.icon} />
          Bundle & Save
        </div>
        <h2>Bangkok is Included in These Bundles</h2>
        <p>
          Planning to explore multiple cities? Get this guide plus more and save
          up to 40%
        </p>
        <div className={s.bundlesWrapper}>
          <div className={s.bundleScroll}>
            <div className={s.bundleCard}>
              <div className={s.bundleType}>
                <FontAwesomeIcon icon={faLayerGroup} className={s.icon} />
                Bundle
              </div>
              <h3>{bundleData.title}</h3>
              <p>{bundleData.description}</p>
              <div className={s.includes}>
                <h4>includes {bundleData.cityGuides.length} city guides:</h4>
                <div className={s.includesPills}>
                  {bundleData.cityGuides.map((city, index) => (
                    <span
                      key={city.id}
                      className={s[`pill--${getColorClass(index)}`]}
                      data-color-index={index % 4}
                    >
                      {city.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className={s.pricing}>
                <div className={s.originalPrice}>
                  ${bundleData.originalPrice}
                </div>
                <div className={s.pages}>
                  {bundleData.totalPages} pages total
                </div>
              </div>
              <button className={s.ctaButton}>
                Get the Bundle
                <FontAwesomeIcon icon={faArrowRight} className={s.icon} />
              </button>
            </div>

            <div className={s.bundleCard}>
              <div className={s.bundleType}>
                <FontAwesomeIcon icon={faLayerGroup} className={s.icon} />
                Bundle
              </div>
              <h3>{bundleData.title}</h3>
              <p>{bundleData.description}</p>
              <div className={s.includes}>
                <h4>includes {bundleData.cityGuides.length} city guides:</h4>
                <div className={s.includesPills}>
                  {bundleData.cityGuides.map((city, index) => (
                    <span
                      key={city.id}
                      className={s[`pill--${getColorClass(index)}`]}
                      data-color-index={index % 4}
                    >
                      {city.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className={s.pricing}>
                <div className={s.originalPrice}>
                  ${bundleData.originalPrice}
                </div>
                <div className={s.pages}>
                  {bundleData.totalPages} pages total
                </div>
              </div>
              <button className={s.ctaButton}>
                Get the Bundle
                <FontAwesomeIcon icon={faArrowRight} className={s.icon} />
              </button>
            </div>

            <div className={s.bundleCard}>
              <div className={s.bundleType}>
                <FontAwesomeIcon icon={faLayerGroup} className={s.icon} />
                Bundle
              </div>
              <h3>{bundleData.title}</h3>
              <p>{bundleData.description}</p>
              <div className={s.includes}>
                <h4>includes {bundleData.cityGuides.length} city guides:</h4>
                <div className={s.includesPills}>
                  {bundleData.cityGuides.map((city, index) => (
                    <span
                      key={city.id}
                      className={s[`pill--${getColorClass(index)}`]}
                      data-color-index={index % 4}
                    >
                      {city.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className={s.pricing}>
                <div className={s.originalPrice}>
                  ${bundleData.originalPrice}
                </div>
                <div className={s.pages}>
                  {bundleData.totalPages} pages total
                </div>
              </div>
              <button className={s.ctaButton}>
                Get the Bundle
                <FontAwesomeIcon icon={faArrowRight} className={s.icon} />
              </button>
            </div>

            <div className={s.bundleCard}>
              <div className={s.bundleType}>
                <FontAwesomeIcon icon={faLayerGroup} className={s.icon} />
                Bundle
              </div>
              <h3>{bundleData.title}</h3>
              <p>{bundleData.description}</p>
              <div className={s.includes}>
                <h4>includes {bundleData.cityGuides.length} city guides:</h4>
                <div className={s.includesPills}>
                  {bundleData.cityGuides.map((city, index) => (
                    <span
                      key={city.id}
                      className={s[`pill--${getColorClass(index)}`]}
                      data-color-index={index % 4}
                    >
                      {city.name}
                    </span>
                  ))}
                </div>
              </div>
              <div className={s.pricing}>
                <div className={s.originalPrice}>
                  ${bundleData.originalPrice}
                </div>
                <div className={s.pages}>
                  {bundleData.totalPages} pages total
                </div>
              </div>
              <button className={s.ctaButton}>
                Get the Bundle
                <FontAwesomeIcon icon={faArrowRight} className={s.icon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoteBundlesSection;
