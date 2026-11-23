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

## 📄 Razılıq sənədi (`/consent`)

> **DRAFT: requires review by an Azerbaijani lawyer before launch.**

Stable URLs:

- Latest: `https://bosq.app/consent`
- Version permalink: `https://bosq.app/consent/v1/`
- Exact text for hashing: `https://bosq.app/consent/v1.txt`

Published markdown lives in `src/consent/vN.md`. Never edit a published file; add `vN+1.md` instead. Run `npm run consent:hash` and seed the printed SHA-256 into the app repo migration.



Fərdi məlumatların işlənməsinə razılığın mətni `src/consent/vN.md` fayllarındadır. Hər fayl bir versiyadır:

- `/consent/` — cari (ən son) versiya və bütün versiyaların siyahısı
- `/consent/vN/` — həmin versiyanın daimi ünvanı
- `/consent/vN.txt` — həmin versiyanın dəqiq mətni

Tətbiqdəki razılıq qeydləri versiyanın daimi ünvanına və mətnin SHA-256 izinə bağlanır. Buna görə:

1. Dərc olunmuş `vN.md` faylını heç vaxt dəyişməyin və silməyin. Bir hərf belə dəyişirsə, yeni `vN+1.md` yaradın.
2. Faylın əvvəlində `Versiya: N` və `Son yenilənmə: …` sətirləri olmalıdır; `N` fayl adı ilə eyni olmalıdır.
3. `npm run consent:hash` hər versiyanın SHA-256 izini çap edir. Yeni versiyanı tətbiq reposunda `consent_documents` cədvəlinə həmin izlə əlavə edin.

---

## 🌐 GitHub Pages və Domen Quraşdırması

Sayt `.github/workflows/deploy.yml` vasitəsilə avtomatik olaraq **GitHub Pages** üzərində `bosq.app` xüsusi domeni ilə yayımlanır:
1. Hər bir `git push` əməliyyatında Astro avtomatik olaraq `dist/` qovluğuna yığılır.
2. `public/CNAME` faylı `bosq.app` ünvanını qoruyur.
