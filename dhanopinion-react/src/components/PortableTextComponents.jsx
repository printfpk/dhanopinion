import { ContactForm, FeedbackForm } from './Forms'

export const PortableTextComponents = {
  types: {
    formBlock: ({ value }) => {
      if (value.formType === 'contact') {
        return <ContactForm />
      }
      if (value.formType === 'feedback') {
        return <FeedbackForm />
      }
      return null
    }
  },
  block: {
    normal: ({ children }) => <p className="t-body mb-5">{children}</p>,
    h1: ({ children }) => <h1 className="t-h1 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="t-h2 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="t-h3 mb-4">{children}</h3>,
  }
}
