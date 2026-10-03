function FAQSection() {
  const faqs = [
    {
      id: 'faq-1',
      question: 'Is Cova Vault open source?',
      answer: 'Yes. Cova Vault is fully open source and available on GitHub. We believe transparency is essential for security software.'
    },
    {
      id: 'faq-2',
      question: 'Do I need to create an account?',
      answer: 'No. Cova Vault does not require any account or registration. Your vault is stored locally on your device.'
    },
    {
      id: 'faq-3',
      question: 'Is my data encrypted?',
      answer: 'Yes. All data is encrypted using AES-256-GCM before it is stored. Encryption keys are derived using Argon2id.'
    },
    {
      id: 'faq-4',
      question: 'Can I export my data?',
      answer: 'Yes. You can export your vault in encrypted or plaintext format at any time. Backups are your responsibility.'
    },
    {
      id: 'faq-5',
      question: 'How does the master password work?',
      answer: 'Your master password is never stored or transmitted. It is used to derive encryption keys locally on your device.'
    },
    {
      id: 'faq-6',
      question: 'Can I recover a forgotten master password?',
      answer: 'No. By design, there is no password recovery. If you forget your master password, your vault cannot be unlocked.'
    }
  ];

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">
          Common questions about Cova Vault and how it works.
        </p>
      </div>

      <div className="faq-container">
        {faqs.map((faq) => (
          <details key={faq.id} className="faq-item">
            <summary className="faq-question">
              {faq.question}
              <span className="faq-icon">+</span>
            </summary>
            <p className="faq-answer">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;