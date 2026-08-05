'use client'

import { Send, CheckCircle2, Loader2 } from 'lucide-react'

interface ContactFormProps {
  formData: {
    name: string
    email: string
    subject: string
    message: string
  }
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleFormSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
  submitSuccess: boolean
  t: any
}

export default function ContactForm({
  formData,
  handleFormChange,
  handleFormSubmit,
  isSubmitting,
  submitSuccess,
  t,
}: ContactFormProps) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10 relative overflow-hidden group">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/30 text-primary">
          <Send className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-white text-base md:text-lg">
            {t.contactSec.formHeading}
          </h3>
          <p className="text-xs text-gray-400">
            {t.contactSec.formDesc}
          </p>
        </div>
      </div>

      {submitSuccess ? (
        <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/30 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-green-400 mx-auto" />
          <h4 className="font-bold text-white text-base">Terima Kasih!</h4>
          <p className="text-xs text-green-300 leading-relaxed">
            {t.contactSec.successMsg}
          </p>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">
                {t.contactSec.fullName}
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleFormChange}
                placeholder={t.contactSec.fullNamePlaceholder}
                className="form-input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">
                {t.contactSec.emailAddress}
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleFormChange}
                placeholder={t.contactSec.emailPlaceholder}
                className="form-input"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">
              {t.contactSec.subject}
            </label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleFormChange}
              placeholder={t.contactSec.subjectPlaceholder}
              className="form-input"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">
              {t.contactSec.message}
            </label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleFormChange}
              placeholder={t.contactSec.messagePlaceholder}
              className="form-input resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 mt-2 text-sm font-semibold disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>{t.contactSec.sending}</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>{t.contactSec.sendMessage}</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}
