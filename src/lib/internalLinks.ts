// Keyword → service slug, sorted longest-first so multi-word phrases match before substrings.
// The linkification in mdx-components.tsx walks this list in order and links the first
// match found for each service slug within a paragraph.
export const KEYWORD_MAP: ReadonlyArray<{ keyword: string; slug: string }> = [
  // LASIK
  { keyword: 'laser vision correction', slug: 'lasik' },
  { keyword: 'laser eye surgery', slug: 'lasik' },
  { keyword: 'lasik surgery', slug: 'lasik' },
  { keyword: 'lasik', slug: 'lasik' },
  // Cataract
  { keyword: 'cataract surgery', slug: 'cataract-surgery' },
  { keyword: 'intraocular lens', slug: 'cataract-surgery' },
  { keyword: 'cataracts', slug: 'cataract-surgery' },
  { keyword: 'cataract', slug: 'cataract-surgery' },
  // Glaucoma
  { keyword: 'glaucoma treatment', slug: 'glaucoma' },
  { keyword: 'glaucoma screening', slug: 'glaucoma' },
  { keyword: 'glaucoma', slug: 'glaucoma' },
  { keyword: 'eye pressure', slug: 'glaucoma' },
  // Retina
  { keyword: 'diabetic retinopathy', slug: 'retina' },
  { keyword: 'retinal detachment', slug: 'retina' },
  { keyword: 'retinal tear', slug: 'retina' },
  { keyword: 'macular degeneration', slug: 'retina' },
  { keyword: 'retina', slug: 'retina' },
  // Dry Eye
  { keyword: 'dry eye treatment', slug: 'dry-eye' },
  { keyword: 'meibomian gland', slug: 'dry-eye' },
  { keyword: 'artificial tears', slug: 'dry-eye' },
  { keyword: 'dry eye', slug: 'dry-eye' },
  { keyword: 'tear film', slug: 'dry-eye' },
];

export type ServiceCardData = {
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
};

export const SERVICE_CARDS: Record<string, ServiceCardData> = {
  lasik: {
    name: 'LASIK Surgery',
    nameAr: 'جراحة الليزك',
    description: 'Laser vision correction for clear sight without glasses.',
    descriptionAr: 'تصحيح النظر بالليزر للرؤية الواضحة بدون نظارات.',
  },
  'cataract-surgery': {
    name: 'Cataract Surgery',
    nameAr: 'جراحة المياه البيضاء',
    description: 'Lens replacement to restore clear, comfortable vision.',
    descriptionAr: 'استبدال العدسة لاستعادة رؤية واضحة ومريحة.',
  },
  glaucoma: {
    name: 'Glaucoma Care',
    nameAr: 'علاج الجلوكوما',
    description: 'Eye pressure monitoring and optic nerve protection.',
    descriptionAr: 'متابعة ضغط العين وحماية العصب البصري.',
  },
  retina: {
    name: 'Retina Care',
    nameAr: 'علاج الشبكية',
    description: 'Specialist evaluation for diabetic eye disease, tears, and macular conditions.',
    descriptionAr: 'تقييم متخصص لاعتلال الشبكية السكري وقطع ومشكلات مركز الإبصار.',
  },
  'dry-eye': {
    name: 'Dry Eye Treatment',
    nameAr: 'علاج جفاف العين',
    description: 'Diagnosis and treatment for dryness, burning, and tear film problems.',
    descriptionAr: 'تشخيص وعلاج الجفاف والحرقان ومشكلات طبقة الدموع.',
  },
};

// Per-category related service slugs — first slug is the primary service for this topic.
const CATEGORY_RELATED: Record<string, string[]> = {
  LASIK: ['lasik', 'dry-eye', 'cataract-surgery'],
  Cataract: ['cataract-surgery', 'retina', 'glaucoma'],
  Glaucoma: ['glaucoma', 'retina', 'cataract-surgery'],
  Retina: ['retina', 'glaucoma', 'cataract-surgery'],
  'Dry Eye': ['dry-eye', 'lasik', 'glaucoma'],
  'Eye Health': ['glaucoma', 'retina', 'dry-eye'],
  'Eye Technology': ['retina', 'glaucoma', 'cataract-surgery'],
  'Children Eye Care': ['retina', 'glaucoma', 'dry-eye'],
  'Dermatology & Eye Care': ['dry-eye', 'retina', 'glaucoma'],
};

const DEFAULT_RELATED = ['glaucoma', 'retina', 'dry-eye'];

export function getRelatedServiceSlugs(category: string): string[] {
  return (CATEGORY_RELATED[category] ?? DEFAULT_RELATED).slice(0, 3);
}
