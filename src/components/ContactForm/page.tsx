'use client'
import { useSession } from 'next-auth/react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { useState } from 'react';

const ContactForm = () => {
  const { data: session } = useSession();
  const [statusMessage, setStatusMessage] = useState({ message: '', type: '' });

  return (
    <Formik
      initialValues={{ name: '', email: session?.user?.email || '', message: '' }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        setStatusMessage({ message: '', type: '' });

        try {
          await axios.post('/api/auth/contact', values);
          setStatusMessage({ message: 'Message sent successfully!', type: 'success' });
          resetForm();
        } catch (err) {
          setStatusMessage({ message: 'Failed to send message. Please try again.', type: 'error' });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Name</label>
            <Field
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
            <Field
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              required
              disabled
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="message">Message</label>
            <Field
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              as="textarea"
              id="message"
              name="message"
              rows="5"
              placeholder="Your Message"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:bg-gradient-to-l hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {statusMessage.message && (
            <p
              className={`mt-2 ${
                statusMessage.type === 'success' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {statusMessage.message}
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
