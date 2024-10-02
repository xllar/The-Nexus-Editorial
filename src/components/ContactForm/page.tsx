/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ClipLoader } from 'react-spinners'; // Make sure this import is included

// Define TypeScript interface for form values
interface FormValues {
  name: string;
  email: string; // email will be non-editable
  message: string;
  storyFile: File | null;
}

export default function ContactForm() {
  const { data: session } = useSession();
  const [statusMessage, setStatusMessage] = useState<{ message: string; type: string }>({ message: '', type: '' });
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state for spinner
  const initialValues: FormValues = {
    name: "",
    email: session?.user?.email || "", // Autofill the email based on user session
    message: "",
    storyFile: null,
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    message: Yup.string().required("Message is required"),
    storyFile: Yup.mixed().required("Please attach your story file"),
  });

  // Fetch submission status
  const fetchSubmissionStatus = async () => {
    if (session?.user?.email) {
      try {
        const response = await axios.get(`/api/auth/submission-status?email=${session.user.email}`);
        if (response.status === 200) {
          const { status, canResubmit } = response.data;
          let message = '';
          let messageType = 'info'; // Default to 'info' type
  
          if (status === 'approved') {
            message = `🎉 Great news! Your story has been approved. Check your email for further details. Please wait a moment while your form is being enabled.`;
            setIsFormDisabled(true);
          } else if (status === 'declined') {
            message = `❌ Unfortunately, your story was declined. Please check your email for more information. The form will be re-enabled shortly.`;
            setIsFormDisabled(true);
            messageType = 'error'; // Set type to 'error' for declined status
          } else {
            message = `Your submission is currently: ${status}.`;
          }
  
          // Set the status message with the appropriate type
          setStatusMessage({ message, type: messageType });
  
          // Update the state to allow or disallow resubmission
          if (!canResubmit) {
            setStatusMessage((prev) => ({
              ...prev,
              message: `${prev.message} You can submit again after 10 minutes.`,
            }));
          }
        } else {
          // If the status is not found, do not show any error message
          setStatusMessage({ message: '', type: '' });
        }
      } catch (error) {
        console.error("Error fetching submission status:", error);
      }
    }
  };
  
  useEffect(() => {
    fetchSubmissionStatus();
  }, [session]);

  return (
    <div className="flex min-h-screen bg-gray-900 text-[#000000]">
      {/* Left side with content */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 items-center justify-center p-12">
        <div>
          <h1 className="text-5xl font-bold mb-4 text-white">Submit Your Story</h1>
          <p className="text-xl text-white">
            Share your voice with the world! We’re excited to hear your story and give you the opportunity to be featured on our blog.
          </p>
          <p className="mb-4 text-white-700">
            <strong>To ensure your submission is complete, please provide a concise summary in the message box and attach a supported file format (PDF, Word, etc.) that includes:</strong>
          </p>
          <ul className="list-disc list-inside mb-4 ">
            <li><strong>Title:</strong> A captivating and concise title for your story.</li>
            <li><strong>Description:</strong> A brief overview (100-150 words) highlighting the main points of your story.</li>
            <li><strong>Body:</strong> The full text of your story (500-1500 words) elaborating on your ideas.</li>
            <li><strong>Author Name:</strong> Your name as you’d like it displayed on the blog.</li>
            <li><strong>Category:</strong> The appropriate category for your story (e.g., Tech, Lifestyle).</li>
          </ul>
          <p className="mb-4 ">
            <strong>Note:</strong> The URL slug for your story will be automatically generated from your title, making it easy for readers to find.
          </p>
        </div>
      </div>

      {/* Right side with form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-800 p-8">
        <div className="w-full max-w-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setIsFormDisabled(true); // Disable the form on submission
              setStatusMessage({ message: '', type: '' });
              setIsLoading(true); // Set loading state
              const formData = new FormData();
              formData.append('name', values.name);
              formData.append('email', values.email);
              formData.append('message', values.message);
              formData.append('story', values.storyFile as File);

              try {
                await axios.post('/api/auth/contact', formData);
                setStatusMessage({ message: 'Story submitted! Awaiting approval.', type: 'info' });

                // Fetch submission status after form submission
                await fetchSubmissionStatus(); // Fetch status after submitting the form

                resetForm();
              } catch (err) {
                setStatusMessage({ message: 'Submission failed. Please try again.', type: 'error' });
              } finally {
                setSubmitting(false);
                setIsLoading(false); // Reset loading state
              }
            }}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name</label>
                  <Field
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Your Name"
                    disabled={isFormDisabled} // Disable if needed
                  />
                  <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                  <Field
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="your.email@example.com"
                    readOnly // Makes the email field non-editable
                    disabled={isFormDisabled} // Disable if needed
                  />
                  <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Short Description</label>
                  <Field
                    as="textarea"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Briefly describe your story..."
                    disabled={isFormDisabled} // Disable if needed
                  />
                  <ErrorMessage name="message" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                {/* File Upload Field */}
                <div>
                  <label htmlFor="storyFile" className="block text-sm font-medium mb-2">Attach Your Story File</label>
                  <input
                    type="file"
                    name="storyFile"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      setFieldValue("storyFile", file);
                    }}
                    className="w-full border border-gray-600 bg-gray-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    accept=".pdf,.doc,.docx"
                    disabled={isFormDisabled} // Disable if needed
                  />
                  <ErrorMessage name="storyFile" component="div" className="text-red-400 text-sm mt-1" />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`w-full px-4 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isFormDisabled ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={isSubmitting || isFormDisabled} // Disable if the form is being submitted or if it's disabled
                >
                  {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Submit Your Story"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Status Message */}
          {statusMessage.message && (
            <div className={`mt-4 p-4 rounded-lg ${statusMessage.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
              <p className="text-white">{statusMessage.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

