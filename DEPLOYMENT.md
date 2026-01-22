# Deployment Rehberi

## Gereksinimler
1. GitHub Hesabı (free)
2. Vercel Hesabı (free)
3. Railway Hesabı (free)
4. Ücretsiz Domain (isteğe bağlı)

## Adım Adım Kurulum

### 1. GitHub'a Yükle

```bash
# Windows'da ilk git kurulumu yapmanız gerekecek
# https://git-scm.com/download/win adresinden indir ve kur

cd c:\Users\user\Documents\public-chat-wall

# Repository initialize et
git init
git add .
git commit -m "Initial commit - Public Chat Wall"

# GitHub'da yeni repository oluştur: https://github.com/new
# Adı: public-chat-wall
# Sonra:

git remote add origin https://github.com/SENIN_KULLANICI_ADI/public-chat-wall.git
git branch -M main
git push -u origin main
```

### 2. Backend'i Railway'e Deploy Et

1. https://railway.app git (GitHub ile login et)
2. "New Project" → "Deploy from GitHub repo"
3. `public-chat-wall` repository'sini seç
4. Build command:
   ```
   cd server && npm install
   ```
5. Start command:
   ```
   npm start
   ```
6. Environment Variables (Railway dashboard'da):
   ```
   PORT=5000
   JWT_SECRET=super-secure-key-cok-guclu-bir-sifre-123456
   NODE_ENV=production
   ```
7. Deploy ederken `server` klasörünün root'dan seçildiğinden emin ol

Railway sana bir URL verir: `your-project.up.railway.app`

### 3. Frontend'i Vercel'e Deploy Et

1. https://vercel.com git (GitHub ile login et)
2. "New Project" → GitHub'dan import et
3. `public-chat-wall` repository'sini seç
4. Framework: React
5. Root Directory: `client`
6. Environment Variables ekle:
   ```
   REACT_APP_API_URL=https://RAILWAY_URL_BURAYA_YAZILACAK
   ```
   (Railway dashboard'daki URL'yi buraya yapıştır)
7. Deploy

Vercel sana bir URL verir: `your-project.vercel.app`

### 4. Ücretsiz Domain (İsteğe Bağlı)

Seçenek A: Freenom (en kolay)
1. https://freenom.com git
2. `.tk` domain ara (örn: `mychatwall.tk`)
3. 12 ay ücretsiz seç
4. Checkout et (ödeme bilgisi gerekmez, kart denemesi yok)
5. MyFreenom dashboard'da:
   - Management Tools → Nameservers
   - Custom Nameservers seç:
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ns3.vercel-dns.com
     ns4.vercel-dns.com
     ```

Seçenek B: Vercel subdomain
- Vercel dashboard'da "Domains" → `vercel-project-name.vercel.app` zaten verilmiş

### 5. Vercel'de Custom Domain Bağla (İsteğe Bağlı)

1. Vercel Dashboard → Project → Settings → Domains
2. Custom Domain Ekle
3. Freenom domain'ini gir (örn: `mychatwall.tk`)
4. Vercel sana nameserver'lar verecek
5. Freenom'da bu nameserver'ları koy

---

## Kontrol Listesi

- [ ] Git kurdum (https://git-scm.com/download/win)
- [ ] GitHub'a repository push ettim
- [ ] Railway'e backend deploy ettim
- [ ] Railway URL'sini kopyaladım
- [ ] Vercel'e frontend deploy ettim
- [ ] REACT_APP_API_URL environment variable set ettim
- [ ] Uygulama https://vercel-url.app'da açılıyor
- [ ] Chat özelliği çalışıyor
- [ ] Admin login çalışıyor (admin/admin123)
- [ ] (İsteğe bağlı) Freenom domain'i bağladım

## Sorun Giderme

### Frontend "Cannot GET /" hatası
- Vercel Settings → Framework → React seç
- Root Directory → `client`

### API bağlantı hatası
- REACT_APP_API_URL'nin Railway URL'sini içerdiğini kontrol et
- Railway'de `PORT` environment variable'ı 5000 olsun
- CORS settings Railway backend'de doğru mu kontrol et

### Railway database hatasız mı?
- Railway Log'ları kontrol et
- `npm install` tüm paketleri kuruyor mu?

## İletişim URL'leri

- Frontend: `https://your-project.vercel.app`
- Backend API: `https://your-railway.up.railway.app/api`
- Custom Domain: `https://yourdomainname.tk`

## Güvenlik Notları

⚠️ **ÖNEMLİ**: Production'a geçmeden önce:
- JWT_SECRET'i değiştir (çok güçlü bir string)
- admin123 şifresini değiştir
- HTTPS kullan (Vercel ve Railway otomatik HTTPS)
- .env dosyasında sensitive bilgi saklamıyor musun kontrol et
