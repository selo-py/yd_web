import SEO from '../components/SEO.jsx'

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Gizlilik Politikası - YD İnovasyon"
        description="YD İnovasyon gizlilik politikası ve aydınlatma metni. Kişisel verilerin korunması ve çerez kullanımı hakkında bilgiler."
        keywords="gizlilik politikası, kişisel veriler, çerez politikası, KVKK, GDPR"
      />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
          Gizlilik Politikası
        </h1>
        
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
              Aydınlatma Metni
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              YD İnovasyon olarak, kişisel verilerinizin korunmasına büyük önem vermekteyiz. Bu aydınlatma metni, 
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ve ilgili mevzuat kapsamında, kişisel verilerinizin 
              işlenmesi hakkında sizleri bilgilendirmek amacıyla hazırlanmıştır.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
              Veri Sorumlusu
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Kişisel verilerinizin işlenmesinden sorumlu olan veri sorumlusu YD İnovasyon'dur. 
              İletişim bilgilerimiz için <a href="/iletisim" className="text-brand hover:underline">İletişim</a> sayfamızı ziyaret edebilirsiniz.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
              İşlenen Kişisel Veriler
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Web sitemizde, hizmetlerimizi sunabilmek ve iyileştirebilmek amacıyla aşağıdaki kişisel verileriniz işlenebilmektedir:
            </p>
            <ul className="list-disc ml-6 text-zinc-700 dark:text-zinc-300 space-y-2 mb-4">
              <li>E-posta adresi (bülten aboneliği için)</li>
              <li>İletişim formu aracılığıyla gönderdiğiniz ad, soyad ve mesaj içeriği</li>
              <li>IP adresi ve çerez bilgileri (teknik ve analitik amaçlarla)</li>
              <li>Tarayıcı bilgileri ve cihaz bilgileri</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
              Veri İşleme Amaçları
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc ml-6 text-zinc-700 dark:text-zinc-300 space-y-2 mb-4">
              <li>Web sitemizin teknik olarak çalışmasını sağlamak</li>
              <li>Bülten aboneliği hizmeti sunmak</li>
              <li>İletişim taleplerinizi yanıtlamak</li>
              <li>Site kullanım istatistiklerini analiz etmek ve kullanıcı deneyimini iyileştirmek</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
              Veri İşleme Hukuki Sebepleri
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere dayanarak işlenmektedir:
            </p>
            <ul className="list-disc ml-6 text-zinc-700 dark:text-zinc-300 space-y-2 mb-4">
              <li>Açık rızanız</li>
              <li>Sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması</li>
              <li>Yasal yükümlülüklerimizi yerine getirmek</li>
              <li>Meşru menfaatlerimiz</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
              Veri Saklama ve Güvenlik
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca saklanmakta ve bu süre sonunda 
              silinmektedir. Verilerinizin güvenliği için teknik ve idari tedbirler alınmaktadır.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Web sitemiz, veri saklama ve işleme için <strong>Supabase</strong> ve <strong>Vercel</strong> 
              gibi güvenilir üçüncü taraf hizmet sağlayıcıları kullanmaktadır. Bu hizmet sağlayıcılar, 
              verilerinizi güvenli bir şekilde saklamak ve işlemek için endüstri standardı güvenlik önlemleri 
              almaktadır.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
              Çerezler (Cookies)
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Web sitemizde, kullanıcı deneyimini iyileştirmek ve site performansını analiz etmek amacıyla 
              çerezler kullanılmaktadır. Çerezler, web sitesini ziyaret ettiğinizde cihazınıza kaydedilen 
              küçük metin dosyalarıdır.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Kullandığımız çerez türleri:
            </p>
            <ul className="list-disc ml-6 text-zinc-700 dark:text-zinc-300 space-y-2 mb-4">
              <li><strong>Zorunlu Çerezler:</strong> Web sitesinin temel işlevlerinin çalışması için gereklidir.</li>
              <li><strong>Analitik Çerezler:</strong> Site kullanımını analiz etmek ve kullanıcı deneyimini iyileştirmek için kullanılır.</li>
              <li><strong>Tercih Çerezleri:</strong> Tema tercihi gibi kullanıcı ayarlarını hatırlamak için kullanılır.</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Tarayıcı ayarlarınızdan çerezleri yönetebilir veya devre dışı bırakabilirsiniz. Ancak, bazı çerezler 
              devre dışı bırakıldığında web sitesinin bazı özellikleri düzgün çalışmayabilir.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
              Üçüncü Taraf Hizmetler
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Web sitemiz aşağıdaki üçüncü taraf hizmetleri kullanmaktadır:
            </p>
            <ul className="list-disc ml-6 text-zinc-700 dark:text-zinc-300 space-y-2 mb-4">
              <li><strong>Supabase:</strong> Veritabanı ve kimlik doğrulama hizmetleri için kullanılmaktadır.</li>
              <li><strong>Vercel:</strong> Web sitesi barındırma ve dağıtım hizmetleri için kullanılmaktadır.</li>
              <li><strong>Instagram Embed:</strong> Instagram içeriklerini görüntülemek için kullanılmaktadır.</li>
              <li><strong>YouTube Embed:</strong> YouTube videolarını görüntülemek için kullanılmaktadır.</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Bu hizmet sağlayıcıların kendi gizlilik politikaları bulunmaktadır ve bunları incelemenizi öneririz.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
              KVKK Kapsamındaki Haklarınız
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              KVKK'nın 11. maddesi uyarınca, kişisel verileriniz hakkında aşağıdaki haklara sahipsiniz:
            </p>
            <ul className="list-disc ml-6 text-zinc-700 dark:text-zinc-300 space-y-2 mb-4">
              <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
              <li>İşlenmişse buna ilişkin bilgi talep etme</li>
              <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
              <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
              <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
              <li>KVKK'da öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
              <li>Düzeltme, silme, yok edilme işlemlerinin, kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
              <li>İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
              <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
            </ul>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Bu haklarınızı kullanmak için <a href="/iletisim" className="text-brand hover:underline">İletişim</a> sayfamız 
              üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
              Değişiklikler
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Bu gizlilik politikası, yasal düzenlemelerdeki değişiklikler veya hizmetlerimizdeki güncellemeler nedeniyle 
              güncellenebilir. Önemli değişiklikler durumunda, web sitemizde veya e-posta yoluyla sizleri bilgilendireceğiz.
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Son güncelleme tarihi: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
              İletişim
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              Gizlilik politikamız hakkında sorularınız veya kişisel verilerinizle ilgili talepleriniz için 
              lütfen <a href="/iletisim" className="text-brand hover:underline">İletişim</a> sayfamızı ziyaret edin.
            </p>
          </section>
        </div>
      </main>
    </>
  )
}

