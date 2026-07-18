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

        <main className="mx-auto mt-8 overflow-hidden rounded-[2rem] border border-gold-light/40 bg-cream shadow-lg w-full">
          {/* Hero */}
          <section id="hero" className="relative min-h-screen pt-16 reveal overflow-hidden bg-cream-light">
            <div className="mx-auto relative grid min-h-[calc(100vh-5rem)] max-w-7xl grid-cols-1 items-center gap-6 px-4 py-8 sm:px-6 sm:py-10 md:px-12 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-7 relative z-10 text-center sm:text-left">
                <div className="inline-block sm:block">
                  <h1 className="font-serif text-4xl leading-[0.95] text-charcoal sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl whitespace-nowrap sm:whitespace-normal">
                    {/* <span className="inline sm:block">Lê Nguyễn</span>{' '} */}
                    <span className="inline sm:block font-light italic text-charcoal/90">Lê Nguyễn Quỳnh Chi</span>
                  </h1>

                  <div className="h-px bg-gold w-full sm:w-16 mx-auto sm:mx-0 my-3" aria-hidden="true" />
                </div>
                <p className="max-w-xl font-serif text-base italic leading-relaxed text-charcoal-light md:text-xl">“Một hành trình đẹp đã đi đến cột mốc đáng nhớ. Chi rất mong được gặp mọi người trong ngày đặc biệt này để cùng lưu giữ những khoảnh khắc thật vui và ý nghĩa.”</p>
                <p className="text-sm font-light leading-relaxed text-charcoal-light">Đại học Luật Hà Nội · Khóa K47 (2022–2026)</p>
                <a href="#details" className="inline-flex items-center justify-center rounded bg-charcoal px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream transition hover:bg-gold hover:text-charcoal-dark">Xem thông tin buổi lễ</a>
              </div>

              <div className="relative mx-auto w-full max-w-lg relative z-10">
                <div className="relative aspect-[3/4] overflow-hidden rounded bg-cream-dark shadow-2xl shadow-charcoal/20">
                  <img src="/images/chi-potratit.jpg" alt="Lê Nguyễn Quỳnh Chi - Đại học Luật Hà Nội" className="h-full w-full object-cover" width="600" height="800" />
                </div>
              </div>
            </div>
          </section>



          {/* Details */}
          <section
            id="details"
            className="reveal border-y border-gold-light/25 bg-cream-light py-16 md:py-20"
          >
            <div className="mx-auto max-w-full px-6 md:px-12">
              {/* Title */}
              <div className="mb-10 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold-dark">
                  Thông tin buổi lễ
                </p>

                <h2 className="mt-3 font-serif text-4xl text-charcoal md:text-5xl">
                  Thời gian & Địa điểm
                </h2>

              </div>

              {/* Information card + image */}
              <div className="mx-auto max-w-4xl">
                <div className="relative">
                  {/* Information card */}
                  <div className="relative z-10 mx-auto w-full overflow-hidden rounded-[2rem] border border-gold-light/50 bg-cream px-4 py-8 shadow-xl md:w-[88%] md:px-10 md:py-10">
                    <div className="mx-auto max-w-md text-center">
                      {/* Time */}
                      <p className="font-serif text-base font-medium uppercase tracking-[0.08em] text-charcoal md:text-3xl">
                        10:30, Thứ Sáu
                      </p>

                      {/* Date */}
                      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-4">
                        {/* Month */}
                        <div className="flex flex-col items-center">
                          <div className="h-px w-full bg-gold-dark/70" />

                          <p className="my-2 whitespace-nowrap font-serif text-2xl uppercase text-charcoal sm:text-base md:text-4xl">
                            Tháng 07
                          </p>

                          <div className="h-px w-full bg-gold-dark/70" />
                        </div>

                        {/* Day */}
                        <div className="px-1 font-serif text-5xl leading-none text-charcoal md:text-6xl">
                          24
                        </div>

                        {/* Year */}
                        <div className="flex flex-col items-center">
                          <div className="h-px w-full bg-gold-dark/70" />

                          <p className="my-2 whitespace-nowrap font-serif text-2xl uppercase text-charcoal sm:text-base md:text-4xl">
                            Năm 2026
                          </p>

                          <div className="h-px w-full bg-gold-dark/70" />
                        </div>
                      </div>

                      {/* Location */}
                      <div className="mt-8">
                        <p className="font-serif text-xl font-medium text-charcoal-light">
                          Tại địa điểm:
                        </p>

                        <h3 className="mt-2 font-serif text-2xl uppercase leading-tight text-charcoal md:text-3xl">
                          Trung tâm
                          <br />
                          Hội nghị Quốc gia (NCC)
                        </h3>

                        <p className="mt-3 text-sm leading-relaxed text-charcoal-light">
                          Số 01 Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội
                        </p>
                      </div>

                      {/* Directions */}
                      <a
                        href="https://www.google.com/maps/place/Trung+t%C3%A2m+H%E1%BB%99i+ngh%E1%BB%8B+Qu%E1%BB%91c+gia+Vi%E1%BB%87t+Nam/@21.006872,105.787655,16z/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-8 inline-flex flex-col items-center gap-2 font-serif text-sm font-semibold uppercase tracking-[0.08em] text-charcoal transition hover:text-gold-dark"
                      >
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gold-light/60 bg-white text-gold-dark transition group-hover:border-gold-dark/40 group-hover:bg-cream-light">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d="M12 2C8.41 2 5.5 4.91 5.5 8.5c0 4.83 5.58 11.87 6.21 12.66a.37.37 0 0 0 .58 0c.63-.79 6.21-7.83 6.21-12.66C18.5 4.91 15.59 2 12 2Zm0 9.25A2.75 2.75 0 1 1 12 5.75a2.75 2.75 0 0 1 0 5.5Z" />
                          </svg>
                        </span>

                        <span>Xem chỉ đường</span>
                      </a>
                    </div>
                  </div>

                  {/* Image */}
                  {/* <div className="mx-auto mt-8 overflow-hidden rounded-[2rem] border border-gold-light/40 bg-cream shadow-lg w-full max-w-3xl">
                    <div className="relative w-full">
                      <img
                        src="/images/chi-3.jpg"
                        alt="Khoảnh khắc lễ tốt nghiệp"
                        className="mx-auto block max-h-[520px] max-w-full object-contain object-top transition duration-700 hover:scale-[1.02]"
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent" />
                    </div>
                  </div> */}
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
                    <select name="guest_count" id="guest_count" defaultValue="1" className="w-full rounded border border-gold-light/70 bg-cream px-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30">
                      <option value="1">1 người</option>
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
            <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-cream/65">Cảm ơn mọi người đã luôn yêu thương, đồng hành và dành những lời chúc tốt đẹp cho mình. Sự hiện diện và tình cảm của mọi người sẽ làm ngày tốt nghiệp này trở nên trọn vẹn hơn.</p>
            <div className="mx-auto h-px w-12 bg-gold/50"></div>
            <p className="text-xl uppercase tracking-[0.28em] text-gold">Lê Nguyễn Quỳnh Chi 2026</p>
          </div>
        </footer>
      </div>
    </>
  )
}

