import type { CSSProperties } from 'react';

export type PartnerBrand = {
  name: string;
  logo: string;
};

export const generalGumiBrands: PartnerBrand[] = [
  { name: 'TRUFLEX / PANG', logo: '/images/asset-14.jpg' },
  { name: 'Perfect Equipment', logo: '/images/asset-11.jpg' },
  { name: 'Winntec', logo: '/images/asset-16.png' },
  { name: 'Gaither', logo: '/images/asset-17.png' },
  { name: 'Wonder', logo: '/images/asset-18.png' },
  { name: 'Haweka', logo: '/images/asset-19.png' },
  { name: 'Baolong', logo: '/images/asset-20.jpg' },
  { name: 'RAIDEX', logo: '/images/asset-21.png' },
  { name: 'Hofmann', logo: '/images/asset-24.png' },
];

type PartnerBrandsProps = {
  title?: string;
  subtitle?: string;
  brands?: PartnerBrand[];
  speed?: number;
};

export function PartnerBrands({
  title = 'Partnereink',
  subtitle = 'Minőségi műhelytermékek vezető gyártóktól',
  brands = generalGumiBrands,
  speed = 30,
}: PartnerBrandsProps) {
  const duplicatedBrands = [...brands, ...brands];
  const marqueeStyle = {
    '--marquee-duration': `${speed}s`,
  } as CSSProperties;

  return (
    <section className="partner-brands" aria-labelledby="partner-brands-title">
      <div className="container">
        <div className="partner-brands-head">
          <div>
            <div className="section-kicker">Hivatalos képviselet</div>
            <h2 id="partner-brands-title">{title}</h2>
          </div>
          <p>{subtitle}</p>
        </div>

        <div className="partner-marquee" style={marqueeStyle} tabIndex={0}>
          <div className="partner-track">
            {duplicatedBrands.map((brand, index) => {
              const isDuplicate = index >= brands.length;
              return (
                <div
                  className="partner-item"
                  key={`${brand.name}-${index}`}
                  aria-hidden={isDuplicate}
                >
                  <img src={brand.logo} alt={`${brand.name} logó`} loading="lazy" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}