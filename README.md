# bosq.app — AI Qida və Kalori İzləyicisi

Azərbaycan mətbəxini anlayan ilk süni intellekt dəstəkli qida və kalori izləyicisi **bosq** (`bosq.app`) üçün rəsmi veb-sayt.

Sayt [Astroship](https://github.com/surjithctly/astroship) mövzusu, **Astro v5** və **Tailwind CSS v4** ilə yenidən qurulmuşdur.

---

## 🚀 Yerli Mühitdə Başlatma (Local Development)

```bash
# Asılılıqları quraşdırın
npm install

# İnkişaf serverini işə salın
npm run dev

# Saytı istehsal (production) üçün qurun
npm run build

# Qurulmuş saytı önizləyin
npm run preview
```

---

## 📂 Layihə Strukturu

- `src/layouts/Layout.astro` — Ümumi sayt strukturu, SEO, meta teqlər və OpenGraph məlumatları
- `src/components/navbar/navbar.astro` — Naviqasiya menyusu və brend loqosu
- `src/components/hero.astro` — Əsas təqdimat bölməsi və süni intellekt skan illüstrasiyası
- `src/components/features.astro` — bosq-un əsas 6 üstünlüyü və funksionallıqları
- `src/components/logos.astro` — Dəstəklənən mobil platformalar (iOS, Android)
- `src/components/pricing.astro` — Pulsuz və Pro (Aylıq & İllik) abunəlik kartları
- `src/components/cta.astro` — Erkən giriş üçün çağırış bölməsi
- `src/components/footer.astro` — Müəllif hüquqları və alt naviqasiya

---

## 🌐 GitHub Pages və Domen Quraşdırması

Sayt `.github/workflows/deploy.yml` vasitəsilə avtomatik olaraq **GitHub Pages** üzərində `bosq.app` xüsusi domeni ilə yayımlanır:
1. Hər bir `git push` əməliyyatında Astro avtomatik olaraq `dist/` qovluğuna yığılır.
2. `public/CNAME` faylı `bosq.app` ünvanını qoruyur.
