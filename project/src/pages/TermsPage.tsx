import { FileText } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-5 sm:px-6">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-primary-600 mr-2" />
            <h1 className="text-2xl font-heading font-semibold text-gray-900">
              Terms & Conditions
            </h1>
          </div>
        </div>
        
        <div className="px-4 py-5 sm:p-6 prose max-w-none">
          <section className="mb-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-3">
              1. Introduction
            </h2>
            <p className="text-gray-700 mb-3">
              Welcome to Ludo Tournaments. These Terms and Conditions govern your use of our website
              and participation in our tournaments. By accessing or using our service, you agree to
              be bound by these Terms.
            </p>
            <p className="text-gray-700">
              Ludo Tournaments offers skill-based Ludo game competitions where players can win real
              cash prizes. Please read these terms carefully before participating.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-3">
              2. Eligibility
            </h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>You must be at least 18 years old to participate in tournaments.</li>
              <li>You must be a resident of eligible states/regions where skill-based gaming with prizes is legal.</li>
              <li>You must provide accurate and complete information during registration.</li>
              <li>Ludo Tournaments reserves the right to verify your identity and eligibility at any time.</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-3">
              3. Tournament Rules
            </h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>All tournaments are played according to standard Ludo rules.</li>
              <li>Players must join tournaments before the scheduled start time.</li>
              <li>Entry fees must be paid in full before participation.</li>
              <li>Prize distribution will be as specified for each tournament.</li>
              <li>In case of technical issues, Ludo Tournaments may reschedule or cancel tournaments.</li>
              <li>Decisions by tournament administrators regarding game outcomes are final.</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-3">
              4. Payments and Withdrawals
            </h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>All transactions are processed in Indian Rupees (INR).</li>
              <li>Entry fees are non-refundable after tournament start.</li>
              <li>Winnings will be transferred to the UPI ID provided during registration.</li>
              <li>Processing of withdrawals may take up to 48 hours.</li>
              <li>Ludo Tournaments is not responsible for incorrect payment details provided by users.</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-3">
              5. Prohibited Conduct
            </h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Cheating, collusion, or use of unauthorized tools/software is strictly prohibited.</li>
              <li>Creating multiple accounts to gain unfair advantage is not allowed.</li>
              <li>Abusive behavior towards other players or staff will not be tolerated.</li>
              <li>Attempting to manipulate the system or exploit bugs is prohibited.</li>
              <li>Violating these rules may result in account suspension and forfeiture of winnings.</li>
            </ul>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-3">
              6. Privacy and Data Security
            </h2>
            <p className="text-gray-700 mb-3">
              Ludo Tournaments respects your privacy and protects your personal information according
              to our Privacy Policy. By using our service, you consent to the collection and use of your
              information as described in the Privacy Policy.
            </p>
          </section>
          
          <section className="mb-6">
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-3">
              7. Limitation of Liability
            </h2>
            <p className="text-gray-700 mb-3">
              Ludo Tournaments is not liable for any direct, indirect, incidental, special, or consequential
              damages arising from your use of our service, including but not limited to, loss of profits,
              data, or goodwill.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-heading font-semibold text-gray-900 mb-3">
              8. Changes to Terms
            </h2>
            <p className="text-gray-700 mb-3">
              Ludo Tournaments reserves the right to modify these Terms at any time. We will notify users
              of significant changes via email or through the website. Your continued use of the service
              after such modifications constitutes your acceptance of the updated Terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;