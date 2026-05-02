'use client';

import { useTranslations } from 'next-intl';
import { Card, CardBody } from '@/components/common/Card';

export default function TermsPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms and Conditions</h1>
        
        <Card className="mb-8">
          <CardBody>
            <div className="prose dark:prose-invert prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-0">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300">
                By accessing and using the Abdalla Eye Clinic website and services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">2. Use License</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Permission is granted to temporarily download one copy of the materials on the Abdalla Eye Clinic website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">3. Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300">
                The materials on Abdalla Eye Clinic&apos;s website are provided on an &apos;as is&apos; basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">4. Limitations</h2>
              <p className="text-gray-700 dark:text-gray-300">
                In no event shall Abdalla Eye Clinic or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Abdalla Eye Clinic website, even if we or our authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">5. Accuracy of Materials</h2>
              <p className="text-gray-700 dark:text-gray-300">
                The materials appearing on Abdalla Eye Clinic&apos;s website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on the website are accurate, complete, or current. We may make changes to the materials contained on the website at any time without notice.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">6. Links</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user&apos;s own risk.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">7. Modifications</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may revise these terms and conditions for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms and conditions.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">8. Governing Law</h2>
              <p className="text-gray-700 dark:text-gray-300">
                These terms and conditions are governed by and construed in accordance with the laws of Egypt, and you irrevocably submit to the exclusive jurisdiction of the courts located in Alexandria.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about these terms and conditions, please contact us at:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-900 dark:text-white"><strong>Abdalla Eye Clinic</strong></p>
                <p className="text-gray-700 dark:text-gray-300">Alexandria, Egypt</p>
                <p className="text-gray-700 dark:text-gray-300">Email: info@abdallaeye.com</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
