import { useState } from 'react';
import { Mail, Phone, MessageCircle, Send, MapPin } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    
    // Reset the submission status after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-lg shadow-xl p-6 sm:p-10 text-white mb-8">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-lg opacity-90">
            Have questions or need assistance? We're here to help.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4">
              Get in Touch
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Telegram</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Join our Telegram group for quick support:
                  </p>
                  <a
                    href="https://t.me/ludotournaments"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    t.me/ludotournaments
                    <span className="ml-1">→</span>
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Send us an email at:
                  </p>
                  <a
                    href="mailto:support@ludotournaments.com"
                    className="mt-1 inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    support@ludotournaments.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Phone</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Call us during business hours:
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    +91 12345 67890
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900">Office Address</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    123 Gaming Street,<br />
                    Tech Hub, Bangalore,<br />
                    Karnataka - 560001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4">
              Send Us a Message
            </h2>
            
            {submitted ? (
              <div className="bg-success-50 border border-success-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Send className="h-5 w-5 text-success-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-success-800">
                      Message sent successfully!
                    </h3>
                    <p className="mt-1 text-sm text-success-700">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-medium text-gray-900">
              How do I join a tournament?
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              To join a tournament, login to your account, browse the available tournaments on the home page,
              click "Join Tournament", and follow the payment instructions.
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-900">
              How do I receive my winnings?
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Winnings are automatically transferred to the UPI ID provided in your profile, usually within 24 hours
              of the tournament completion.
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-900">
              What if I face technical issues during a game?
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              If you encounter technical issues, please take a screenshot and immediately contact our support
              team through the Telegram group or email.
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-900">
              Can I get a refund if I can't play in a tournament?
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              Refunds are provided only if you cancel your participation at least 1 hour before the tournament starts.
              Please contact support for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;