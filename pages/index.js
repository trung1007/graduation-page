import Head from 'next/head'
import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // RSVP form behavior (client-side only)
    const rsvpForm = document.getElementById('rsvp-form')
    const attendanceYes = document.getElementById('attendance_yes')
    const attendanceNo = document.getElementById('attendance_no')
    const guestCountWrapper = document.getElementById('guest-count-wrapper')
    const guestCountSelect = document.getElementById('guest_count')
    const submitBtn = document.getElementById('submit-btn')
    const visualSuccess = document.getElementById('visual-success')
    const visualError = document.getElementById('visual-error')

    function updateGuestCountVisibility() {
      const isAttending = attendanceYes?.checked
      if (!guestCountWrapper || !guestCountSelect) return
      guestCountWrapper.style.maxHeight = isAttending ? '160px' : '0'
      guestCountWrapper.style.opacity = isAttending ? '1' : '0'
      guestCountWrapper.style.pointerEvents = isAttending ? 'auto' : 'none'
      guestCountSelect.disabled = !isAttending
    }

    attendanceYes?.addEventListener('change', updateGuestCountVisibility)
    attendanceNo?.addEventListener('change', updateGuestCountVisibility)
    updateGuestCountVisibility()

    async function handleSubmit(event) {
      event.preventDefault()
      if (!rsvpForm) return
      submitBtn.disabled = true
      submitBtn.textContent = 'Đang gửi...'
      visualError?.classList.add('hidden')

      try {
        const formData = new FormData(rsvpForm)
        const bodyObj = Object.fromEntries(formData.entries())

        const response = await fetch('/api/rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyObj)
        })

        if (!response.ok) throw new Error('Form submission failed')

        rsvpForm.classList.add('hidden')
        visualSuccess?.classList.remove('hidden')
        rsvpForm.reset()
      } catch (error) {
        console.error(error)
        visualError?.classList.remove('hidden')
        submitBtn.disabled = false
        submitBtn.textContent = 'Gửi phản hồi'
      }
    }

    rsvpForm?.addEventListener('submit', handleSubmit)

    const revealElements = document.querySelectorAll('.reveal')
    let observer
    if (window.IntersectionObserver) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
          } else {
            entry.target.classList.remove('reveal-visible')
          }
        })
      }, { threshold: 0.15 })

      revealElements.forEach((element) => observer.observe(element))
    } else {
      revealElements.forEach((element) => element.classList.add('reveal-visible'))
    }

    return () => {
      rsvpForm?.removeEventListener('submit', handleSubmit)
      attendanceYes?.removeEventListener('change', updateGuestCountVisibility)
      attendanceNo?.removeEventListener('change', updateGuestCountVisibility)
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <>
      <Head>
        <title>Lễ Tốt Nghiệp - Lê Nguyễn Quỳnh Chi</title>
        <meta name="description" content="Trân trọng kính mời bạn đến tham dự Lễ Tốt Nghiệp của Lê Nguyễn Quỳnh Chi vào ngày 24/07/2026." />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Lễ Tốt Nghiệp - Lê Nguyễn Quỳnh Chi" />
        <meta property="og:description" content="Chi rất mong được gặp bạn trong ngày đặc biệt này để cùng lưu giữ những khoảnh khắc vui và ý nghĩa." />
        <meta property="og:image" content="/images/chi-potratit.jpg" />
      </Head>

      <div className="antialiased">
        <header className="fixed inset-x-0 top-0 z-40 border-b border-gold-light/30 bg-cream/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
            <a href="#hero" className="font-serif text-xl tracking-wide text-charcoal">Quỳnh Chi 2026</a>
            <nav className="flex items-center gap-4 text-[10px] font-medium uppercase tracking-[0.15em] text-charcoal-light sm:gap-5 sm:text-[11px] md:gap-8 md:tracking-[0.18em]">
              <a href="#details" className="transition hover:text-gold-dark">Thông tin</a>
              <a href="#rsvp" className="rounded-full bg-charcoal px-4 py-2 text-cream transition hover:bg-gold hover:text-charcoal-dark">Xác nhận</a>
            </nav>
          </div>
        </header>

        <main>
          {/* Hero */}
          <section id="hero" className="relative min-h-screen pt-20 reveal overflow-hidden bg-cream-light">
            <div className="mx-auto relative grid min-h-[calc(100vh-5rem)] max-w-7xl grid-cols-1 items-center gap-8 px-6 py-12 md:px-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-7 relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-charcoal">Thư mời chúc mừng tốt nghiệp</p>
                <h1 className="font-serif text-5xl leading-[0.95] text-charcoal sm:text-6xl lg:text-7xl xl:text-8xl">Lê Nguyễn<br /><span className="font-light italic text-charcoal/90">Quỳnh Chi</span></h1>
                <div className="h-px w-20 bg-gold"></div>
                <p className="max-w-xl font-serif text-xl italic leading-relaxed text-charcoal-light md:text-2xl">“Một hành trình đẹp đã đi đến cột mốc đáng nhớ. Chi rất mong được gặp mọi người trong ngày đặc biệt này để cùng lưu giữ những khoảnh khắc thật vui và ý nghĩa.”</p>
                <p className="text-sm font-light leading-relaxed text-charcoal-light">Đại học Luật Hà Nội · Khóa K47 (2022–2026)</p>
                <a href="#details" className="inline-flex items-center justify-center rounded bg-charcoal px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition hover:bg-gold hover:text-charcoal-dark">Xem thông tin buổi lễ</a>
              </div>

              <div className="relative mx-auto w-full max-w-lg relative z-10">
                <div className="absolute inset-0 translate-x-4 translate-y-4 rounded border border-gold"></div>
                <div className="relative aspect-[3/4] overflow-hidden rounded bg-cream-dark shadow-2xl shadow-charcoal/20">
                  <img src="/images/chi-potratit.jpg" alt="Lê Nguyễn Quỳnh Chi - Đại học Luật Hà Nội" className="h-full w-full object-cover" width="600" height="800" />
                </div>
              </div>
            </div>
          </section>



          {/* Details */}
          <section id="details" className="border-y border-gold-light/25 bg-cream-light py-16 md:py-20 reveal">
            <div className="mx-auto max-w-6xl px-6 md:px-12">
              <div className="mb-12 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">Thông tin buổi lễ</p>
                <h2 className="mt-3 font-serif text-4xl text-charcoal md:text-5xl">Thời gian & Địa điểm</h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-charcoal-light md:text-base">Sự hiện diện của mọi người là niềm vui và vinh hạnh lớn đối với Quỳnh Chi.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <article className="rounded-lg border border-gold-light/50 bg-cream p-8 shadow-sm md:p-10">
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </div>
                  <h3 className="font-serif text-3xl text-charcoal">Thời gian</h3>
                  <p className="mt-5 text-sm leading-7 text-charcoal-light">Thứ Sáu, ngày <strong className="font-semibold text-charcoal">24 tháng 07 năm 2026</strong><br />Đón khách: <strong className="font-semibold text-charcoal">08:00</strong><br />Kết thúc dự kiến: <strong className="font-semibold text-charcoal">11:00</strong></p>
                </article>

                <article className="rounded-lg border border-gold-light/50 bg-cream p-8 shadow-sm md:p-10">
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-gold text-gold">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <h3 className="font-serif text-3xl text-charcoal">Địa điểm</h3>
                  <p className="mt-5 text-sm font-medium leading-7 text-charcoal">Hội trường Trung tâm Hội nghị Quốc gia</p>
                  <p className="text-sm font-light leading-6 text-charcoal-light">Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội</p>
                  <a href="https://www.google.com/maps/place/Trung+t%C3%A2m+H%E1%BB%99i+ngh%E1%BB%8B+Qu%E1%BB%91c+gia+Vi%E1%BB%87t+Nam/@21.006872,105.787655,16z/" target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-gold-dark transition hover:text-charcoal">Xem chỉ đường Google Maps →</a>
                </article>
              </div>
            </div>
          </section>

          <section id="gallery" className="border-t border-gold-light/25 bg-cream py-16 md:py-20 reveal">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
              <div className="mb-10 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">Khoảnh khắc Quỳnh Chi</p>
                <h2 className="mt-3 font-serif text-4xl text-charcoal md:text-5xl">Bộ ảnh kỷ niệm</h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm font-light leading-relaxed text-charcoal-light md:text-base">Một bộ sưu tập ảnh đẹp, vừa lãng mạn vừa nhẹ nhàng để kể lại hành trình tốt nghiệp của Quỳnh Chi.</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                <div className="reveal overflow-hidden rounded-[2rem] bg-cream-dark shadow-lg shadow-charcoal/5 ring-1 ring-gold-light/40">
                  <img src="/images/chi-1.jpg" alt="Ảnh Quỳnh Chi 1" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                </div>
                <div className="reveal overflow-hidden rounded-[2rem] bg-cream-dark shadow-lg shadow-charcoal/5 ring-1 ring-gold-light/40">
                  <img src="/images/chi-2.jpg" alt="Ảnh Quỳnh Chi 2" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                </div>
                <div className="reveal overflow-hidden rounded-[2rem] bg-cream-dark shadow-lg shadow-charcoal/5 ring-1 ring-gold-light/40">
                  <img src="/images/chi-3.jpg" alt="Ảnh Quỳnh Chi 3" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                </div>
                <div className="reveal overflow-hidden rounded-[2rem] bg-cream-dark shadow-lg shadow-charcoal/5 ring-1 ring-gold-light/40">
                  <img src="/images/chi-4.jpg" alt="Ảnh Quỳnh Chi 4" className="h-full w-full object-cover transition duration-700 hover:scale-105" />
                </div>
              </div>
            </div>
          </section>

          {/* RSVP */}
          <section id="rsvp" className="py-16 md:py-20 reveal">
            <div className="mx-auto max-w-3xl px-6">
              <div className="rounded-xl border border-gold-light/50 bg-cream-light p-7 shadow-md md:p-12">
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">Xác nhận sự hiện diện</p>
                  <h2 className="mt-3 font-serif text-4xl text-charcoal md:text-5xl">Phản hồi tham gia</h2>
                  <p className="mx-auto mt-4 max-w-xl text-sm font-light leading-relaxed text-charcoal-light">Xin vui lòng phản hồi trước ngày <strong className="font-medium text-charcoal">21/07/2026</strong> để Quỳnh Chi có thể chuẩn bị tiếp đón mọi người chu đáo nhất.</p>
                </div>

                <div id="visual-success" className="mt-8 hidden rounded-lg border border-emerald-200 bg-emerald-50 p-6 text-center text-emerald-800">
                  <h3 className="font-serif text-2xl font-medium">Cảm ơn bạn đã phản hồi!</h3>
                  <p className="mt-2 text-sm font-light leading-relaxed">Quỳnh Chi trân trọng sự quan tâm và những lời nhắn gửi của bạn. Hẹn gặp bạn trong ngày đặc biệt sắp tới!</p>
                </div>

                <div id="visual-error" className="mt-8 hidden rounded-lg border border-rose-200 bg-rose-50 p-6 text-center text-rose-800">
                  <h3 className="font-serif text-2xl font-medium">Chưa gửi được phản hồi</h3>
                  <p className="mt-2 text-sm font-light">Vui lòng thử lại hoặc liên hệ trực tiếp với Quỳnh Chi.</p>
                </div>

                <form name="graduation-rsvp" method="POST" data-netlify="true" action="/thank-you/" id="rsvp-form" className="mt-10 space-y-6">
                  <input type="hidden" name="form-name" value="graduation-rsvp" />
                  <p className="hidden"><label>Không điền trường này: <input name="bot-field" /></label></p>

                  <div className="space-y-2">
                    <label htmlFor="full_name" className="block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">Họ và tên <span className="text-rose-500">*</span></label>
                    <input type="text" name="full_name" id="full_name" maxLength="100" required placeholder="Nhập họ và tên của bạn..." className="w-full rounded border border-gold-light/70 bg-cream px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal-light/40 focus:border-gold focus:ring-2 focus:ring-gold/30" />
                  </div>

                  <fieldset className="space-y-3">
                    <legend className="text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">Bạn có thể tham dự không? <span className="text-rose-500">*</span></legend>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <label className="flex cursor-pointer items-center gap-3 rounded border border-gold-light/60 bg-cream p-4 transition hover:border-gold">
                        <input type="radio" name="attendance" id="attendance_yes" value="Có, mình sẽ tham dự" required defaultChecked className="h-4 w-4 accent-[#C5A880]" />
                        <span className="text-sm font-medium text-charcoal">Có, mình sẽ tham dự</span>
                      </label>
                      <label className="flex cursor-pointer items-center gap-3 rounded border border-gold-light/60 bg-cream p-4 transition hover:border-gold">
                        <input type="radio" name="attendance" id="attendance_no" value="Rất tiếc, mình không thể tham dự" className="h-4 w-4 accent-[#C5A880]" />
                        <span className="text-sm font-medium text-charcoal">Rất tiếc, mình không thể tham dự</span>
                      </label>
                    </div>
                  </fieldset>

                  <div id="guest-count-wrapper" className="space-y-2 overflow-hidden transition-all duration-300">
                    <label htmlFor="guest_count" className="block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">Số lượng người tham dự</label>
                    <select name="guest_count" id="guest_count" className="w-full rounded border border-gold-light/70 bg-cream px-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30">
                      <option value="1" selected>1 người</option>
                      <option value="2">2 người</option>
                      <option value="3">3 người</option>
                      <option value="4">4 người</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">Lời nhắn dành cho Quỳnh Chi</label>
                    <textarea name="message" id="message" maxLength="1000" rows="5" placeholder="Gửi một lời chúc, lời nhắn hoặc ghi chú của bạn..." className="w-full resize-y rounded border border-gold-light/70 bg-cream px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-charcoal-light/40 focus:border-gold focus:ring-2 focus:ring-gold/30"></textarea>
                  </div>

                  <button type="submit" id="submit-btn" className="w-full rounded bg-charcoal px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-sm transition hover:bg-gold hover:text-charcoal-dark disabled:cursor-not-allowed disabled:opacity-50">Gửi phản hồi</button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-gold-dark/20 bg-charcoal py-14 text-center text-cream">
          <div className="mx-auto max-w-3xl space-y-5 px-6">
            <h2 className="font-serif text-3xl font-light italic text-gold md:text-4xl">Trân trọng cảm ơn</h2>
            <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-cream/65">Cảm ơn mọi người đã luôn yêu thương, đồng hành và dành những lời chúc tốt đẹp cho Quỳnh Chi. Sự hiện diện và tình cảm của mọi người sẽ làm ngày tốt nghiệp này trở nên trọn vẹn hơn.</p>
            <div className="mx-auto h-px w-12 bg-gold/50"></div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Lê Nguyễn Quỳnh Chi · 2026</p>
          </div>
        </footer>
      </div>
    </>
  )
}

